
class ChatAgent {
    constructor() {
        this.apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        this.apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isListening = false;
        this.conversationHistory = [];
        this.models = [
            'openai/gpt-3.5-turbo',
            'meta-llama/llama-3.1-8b-instruct:free',
            'google/gemini-flash-1.5'
        ];
        this.currentModelIndex = 0;
        
        this.init();
    }

    init() {
      
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.handleUserInput(transcript);
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.stopListening();
            };

            this.recognition.onend = () => {
                this.stopListening();
            };
        }

        this.setupEventListeners();
    }

    setupEventListeners() {
        const chatButton = document.getElementById('chatButton');
        const closeChat = document.getElementById('closeChat');
        const sendButton = document.getElementById('sendButton');
        const chatInput = document.getElementById('chatInput');
        const voiceButton = document.getElementById('voiceButton');

        chatButton.addEventListener('click', () => this.toggleChat());
        closeChat.addEventListener('click', () => this.closeChat());
        sendButton.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        voiceButton.addEventListener('click', () => this.toggleVoiceInput());
    }

    toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        chatWindow.classList.toggle('active');
        
        if (chatWindow.classList.contains('active')) {
            document.getElementById('chatInput').focus();
        }
    }

    closeChat() {
        document.getElementById('chatWindow').classList.remove('active');
    }

    toggleVoiceInput() {
        if (!this.recognition) {
            alert('Speech recognition is not supported in your browser.');
            return;
        }

        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.startListening();
        }
    }

    startListening() {
        this.isListening = true;
        const voiceButton = document.getElementById('voiceButton');
        voiceButton.classList.add('recording');
        this.recognition.start();
    }

    stopListening() {
        this.isListening = false;
        const voiceButton = document.getElementById('voiceButton');
        voiceButton.classList.remove('recording');
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (message) {
            this.handleUserInput(message);
            input.value = '';
        }
    }

    handleUserInput(message) {
        this.addMessage(message, 'user');
        this.conversationHistory.push({
            role: 'user',
            content: message
        });
        
        this.showTypingIndicator();
        this.getAIResponse(message);
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message agent-message';
        typingDiv.id = 'typingIndicator';
        
        const typingContent = document.createElement('div');
        typingContent.className = 'typing-indicator';
        typingContent.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        
        typingDiv.appendChild(typingContent);
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    async getAIResponse(userMessage) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.origin || 'https://localhost',
                    'X-Title': 'Portfolio Chat Agent'
                },
                body: JSON.stringify({
                    model: this.models[this.currentModelIndex],
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful AI assistant on Sandhosh\'s portfolio website. Sandhosh is an AI model developer and Full Stack Enthusiast who creates AI-powered websites. Be friendly, concise, and helpful. Keep responses brief and engaging.'
                        },
                        ...this.conversationHistory
                    ],
                    temperature: 0.7,
                    max_tokens: 500
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('API Error:', response.status, errorData);
                
                
                if (this.currentModelIndex < this.models.length - 1) {
                    this.currentModelIndex++;
                    console.log(`Trying alternative model: ${this.models[this.currentModelIndex]}`);
                    return this.getAIResponse(userMessage);
                }
                
                throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
            }

            const data = await response.json();
            
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('Invalid response format from API');
            }
            
            const aiMessage = data.choices[0].message.content;
            
            this.conversationHistory.push({
                role: 'assistant',
                content: aiMessage
            });

            this.removeTypingIndicator();
            this.addMessage(aiMessage, 'agent');
            this.speakResponse(aiMessage);
            
            
            this.currentModelIndex = 0;
            
        } catch (error) {
            console.error('Error getting AI response:', error);
            this.removeTypingIndicator();
            
            let errorMessage = 'Sorry, I encountered an error. ';
            if (error.message.includes('401')) {
                errorMessage += 'API authentication failed. Please check the API key.';
            } else if (error.message.includes('429')) {
                errorMessage += 'Too many requests. Please try again in a moment.';
            } else if (error.message.includes('500')) {
                errorMessage += 'Server error. Please try again later.';
            } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                errorMessage += 'Network error. Please check your internet connection.';
            } else {
                errorMessage += 'Please try again. Error: ' + error.message;
            }
            
            this.addMessage(errorMessage, 'agent');
        }
    }

    speakResponse(text) {
        
        if (this.synthesis.speaking) {
            this.synthesis.cancel();
        }

        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        
        const voices = this.synthesis.getVoices();
        const preferredVoice = voices.find(voice => 
            voice.lang.startsWith('en') && voice.name.includes('Female')
        ) || voices.find(voice => voice.lang.startsWith('en'));
        
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        this.synthesis.speak(utterance);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const chatAgent = new ChatAgent();
});
