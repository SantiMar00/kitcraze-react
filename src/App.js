import { React } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Product from './pages/products/product/Product'
import Products from './pages/products/Products'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/:url" element={<Products />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
