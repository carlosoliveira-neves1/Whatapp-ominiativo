// Z-API Integration
// Docs: https://developer.z-api.io/

const ZAPI_INSTANCE_ID = process.env.ZAPI_INSTANCE_ID || ''
const ZAPI_TOKEN = process.env.ZAPI_TOKEN || ''
const ZAPI_CLIENT_TOKEN = process.env.ZAPI_CLIENT_TOKEN || ''

const BASE_URL = `https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_TOKEN}`

type ZAPIStatus = 'disconnected' | 'connecting' | 'connected'

class ZAPIService {
  private status: ZAPIStatus = 'disconnected'
  private qrCode: string | null = null
  private user: { id: string; name?: string } | null = null

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': ZAPI_CLIENT_TOKEN,
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Z-API Error: ${error}`)
    }

    return response.json()
  }

  async getQRCode(): Promise<string | null> {
    try {
      const data = await this.request('/qr-code/image')
      if (data.value) {
        this.qrCode = `data:image/png;base64,${data.value}`
        this.status = 'connecting'
        return this.qrCode
      }
      return null
    } catch (error) {
      console.error('Error getting QR code:', error)
      return null
    }
  }

  async getStatus(): Promise<{ status: ZAPIStatus; user: { id: string; name?: string } | null }> {
    try {
      const data = await this.request('/status')
      
      if (data.connected) {
        this.status = 'connected'
        this.qrCode = null
        
        // Get profile info
        try {
          const profile = await this.request('/profile/me')
          this.user = {
            id: profile.phone || '',
            name: profile.name || '',
          }
        } catch {
          this.user = { id: 'connected' }
        }
      } else {
        this.status = 'disconnected'
        this.user = null
      }

      return { status: this.status, user: this.user }
    } catch (error) {
      console.error('Error getting status:', error)
      return { status: 'disconnected', user: null }
    }
  }

  async sendMessage(to: string, message: string) {
    // Format: remove non-digits
    const phone = to.replace(/\D/g, '')
    
    const data = await this.request('/send-text', {
      method: 'POST',
      body: JSON.stringify({
        phone,
        message,
      }),
    })

    return { success: true, messageId: data.messageId }
  }

  async sendImage(to: string, imageUrl: string, caption?: string) {
    const phone = to.replace(/\D/g, '')
    
    const data = await this.request('/send-image', {
      method: 'POST',
      body: JSON.stringify({
        phone,
        image: imageUrl,
        caption,
      }),
    })

    return { success: true, messageId: data.messageId }
  }

  async sendDocument(to: string, documentUrl: string, fileName: string) {
    const phone = to.replace(/\D/g, '')
    
    const data = await this.request('/send-document', {
      method: 'POST',
      body: JSON.stringify({
        phone,
        document: documentUrl,
        fileName,
      }),
    })

    return { success: true, messageId: data.messageId }
  }

  async disconnect() {
    try {
      await this.request('/disconnect', { method: 'POST' })
      this.status = 'disconnected'
      this.user = null
      this.qrCode = null
    } catch (error) {
      console.error('Error disconnecting:', error)
    }
  }

  isConfigured(): boolean {
    return !!(ZAPI_INSTANCE_ID && ZAPI_TOKEN)
  }
}

export const zapiService = new ZAPIService()
