import React, { useState } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Categories from './Categories'
import Products from './Products'
import Cart from './Cart'
import ProductDetails from './Productdetails'
import Checkout from './Checkout'
import OrderSuccess from './OrderSuccess'
import './App.css'

function App() {

  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [page, setPage] = useState('home')
  const [orderTotal, setOrderTotal] = useState(0)

  function addToCart(product) {

    const existingProduct = cart.find(
      item => item.id === product.id
    )

    if (existingProduct) {

      setCart(
        cart.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )
      )

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ])
    }
  }

  function increaseQty(id) {

    setCart(
      cart.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    )
  }

  function decreaseQty(id) {

    setCart(
      cart.map(item =>
        item.id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item
      )
    )
  }

  function removeItem(id) {

    setCart(
      cart.filter(item => item.id !== id)
    )
  }

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

    const total = cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    )

    setOrderTotal(total)
    setPage('checkout')
    window.scrollTo(0, 0)
  }

  function placeOrder() {

    const total = cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    )

    setOrderTotal(total)
    setCart([])
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
        cartCount={cart.reduce(
          (total, item) => total + item.quantity,
          0
        )}
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
            addToCart={addToCart}
            search={search}
            openProduct={openProduct}
          />
        </>
      )}

      {page === 'details' && (
        <ProductDetails
          product={selectedProduct}
          addToCart={addToCart}
          goBack={goHome}
          openCart={openCart}
        />
      )}

      {page === 'cart' && (
        <Cart
          cart={cart}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          removeItem={removeItem}
          openCheckout={openCheckout}
          continueShopping={continueShopping}
        />
      )}

      {page === 'checkout' && (
        <Checkout
          cart={cart}
          placeOrder={placeOrder}
          goBack={openCart}
        />
      )}

      {page === 'success' && (
        <OrderSuccess
          totalAmount={orderTotal}
          continueShopping={continueShopping}
        />
      )}

    </div>
  )
}

export default App