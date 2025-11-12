import { Routes, Route } from "react-router-dom"

import './App.css'
import Tree from './pages/Tree'

function App() {
  return (
    <Routes>
        <Route path="/" element={ <Tree/> } />
    </Routes>
  )
}

export default App
