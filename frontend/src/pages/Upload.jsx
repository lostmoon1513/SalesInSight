import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload as UploadIcon, FileAudio, X, CheckCircle, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCloudinaryUpload } from '../hooks/useCloudinaryUpload'
import { analyzeCall } from '../services/api'
import PageTransition from '../components/PageTransition'

const ACCEPTED_TYPES = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-wav']
const MAX_SIZE_MB = 50

export default function Upload() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const { uploadToCloudinary, uploading, error: uploadError } = useCloudinaryUpload()

  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [stage, setStage] = useState('idle') // idle | uploading | analyzing | done | error
  const [errorMsg, setErrorMsg] = useState('')

  const validateFile = (f) => {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setErrorMsg('Only .mp3 and .wav files are supported.')
      return false
    }
    if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      setErrorMsg(`File must be under ${MAX_SIZE_MB}MB.`)
      return false
    }
    return true
  }

  const handleFileSelect = (f) => {
    setErrorMsg('')
    if (validateFile(f)) setFile(f)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) handleFileSelect(dropped)
  }

  const handleAnalyze = async () => {
    if (!file) return

    try {
      // Stage 1: Upload to Cloudinary
      setStage('uploading')
      const cloudinaryUrl = await uploadToCloudinary(file)
      if (!cloudinaryUrl) throw new Error(uploadError || 'Upload failed')

      // Stage 2: Send to backend for AI analysis
      setStage('analyzing')
      const result = await analyzeCall(cloudinaryUrl, file.name)

      // Stage 3: Navigate to dashboard
      setStage('done')
      setTimeout(() => navigate(`/dashboard/${result.id}`), 800)
    } catch (err) {
      setStage('error')
      setErrorMsg(err.message)
    }
  }

  const resetUpload = () => {
    setFile(null)
    setStage('idle')
    setErrorMsg('')
  }

  const isProcessing = stage === 'uploading' || stage === 'analyzing'
  return (
  <PageTransition>
    <div className="max-w-2xl mx-auto mt-8">
      { <div className="max-w-2xl mx-auto mt-8">
      {/* Page heading */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Upload Sales Call</h2>
        <p className="text-gray-400 mt-1">
          Upload an MP3 or WAV recording to get AI-powered insights.
        </p>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !file && fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer
          ${dragOver ? 'border-indigo-400 bg-indigo-500/10' : 'border-gray-700 bg-gray-900 hover:border-gray-500'}
          ${file ? 'cursor-default' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".mp3,.wav"
          className="hidden"
          onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
        />

        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <UploadIcon className="mx-auto text-gray-500 mb-4" size={48} />
              <p className="text-white font-medium text-lg">
                Drag & drop your audio file here
              </p>
              <p className="text-gray-500 text-sm mt-1">
                or click to browse · MP3, WAV · Max {MAX_SIZE_MB}MB
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="selected"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center">
                  <FileAudio className="text-indigo-400" size={24} />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium truncate max-w-xs">{file.name}</p>
                  <p className="text-gray-500 text-sm">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); resetUpload() }}
                className="text-gray-500 hover:text-red-400 transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {(errorMsg) && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
          >
            <AlertCircle size={16} />
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status indicator */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-3 text-indigo-300 text-sm bg-indigo-500/10 border border-indigo-500/20 rounded-lg px-4 py-3"
          >
            <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            {stage === 'uploading' ? 'Uploading to cloud...' : 'Analyzing with Gemini AI...'}
          </motion.div>
        )}

        {stage === 'done' && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3"
          >
            <CheckCircle size={16} />
            Analysis complete! Redirecting to dashboard...
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analyze button */}
      <button
        onClick={handleAnalyze}
        disabled={!file || isProcessing}
        className={`
          mt-6 w-full py-3 rounded-xl font-semibold text-white transition-all
          ${file && !isProcessing
            ? 'bg-indigo-600 hover:bg-indigo-500 cursor-pointer'
            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }
        `}
      >
        {isProcessing ? 'Processing...' : 'Analyze Call'}
      </button>
    </div>}
    </div>
  </PageTransition>
  )
}