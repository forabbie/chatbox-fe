import { encryptCookie, decryptCookie } from './hash'

const isProduction = import.meta.env.VITE_APP_ENV === 'production'

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

// Clears all cookies by iterating through them and setting their expiration date to the past
export const clearAllCookies = () => {
  try {
    const cookies = document.cookie.split(';')

    for (let cookie of cookies) {
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim()

      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict`
    }
  } catch (error) {
    console.error('Error clearing cookies:', error)
  }
}
