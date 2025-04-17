import { encryptCookie, decryptCookie } from './hashingManager'

const isProduction = import.meta.env.VITE_APP_ENV === 'production'

export const setLocalStorage = (key, str) => {
  const value = JSON.stringify(str)
  const encode = utf8ToB64(value)
  localStorage.setItem(key, encode)
}

export const getLocalStorage = (key) => {
  if (localStorage.getItem(key)) {
    const decode = b64ToUtf8(localStorage.getItem(key)) || ''
    return JSON.parse(decode)
  }
  return ''
}

export const deleteLocalStorage = (key) => {
  localStorage.removeItem(key)
}

export const setSessionStorage = (key = '', str = {}, isEncrypt = true) => {
  const value = JSON.stringify(str)
  const code = isEncrypt ? utf8ToB64(value) : value
  const encode = code
  sessionStorage.setItem(key, encode)
}

export const getSessionStorage = (key = '', isEncrypt = true) => {
  if (sessionStorage.getItem(key)) {
    const code = isEncrypt
      ? b64ToUtf8(sessionStorage.getItem(key) || '{}')
      : sessionStorage.getItem(key)
    const decode = code || ''
    return JSON.parse(decode)
  }
  return ''
}

export const deleteSessionStorage = (key = '') => {
  sessionStorage.removeItem(key)
}

// Function to set a cookie with encryption
export const setCookie = (name, value, minutes, sameSite = 'Strict') => {
  try {
    const encryptedValue = encryptCookie(value)
    if (!encryptedValue) {
      throw new Error('Encryption failed')
    }

    let cookie = `${name}=${encodeURIComponent(encryptedValue)}; path=/`

    if (minutes) {
      const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString()
      cookie += `; expires=${expires}`
    }

    if (isProduction) {
      cookie += '; Secure'
    }

    if (sameSite) {
      cookie += `; SameSite=${sameSite}`
    }

    document.cookie = cookie.trim()
  } catch (error) {
    console.error('Error encrypting and setting cookie:', error)
    throw error
  }
}

// Function to get a cookie by name and decrypt it
export const getCookie = (name) => {
  const nameEQ = `${name}=`
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim())

  for (const cookie of cookies) {
    if (cookie.startsWith(nameEQ)) {
      const encryptedValue = cookie.substring(nameEQ.length)

      try {
        const decryptedValue = decryptCookie(decodeURIComponent(encryptedValue))
        if (!decryptedValue) {
          throw new Error('Decryption failed')
        }
        return decryptedValue
      } catch (error) {
        console.error('Error decrypting cookie:', error)
        return null
      }
    }
  }
  return null
}

// Function to erase a cookie by name
export const eraseCookie = (name) => {
  document.cookie = `${name}=; Max-Age=0; path=/; Secure; SameSite=Strict`
}
