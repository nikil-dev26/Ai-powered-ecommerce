import React, { useState } from 'react'
import { CartProvider, useCart } from '../context/CartContext'

import Navbar from './Navbar'
import Hero from './Hero'
import Categories from './Categories'
import Products from './Products'
import Cart from './Cart'
import ProductDetails from './ProductDetails'
import Checkout from './Checkout'
import OrderSuccess from './OrderSuccess'
import Toast from './Toast'

import './App.css'

function AppContent() {
  const { cart, itemCount, subtotal, toast, clearCart } = useCart()

  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [page, setPage] = useState('home')
  const [lastOrder, setLastOrder] = useState(null)

  function openProduct(product) {
    setSelectedProduct(product)
    setPage('details')
    window.scrollTo(0, 0)
  }

  function openCart() {
    setPage('cart')
    window.scrollTo(0, 0)
  }

  function openCheckout() {
    if (cart.length === 0) return

    setPage('checkout')
    window.scrollTo(0, 0)
  }

  function placeOrder(customerDetails) {
    const order = {
      id: 'ORD' + Date.now().toString().slice(-8),
      total: subtotal,
      items: cart,
      customer: customerDetails,
      placedAt: new Date().toISOString()
    }

    setLastOrder(order)
    clearCart()
    setPage('success')
    window.scrollTo(0, 0)
  }

  function continueShopping() {
    setSelectedProduct(null)
    setPage('home')
    window.scrollTo(0, 0)
  }

  function goHome() {
    setSelectedProduct(null)
    setPage('home')
    window.scrollTo(0, 0)
  }

  return (
    <div className="app">

      <Navbar
        cartCount={itemCount}
        search={search}
        setSearch={setSearch}
        openCart={openCart}
        goHome={goHome}
      />

      {page === 'home' && (
        <>
          <Hero
            goToProducts={() => {
              document
                .getElementById('products')
                ?.scrollIntoView({
                  behavior: 'smooth'
                })
            }}
          />

          <Categories />

          <Products
            search={search}
            openProduct={openProduct}
          />
        </>
      )}

      {page === 'details' && (
        <ProductDetails
          product={selectedProduct}
          goBack={goHome}
          openCart={openCart}
        />
      )}

      {page === 'cart' && (
        <Cart
          openCheckout={openCheckout}
          continueShopping={continueShopping}
        />
      )}

      {page === 'checkout' && (
        <Checkout
          placeOrder={placeOrder}
          goBack={openCart}
        />
      )}

      {page === 'success' && lastOrder && (
        <OrderSuccess
          order={lastOrder}
          continueShopping={continueShopping}
        />
      )}

      <Toast message={toast} />

    </div>
  )
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}

export default App