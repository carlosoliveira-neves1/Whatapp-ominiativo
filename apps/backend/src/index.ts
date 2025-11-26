import express from 'express'
import cors from 'cors'
import { WebSocketServer } from 'ws'
import { createServer } from 'http'
import { whatsappService } from './whatsapp.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Get WhatsApp connection status
app.get('/api/whatsapp/status', (req, res) => {
  res.json(whatsappService.getStatus())
})

// Send message
app.post('/api/whatsapp/send', async (req, res) => {
  try {
    const { to, message } = req.body

    if (!to || !message) {
      return res.status(400).json({ error: 'Missing "to" or "message"' })
    }

    const result = await whatsappService.sendMessage(to, message)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

// Logout
app.post('/api/whatsapp/logout', async (req, res) => {
  try {
    await whatsappService.logout()
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

  // Start WhatsApp connection
  await whatsappService.connect()
})
