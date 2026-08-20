import React from 'react'
import { formatINR } from '../utils/format'
import './OrderSuccess.css'

function OrderSuccess({ order, continueShopping }) {
  return (
    <section className="success-page">
      <div className="success-box">
        <div className="success-icon">✓</div>

        <p className="success-label">ORDER CONFIRMED</p>

        <h1>Order Placed Successfully!</h1>

        <p className="success-message">
          Thank you for shopping with ShopSmart, {order.customer?.name || 'friend'}.
          Your order has been confirmed.
        </p>

        <div className="order-details">
          <div>
            <span>Order ID</span>
            <strong>{order.id}</strong>
          </div>

          <div>
            <span>Total Amount</span>
            <strong>{formatINR(order.total)}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong className="confirmed">● Confirmed</strong>
          </div>
        </div>

        <div className="delivery-message">
          🚚 Expected delivery within 3–5 business days.
        </div>

        <button onClick={continueShopping} className="shopping-btn">
          Continue Shopping →
        </button>
      </div>
    </section>
  )
}

export default OrderSuccess
