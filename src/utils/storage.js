import { utf8ToB64, b64ToUtf8 } from './hash'

// Sets a key-value pair in localStorage after encoding the value in Base64
export const setLocalStorage = (key, str) => {
  const value = JSON.stringify(str)
  const encode = utf8ToB64(value)
  localStorage.setItem(key, encode)
}

// Retrieves a value from localStorage by key, decoding it from Base64 and parsing it as JSON
export const getLocalStorage = (key) => {
  if (localStorage.getItem(key)) {
    const decode = b64ToUtf8(localStorage.getItem(key)) || ''
    return JSON.parse(decode)
  }
  return ''
}

// Deletes a specific key-value pair from localStorage
export const deleteLocalStorage = (key) => {
  localStorage.removeItem(key)
}

// Clears all key-value pairs from localStorage
export const clearAllLocalStorage = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.clear()
  } else {
    console.warn('localStorage is not available.')
  }
}

// Clears all localStorage data and cookies
export const clearAllStorage = () => {
  clearAllLocalStorage()
}
