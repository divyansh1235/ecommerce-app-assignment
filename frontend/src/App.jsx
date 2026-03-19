import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import ProductListPage from './pages/productListPage';
import './App.css'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import CartPage from './pages/cartPage';
import OrdersPage from './pages/ordersPage';
import ProductDetailPage from './pages/productDetailPage';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar/>
        <main className='max-w-7xl mx-auto px-4 py-8'>
          <Routes>
            <Route path="/" element={<ProductListPage/>}/>
            <Route path="/orders" element={<OrdersPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/product/:id" element={<ProductDetailPage/>}/>
          </Routes>
        </main>
      </div>
      </BrowserRouter>
    </>
  )
}

export default App
