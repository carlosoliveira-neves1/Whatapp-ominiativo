import express from 'express'
import cors from 'cors'
import { WebSocketServer, WebSocket } from 'ws'
import { createServer } from 'http'
import { whatsappService } from './whatsapp.js'
import { zapiService } from './zapi.js'

const app = express()
const PORT = process.env.PORT || 3001
const USE_ZAPI = process.env.USE_ZAPI === 'true'

app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', provider: USE_ZAPI ? 'zapi' : 'baileys' })
})

// Get WhatsApp connection status
app.get('/api/whatsapp/status', async (req, res) => {
  if (USE_ZAPI) {
    const status = await zapiService.getStatus()
    res.json(status)
  } else {
    res.json(whatsappService.getStatus())
  }
})

// Get QR Code (Z-API only, Baileys uses WebSocket)
app.get('/api/whatsapp/qrcode', async (req, res) => {
  if (USE_ZAPI) {
    const qrCode = await zapiService.getQRCode()
    res.json({ qrCode })
  } else {
    res.json({ error: 'Use WebSocket for Baileys QR code' })
  }
})

// Send message
app.post('/api/whatsapp/send', async (req, res) => {
  try {
    const { to, message } = req.body

    if (!to || !message) {
      return res.status(400).json({ error: 'Missing "to" or "message"' })
    }

    if (USE_ZAPI) {
      const result = await zapiService.sendMessage(to, message)
      res.json(result)
    } else {
      const result = await whatsappService.sendMessage(to, message)
      res.json(result)
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

// Logout
app.post('/api/whatsapp/logout', async (req, res) => {
  try {
    if (USE_ZAPI) {
      await zapiService.disconnect()
    } else {
      await whatsappService.logout()
    }
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

// Create HTTP server
const server = createServer(app)

// WebSocket server for real-time QR code and status updates
const wss = new WebSocketServer({ server, path: '/ws' })

wss.on('connection', (ws) => {
  console.log('WebSocket client connected')
  whatsappService.addClient(ws)
})

// Start server and WhatsApp connection
server.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📱 WebSocket available at ws://localhost:${PORT}/ws`)
  console.log(`🔧 Provider: ${USE_ZAPI ? 'Z-API' : 'Baileys'}`)

  // Start WhatsApp connection (only for Baileys)
  if (!USE_ZAPI) {
    await whatsappService.connect()
  } else {
    console.log('📡 Z-API configured. Use /api/whatsapp/qrcode to get QR code.')
  }
})
