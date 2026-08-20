import React from 'react'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/format'
import './Cart.css'

function Cart({ openCheckout, continueShopping }) {
  const { cart, itemCount, subtotal, increaseQty, decreaseQty, removeItem } =
    useCart()

  if (cart.length === 0) {
    return (
      <section className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <button onClick={continueShopping}>Start Shopping →</button>
      </section>
    )
  }

  return (
    <section className="cart-page">
      <div className="cart-title">
        <span>YOUR CART</span>
        <h1>Shopping Cart</h1>
        <p>{itemCount} items in your cart</p>
      </div>

      <div className="cart-layout">
        <div className="cart-products">
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <div className="cart-product-image">{item.icon}</div>

              <div className="cart-product-info">
                <h3>{item.name}</h3>
                <span>{item.category}</span>
                <p>{formatINR(item.price)}</p>

                <div className="quantity-box">
                  <button
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() => decreaseQty(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <strong>{item.quantity}</strong>
                  <button
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => increaseQty(item.id)}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>

                {item.quantity >= item.stock && (
                  <span className="max-stock-note">Max stock reached</span>
                )}
              </div>

              <div className="cart-item-right">
                <strong>{formatINR(item.price * item.quantity)}</strong>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div>
            <span>Subtotal</span>
            <strong>{formatINR(subtotal)}</strong>
          </div>

          <div>
            <span>Shipping</span>
            <strong className="free">FREE</strong>
          </div>

          <div>
            <span>Tax</span>
            <strong>₹0</strong>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <strong>{formatINR(subtotal)}</strong>
          </div>

          <button className="checkout-button" onClick={openCheckout}>
            Proceed to Checkout →
          </button>

          <button className="continue-button" onClick={continueShopping}>
            ← Continue Shopping
          </button>
        </div>
      </div>
    </section>
  )
}

export default Cart
