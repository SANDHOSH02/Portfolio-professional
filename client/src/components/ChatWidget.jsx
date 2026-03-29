import { useState, useRef, useEffect, useCallback } from 'react'

const MODELS = [
  'openai/gpt-3.5-turbo',
  'meta-llama/llama-3.1-8b-instruct:free',
  'google/gemini-flash-1.5'
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI assistant. You can type your question or use voice input. How can I help you today?", sender: 'agent' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const conversationHistory = useRef([])
  const currentModelIndex = useRef(0)
  const recognitionRef = useRef(null)
  const synthesisRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        handleUserInput(transcript)
      }
      recognition.onerror = () => setIsListening(false)
      recognition.onend = () => setIsListening(false)

      recognitionRef.current = recognition
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const speakResponse = useCallback((text) => {
    const synthesis = synthesisRef.current
    if (!synthesis) return
    if (synthesis.speaking) synthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.0
    utterance.pitch = 1.0
    utterance.volume = 1.0

    const voices = synthesis.getVoices()
    const preferredVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Female'))
      || voices.find(v => v.lang.startsWith('en'))
    if (preferredVoice) utterance.voice = preferredVoice

    synthesis.speak(utterance)
  }, [])

  const getAIResponse = useCallback(async (userMessage, modelIdx = 0) => {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
    const apiUrl = 'https://openrouter.ai/api/v1/chat/completions'

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin || 'https://localhost',
          'X-Title': 'Portfolio Chat Agent'
        },
        body: JSON.stringify({
          model: MODELS[modelIdx],
          messages: [
            {
              role: 'system',
              content: "You are a helpful AI assistant on Sandhosh's portfolio website. Sandhosh is an AI model developer and Full Stack Enthusiast who creates AI-powered websites. Be friendly, concise, and helpful. Keep responses brief and engaging."
            },
            ...conversationHistory.current
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      })

      if (!response.ok) {
        if (modelIdx < MODELS.length - 1) {
          return getAIResponse(userMessage, modelIdx + 1)
        }
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()
      if (!data.choices?.[0]?.message) throw new Error('Invalid response format')

      const aiMessage = data.choices[0].message.content
      conversationHistory.current.push({ role: 'assistant', content: aiMessage })
      currentModelIndex.current = 0

      setIsTyping(false)
      setMessages(prev => [...prev, { text: aiMessage, sender: 'agent' }])
      speakResponse(aiMessage)
    } catch (error) {
      setIsTyping(false)
      let errorMessage = 'Sorry, I encountered an error. '
      if (error.message.includes('401')) errorMessage += 'API authentication failed.'
      else if (error.message.includes('429')) errorMessage += 'Too many requests. Try again.'
      else if (error.message.includes('Failed to fetch')) errorMessage += 'Network error.'
      else errorMessage += error.message

      setMessages(prev => [...prev, { text: errorMessage, sender: 'agent' }])
    }
  }, [speakResponse])

  const handleUserInput = useCallback((message) => {
    setMessages(prev => [...prev, { text: message, sender: 'user' }])
    conversationHistory.current.push({ role: 'user', content: message })
    setIsTyping(true)
    getAIResponse(message)
  }, [getAIResponse])

  const handleSend = () => {
    const message = inputValue.trim()
    if (message) {
      handleUserInput(message)
      setInputValue('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  const toggleVoice = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.')
      return
    }
    if (isListening) {
      recognitionRef.current.stop()
    } else {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  return (
    <div id="chatWidget">
      <button id="chatButton" className="chat-button" aria-label="Open Chat" onClick={() => setIsOpen(!isOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l5.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.31-3.85-.85l-.27-.14-2.81.48.48-2.81-.14-.27C4.31 14.68 4 13.38 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
          <circle cx="9" cy="12" r="1.5"/>
          <circle cx="12" cy="12" r="1.5"/>
          <circle cx="15" cy="12" r="1.5"/>
        </svg>
      </button>

      <div id="chatWindow" className={`chat-window ${isOpen ? 'active' : ''}`}>
        <div className="chat-header">
          <div className="chat-header-content">
            <div className="agent-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <div className="agent-info">
              <h3>ANT Assistant</h3>
              <span className="status">Online</span>
            </div>
          </div>
          <button id="closeChat" className="close-button" aria-label="Close Chat" onClick={() => setIsOpen(false)}>
            &times;
          </button>
        </div>

        <div id="chatMessages" className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sender}-message`}>
              <div className="message-content">{msg.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="message agent-message">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <button id="voiceButton" className={`voice-button ${isListening ? 'recording' : ''}`} aria-label="Voice Input" onClick={toggleVoice}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          </button>
          <input
            type="text"
            id="chatInput"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button id="sendButton" className="send-button" aria-label="Send Message" onClick={handleSend}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
