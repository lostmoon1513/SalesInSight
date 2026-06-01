import { useState } from 'react'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export function useCloudinaryUpload() {
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  const uploadToCloudinary = async (file) => {
    setUploading(true)
    setError(null)
    setProgress(0)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('resource_type', 'video') // Cloudinary uses 'video' for audio too

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) throw new Error('Cloudinary upload failed')

      const data = await response.json()
      return data.secure_url
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setUploading(false)
      setProgress(100)
    }
  }

  return { uploadToCloudinary, uploading, progress, error }
}