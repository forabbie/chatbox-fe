export const now = new Date()
export const year = now.getFullYear()

export const formatDate = (sentAt) => {
  const today = new Date()
  const messageDate = new Date(sentAt)

  const isToday = today.toDateString() === messageDate.toDateString()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  const isYesterday = yesterday.toDateString() === messageDate.toDateString()

  if (isToday) {
    return `Today, ${messageDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })}`
  } else if (isYesterday) {
    return `Yesterday, ${messageDate.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })}`
  } else {
    return messageDate.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }
}

export const formatTime = (sentAt) => {
  const date = new Date(sentAt)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export const formatDateTime = (sentAt) => {
  const today = new Date()
  const messageDate = new Date(sentAt)

  const isToday = today.toDateString() === messageDate.toDateString()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  const isYesterday = yesterday.toDateString() === messageDate.toDateString()

  if (isToday) {
    return `${messageDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })}`
  } else if (isYesterday) {
    return `Yesterday, ${messageDate.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    })}`
  } else {
    return messageDate.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }
}
