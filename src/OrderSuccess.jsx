import React from 'react'
import './OrderSuccess.css'

function OrderSuccess({
  totalAmount,
  continueShopping
}) {

  const orderId =
    'ORD' +
    Math.floor(
      100000 + Math.random() * 900000
    )

  return (
    <section className="success-page">

      <div className="success-box">

        <div className="success-icon">
          ✓
        </div>

        <p className="success-label">
          ORDER CONFIRMED
        </p>

        <h1>
          Order Placed Successfully!
        </h1>

        <p className="success-message">
          Thank you for shopping with ShopSmart.
          Your order has been confirmed.
        </p>

        <div className="order-details">

          <div>
            <span>Order ID</span>
            <strong>{orderId}</strong>
          </div>

          <div>
            <span>Total Amount</span>
            <strong>
              ₹{totalAmount.toLocaleString('en-IN')}
            </strong>
          </div>

          <div>
            <span>Status</span>
            <strong className="confirmed">
              ● Confirmed
            </strong>
          </div>

        </div>

        <div className="delivery-message">
          🚚 Expected delivery within 3–5 business days.
        </div>

        <button
          onClick={continueShopping}
          className="shopping-btn"
        >
          Continue Shopping →
        </button>

      </div>

    </section>
  )
}

export default OrderSuccess