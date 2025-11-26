import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  WASocket,
  BaileysEventMap,
} from '@whiskeysockets/baileys'
import { Boom } from '@hapi/boom'
import pino from 'pino'
import QRCode from 'qrcode'
import { WebSocket } from 'ws'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const AUTH_FOLDER = path.join(__dirname, '..', 'auth_info')

const logger = pino({ level: 'warn' })

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected'

class WhatsAppService {
  private socket: WASocket | null = null
  private wsClients: Set<WebSocket> = new Set()
  private status: ConnectionStatus = 'disconnected'
  private qrCode: string | null = null

  async connect() {
    console.log('🔄 Starting WhatsApp connection...')
    
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_FOLDER)

    this.socket = makeWASocket({
      auth: state,
      logger,
      browser: ['WhatsApp CRM', 'Chrome', '120.0.0'],
    })

    this.socket.ev.on('creds.update', saveCreds)

    this.socket.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update
      console.log('📡 Connection update:', { connection, hasQR: !!qr })

      if (qr) {
        console.log('📱 QR Code generated, broadcasting to clients...')
        this.qrCode = await QRCode.toDataURL(qr)
        this.status = 'connecting'
        this.broadcast({ type: 'qr', data: this.qrCode })
        console.log(`📤 QR sent to ${this.wsClients.size} clients`)
      }

      if (connection === 'close') {
        const reason = (lastDisconnect?.error as Boom)?.output?.statusCode
        console.log('❌ Connection closed, reason:', reason)

        if (reason === DisconnectReason.loggedOut) {
          this.status = 'disconnected'
          this.qrCode = null
          this.broadcast({ type: 'status', data: 'logged_out' })
        } else {
          // Reconnect
          console.log('🔄 Reconnecting in 3 seconds...')
          setTimeout(() => this.connect(), 3000)
        }
      } else if (connection === 'open') {
        console.log('✅ WhatsApp connected!')
        this.status = 'connected'
        this.qrCode = null
        const user = this.socket?.user
        this.broadcast({
          type: 'status',
          data: 'connected',
          user: user ? { id: user.id, name: user.name } : null,
        })
      }
    })

    this.socket.ev.on('messages.upsert', (m) => {
      if (m.type === 'notify') {
        for (const msg of m.messages) {
          if (!msg.key.fromMe) {
            this.broadcast({
              type: 'message',
              data: {
                from: msg.key.remoteJid,
                text: msg.message?.conversation || msg.message?.extendedTextMessage?.text || '',
                timestamp: msg.messageTimestamp,
              },
            })
          }
        }
      }
    })
  }

  addClient(ws: WebSocket) {
    this.wsClients.add(ws)
    console.log(`👤 New WebSocket client connected. Total: ${this.wsClients.size}`)

    // Send current status
    if (this.status === 'connected') {
      const user = this.socket?.user
      console.log('📤 Sending connected status to new client')
      ws.send(JSON.stringify({
        type: 'status',
        data: 'connected',
        user: user ? { id: user.id, name: user.name } : null,
      }))
    } else if (this.qrCode) {
      console.log('📤 Sending existing QR code to new client')
      ws.send(JSON.stringify({ type: 'qr', data: this.qrCode }))
    } else {
      console.log(`📤 Sending status "${this.status}" to new client`)
      ws.send(JSON.stringify({ type: 'status', data: this.status }))
    }

    ws.on('close', () => {
      this.wsClients.delete(ws)
      console.log(`👤 WebSocket client disconnected. Total: ${this.wsClients.size}`)
    })
  }

  private broadcast(message: object) {
    const data = JSON.stringify(message)
    for (const client of this.wsClients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    }
  }

  async sendMessage(to: string, text: string) {
    if (!this.socket || this.status !== 'connected') {
      throw new Error('WhatsApp not connected')
    }

    // Format number: remove non-digits and add @s.whatsapp.net
    const jid = to.replace(/\D/g, '') + '@s.whatsapp.net'

    await this.socket.sendMessage(jid, { text })
    return { success: true, to: jid }
  }

  async logout() {
    if (this.socket) {
      await this.socket.logout()
      this.socket = null
      this.status = 'disconnected'
      this.qrCode = null
    }
  }

  getStatus() {
    return {
      status: this.status,
      user: this.socket?.user || null,
    }
  }
}

export const whatsappService = new WhatsAppService()
