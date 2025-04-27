<template>
  <div class="chat-container">
    <h1 class="chat-title">WebSocket Chat</h1>
    <div class="chat-box" id="output" ref="output"></div>
    <div class="input-area">
      <input
        id="input"
        type="text"
        placeholder="Type your message here..."
        @keyup.enter="sendMessage"
        class="message-input"
      />
      <button @click="sendMessage" class="send-button">
        <span>Send</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"
          />
        </svg>
      </button>
    </div>
    <div class="connection-status" :class="connectionStatus">
      {{ statusMessages[connectionStatus] }}
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'

const output = ref(null)
const connectionStatus = ref('connecting')
const statusMessages = {
  connecting: 'Connecting to server...',
  connected: 'Connected ✓',
  disconnected: 'Disconnected ✗',
  error: 'Connection error!'
}

const socket = new WebSocket(
  'ws://localhost:3000/ws/chat/123?v=1.0&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDU3MjM1MDUsImlhdCI6MTc0NTcyMDUwNSwic3ViIjoxfQ.1uW7FvuHH8OBPeKle-W2ieCRnQ2ZaOXHIUGDT3CuK2I'
)

socket.onopen = function (event) {
  connectionStatus.value = 'connected'
  addMessage('System', 'Connected to the chat server')
}

socket.onmessage = function (event) {
  try {
    const data = JSON.parse(event.data)
    addMessage(data.sender || 'User', data.message || event.data)
  } catch {
    addMessage('System', event.data)
  }
}

socket.onclose = function (event) {
  connectionStatus.value = 'disconnected'
  addMessage('System', 'Connection closed')
}

socket.onerror = function (event) {
  connectionStatus.value = 'error'
  addMessage('System', 'Connection error occurred')
}

const addMessage = (sender, message) => {
  const messageElement = document.createElement('div')
  messageElement.classList.add('message')

  const senderElement = document.createElement('span')
  senderElement.classList.add('sender')
  senderElement.textContent = `${sender}: `

  const contentElement = document.createElement('span')
  contentElement.classList.add('content')
  contentElement.textContent = message

  messageElement.appendChild(senderElement)
  messageElement.appendChild(contentElement)
  output.value.appendChild(messageElement)
  output.value.scrollTop = output.value.scrollHeight
}

const sendMessage = () => {
  const input = document.getElementById('input')
  const message = input.value.trim()

  if (message && socket.readyState === WebSocket.OPEN) {
    socket.send(message)
    addMessage('You', message)
    input.value = ''
  }
}

onBeforeUnmount(() => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close()
  }
})

// socket.onopen = function (event) {
//   document.getElementById('output').value += 'Connected\n'
// }

// socket.onmessage = function (event) {
//   document.getElementById('output').value += 'Received: ' + event.data + '\n'
// }

// socket.onclose = function (event) {
//   document.getElementById('output').value += 'Connection closed\n'
// }

// const sendMessage = () => {
//   const message = document.getElementById('input').value
//   socket.send(message)
// }
</script>

<style scoped>
.chat-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 10px;
  background-color: #f5f7fa;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.chat-title {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
}

.chat-box {
  height: 400px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  overflow-y: auto;
  background-color: white;
}

.message {
  margin-bottom: 12px;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: #f0f4f8;
}

.message .sender {
  font-weight: bold;
  color: #3498db;
}

.message .content {
  color: #333;
}

.input-area {
  display: flex;
  gap: 10px;
}

.message-input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.message-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.send-button {
  padding: 12px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s;
}

.send-button:hover {
  background-color: #2980b9;
}

.send-button:active {
  transform: scale(0.98);
}

.connection-status {
  margin-top: 10px;
  padding: 8px;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
}

.connection-status.connecting {
  background-color: #fff3cd;
  color: #856404;
}

.connection-status.connected {
  background-color: #d4edda;
  color: #155724;
}

.connection-status.disconnected {
  background-color: #f8d7da;
  color: #721c24;
}

.connection-status.error {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
