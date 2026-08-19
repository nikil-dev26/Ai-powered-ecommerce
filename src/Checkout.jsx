import React, { useState } from 'react'
import './Checkout.css'

function Checkout({
  cart,
  placeOrder,
  goBack
}) {

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  })

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  )

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {

    e.preventDefault()

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      alert('Please fill all details')
      return
    }

    placeOrder()
  }

  return (
    <section className="checkout-page">

      <button
        className="checkout-back"
        onClick={goBack}
      >
        ← Back to Cart
      </button>

      <div className="checkout-heading">
        <span>CHECKOUT</span>
        <h1>Complete Your Order</h1>
      </div>

      <div className="checkout-layout">

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >

          <h2>Delivery Information</h2>

          <div className="form-grid">

            <div className="input-group">
              <label>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="9876543210"
              />
            </div>

            <div className="input-group">
              <label>City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Your city"
              />
            </div>

          </div>

          <div className="input-group">
            <label>Delivery Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter complete address"
              rows="4"
            />
          </div>

          <div className="input-group">
            <label>Pincode</label>
            <input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="638001"
            />
          </div>

          <div className="payment-method">

            <h3>Payment Method</h3>

            <label>
              <input
                type="radio"
                checked
                readOnly
              />
              Cash on Delivery
            </label>

          </div>

          <button
            type="submit"
            className="place-order-button"
          >
            Place Order ₹{total.toLocaleString('en-IN')}
          </button>

        </form>

        <div className="checkout-summary">

          <h2>Your Order</h2>

          {cart.map(item => (

            <div
              className="checkout-item"
              key={item.id}
            >

              <span className="checkout-icon">
                {item.icon}
              </span>

              <div>
                <strong>{item.name}</strong>
                <p>
                  Qty: {item.quantity}
                </p>
              </div>

              <strong>
                ₹{(
                  item.price *
                  item.quantity
                ).toLocaleString('en-IN')}
              </strong>

            </div>

          ))}

          <hr />

          <div className="checkout-total">
            <span>Total</span>
            <strong>
              ₹{total.toLocaleString('en-IN')}
            </strong>
          </div>

          <div className="secure-note">
            🔒 Your order information is secure.
          </div>

        </div>

      </div>

    </section>
  )
}

export default Checkout