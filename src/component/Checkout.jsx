import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/format'
import './Checkout.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[6-9]\d{9}$/
const PINCODE_RE = /^\d{6}$/

function validate(form) {
  const errors = {}

  if (!form.name.trim()) errors.name = 'Name is required'
  if (!EMAIL_RE.test(form.email)) errors.email = 'Enter a valid email'
  if (!PHONE_RE.test(form.phone))
    errors.phone = 'Enter a valid 10-digit mobile number'
  if (!form.address.trim()) errors.address = 'Address is required'
  if (!form.city.trim()) errors.city = 'City is required'
  if (!PINCODE_RE.test(form.pincode)) errors.pincode = 'Enter a valid 6-digit pincode'

  return errors
}

function Checkout({ placeOrder, goBack }) {
  const { cart, subtotal } = useCart()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  })

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    placeOrder(form)
  }

  return (
    <section className="checkout-page">
      <button className="checkout-back" onClick={goBack}>
        ← Back to Cart
      </button>

      <div className="checkout-heading">
        <span>CHECKOUT</span>
        <h1>Complete Your Order</h1>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <h2>Delivery Information</h2>

          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="9876543210"
                inputMode="numeric"
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Your city"
              />
              {errors.city && <span className="field-error">{errors.city}</span>}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter complete address"
              rows="4"
            />
            {errors.address && <span className="field-error">{errors.address}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="pincode">Pincode</label>
            <input
              id="pincode"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="638001"
              inputMode="numeric"
            />
            {errors.pincode && <span className="field-error">{errors.pincode}</span>}
          </div>

          <div className="payment-method">
            <h3>Payment Method</h3>
            <label>
              <input type="radio" checked readOnly />
              Cash on Delivery
            </label>
          </div>

          <button type="submit" className="place-order-button" disabled={submitting}>
            {submitting ? 'Placing Order…' : `Place Order ${formatINR(subtotal)}`}
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Your Order</h2>

          {cart.map(item => (
            <div className="checkout-item" key={item.id}>
              <span className="checkout-icon">{item.icon}</span>
              <div>
                <strong>{item.name}</strong>
                <p>Qty: {item.quantity}</p>
              </div>
              <strong>{formatINR(item.price * item.quantity)}</strong>
            </div>
          ))}

          <hr />

          <div className="checkout-total">
            <span>Total</span>
            <strong>{formatINR(subtotal)}</strong>
          </div>

          <div className="secure-note">🔒 Your order information is secure.</div>
        </div>
      </div>
    </section>
  )
}

export default Checkout
