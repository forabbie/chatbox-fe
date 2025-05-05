export function getInitial(email) {
  if (!email) return '?'

  const trimmedEmail = email.trim()
  const username = trimmedEmail.split('@')[0]

  if (username.length === 1) {
    return username.charAt(0).toUpperCase()
  }

  const firstLetter = username.charAt(0).toUpperCase()
  const lastLetter = username.charAt(username.length - 1).toUpperCase()

  return firstLetter + lastLetter
}
