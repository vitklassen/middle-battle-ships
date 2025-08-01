import { useEffect } from 'react'
import './App.css'
import { Router } from './Router'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__ || 3000} `
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <div className="App">
      <Router />
    </div>
  )
}

export default App
