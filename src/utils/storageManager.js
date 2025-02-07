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
