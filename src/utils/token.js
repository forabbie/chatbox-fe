import { getCookie } from './cookies'

export const parseUserIdFromToken = () => {
  const cookie = getCookie('acp.rfc7519')

  const token = cookie ? cookie : null

  if (!token) {
    return { sub: null }
  }

  try {
    const base64Payload = token.split('.')[1]
    const decodedPayload = atob(base64Payload)
    const userId = JSON.parse(decodedPayload).sub
    return userId
  } catch (error) {
    console.error('Failed to parse JWT token:', error)
    return { sub: null }
  }
}

export const getRefreshTokenExpiration = (refresh_token) => {
  if (!refresh_token) return 0

  const tokenParts = JSON.parse(atob(refresh_token.split('.')[1]))
  const now = Math.ceil(Date.now() / 1000)

  if (tokenParts.exp > now) {
    const cookiesExpiration = tokenParts.exp - now
    let min = Math.floor((cookiesExpiration / 60) << 0)
    min = min + 120

    return min
  }
}
