import './App.css'

import Header from './Components/Header/Header.jsx';
import Home from './Components/_Pages/Home/Home.jsx';
import About from './Components/_Pages/About/About.jsx';

import { Route, Routes } from "react-router-dom"

function App() {
  return (
    
    <>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </>
  )
}

export default App
