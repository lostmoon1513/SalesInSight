import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

// Send Cloudinary URL to backend for analysis
export const analyzeCall = async (cloudinaryUrl, fileName) => {
  const response = await api.post('/analytics/analyze', {
    cloudinary_url: cloudinaryUrl,
    file_name: fileName,
  })
  return response.data
}

// Fetch all past calls
export const fetchCallHistory = async () => {
  const response = await api.get('/analytics/calls')
  return response.data
}

// Fetch single call by ID
export const fetchCallById = async (callId) => {
  const response = await api.get(`/analytics/calls/${callId}`)
  return response.data
}