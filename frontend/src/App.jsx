import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://gnat-backend.onrender.com'

export default function App() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    axios.get(`${API_URL}/api/health`)
      .then(res => setMessage(res.data?.message || 'Backend connected!'))
      .catch(() => setMessage('Failed to connect to backend'))
  }, [])

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>GNAT LMS</h1>
      <p>{message}</p>
    </div>
  )
}
