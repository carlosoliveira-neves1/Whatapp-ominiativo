import { useState, useEffect, useCallback, useRef } from 'react'

type WhatsAppStatus = 'disconnected' | 'connecting' | 'connected' | 'logged_out'

type WhatsAppUser = {
  id: string
  name?: string
}

type WhatsAppMessage = {
  from: string
  text: string
  timestamp: number
}

const PROD_API = 'https://whatapp-ominiativo.onrender.com'
const DEV_API = 'http://localhost:3001'

const isProd = import.meta.env.PROD
const API_URL = import.meta.env.VITE_API_URL || (isProd ? PROD_API : DEV_API)
const WS_URL = import.meta.env.VITE_WS_URL || (isProd ? PROD_API.replace('https', 'wss') + '/ws' : 'ws://localhost:3001/ws')

export function useWhatsApp() {
  const [status, setStatus] = useState<WhatsAppStatus>('disconnected')
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [user, setUser] = useState<WhatsAppUser | null>(null)
  const [messages, setMessages] = useState<WhatsAppMessage[]>([])
  const wsRef = useRef<WebSocket | null>(null)

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return

    const ws = new WebSocket(WS_URL)
    wsRef.current = ws

    ws.onopen = () => {
      console.log('WebSocket connected')
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)

      switch (data.type) {
        case 'qr':
          setQrCode(data.data)
          setStatus('connecting')
          break
        case 'status':
          if (data.data === 'connected') {
            setStatus('connected')
            setQrCode(null)
            setUser(data.user)
          } else if (data.data === 'logged_out') {
            setStatus('logged_out')
            setQrCode(null)
            setUser(null)
          } else {
            setStatus(data.data)
          }
          break
        case 'message':
          setMessages((prev) => [...prev, data.data])
          break
      }
    }

    ws.onclose = () => {
      console.log('WebSocket disconnected')
      // Reconnect after 3 seconds
      setTimeout(connect, 3000)
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }, [])

  useEffect(() => {
    connect()

    return () => {
      wsRef.current?.close()
    }
  }, [connect])

  const sendMessage = async (to: string, message: string) => {
    const response = await fetch(`${API_URL}/api/whatsapp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, message }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to send message')
    }

    return response.json()
  }

  const logout = async () => {
    const response = await fetch(`${API_URL}/api/whatsapp/logout`, {
      method: 'POST',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to logout')
    }

    setStatus('disconnected')
    setUser(null)
    setQrCode(null)
  }

  return {
    status,
    qrCode,
    user,
    messages,
    sendMessage,
    logout,
  }
}
