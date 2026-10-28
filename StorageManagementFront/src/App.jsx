import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons'
import Home from './pages/Home/Home'
import Header from "./components/Header/Header"
import Products from './pages/Products/Products'
import Clients from './pages/Clients/Clients'
import Partners from './pages/Partners/Partners'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="container" style={{flexGrow: 1}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/clientes" element={<Clients />} />
          <Route path="/parceiros" element={<Partners />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
