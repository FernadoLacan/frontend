import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { Suspense } from 'react'
import { AppRouter } from './components/router'

function App() {
  return (
    <Router>      
      <AppRouter />      
    </Router>
  )
}

export default App
