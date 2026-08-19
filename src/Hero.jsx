import React from 'react'
import './Hero.css'

function Hero({ goToProducts }) {

  return (
    <section className="hero">

      <div className="hero-content">

        <div className="hero-badge">
          ✨ New Collection 2026
        </div>

        <h1>
          Shop Smarter.
          <br />
          <span>Live Better.</span>
        </h1>

        <p>
          Discover premium products, exclusive deals
          and everything you need — all in one place.
        </p>

        <div className="hero-buttons">

          <button
            className="primary-btn"
            onClick={goToProducts}
          >
            Shop Now →
          </button>

          <button
            className="secondary-btn"
            onClick={goToProducts}
          >
            Explore Products
          </button>

        </div>

        <div className="hero-features">

          <div>
            <strong>10K+</strong>
            <span>Products</span>
          </div>

          <div>
            <strong>4.8/5</strong>
            <span>Customer Rating</span>
          </div>

          <div>
            <strong>24/7</strong>
            <span>Support</span>
          </div>

        </div>

      </div>

      <div className="hero-visual">

        <div className="circle"></div>

        <div className="floating-card card-one">
          🎧
          <div>
            <strong>Wireless Audio</strong>
            <span>From ₹2,499</span>
          </div>
        </div>

        <div className="floating-card card-two">
          ⌚
          <div>
            <strong>Smart Watches</strong>
            <span>From ₹3,999</span>
          </div>
        </div>

        <div className="shopping-bag">
          🛍️
        </div>

      </div>

    </section>
  )
}

export default Hero