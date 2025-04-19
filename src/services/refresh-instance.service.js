import axios from 'axios'

const refreshInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

export default refreshInstance
