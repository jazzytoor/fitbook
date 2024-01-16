import React from "react"
import { BrowserRouter as Router } from "react-router-dom"

import NavBar from "../Nav"
import "./App.scss"

function App() {
  return (
    <Router>
      <div className="main-cover-page">
        <NavBar />
      </div>
    </Router>
  )
}

export default App
