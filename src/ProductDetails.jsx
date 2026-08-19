import React from 'react'
import './ProductDetails.css'

function ProductDetails({
  product,
  addToCart,
  goBack,
  openCart
}) {

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
      </div>
    )
  }

  return (
    <section className="details-page">

      <button
        className="back-button"
        onClick={goBack}
      >
        ← Back to Products
      </button>

      <div className="details-container">

        <div className="details-image">
          <span>{product.icon}</span>
        </div>

        <div className="details-content">

          <span className="details-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <div className="details-rating">
            ⭐ {product.rating}
            <span> | 120+ Reviews</span>
          </div>

          <h2>
            ₹{product.price.toLocaleString('en-IN')}
          </h2>

          <p>
            {product.description}
          </p>

          <div className="delivery-box">
            🚚 <div>
              <strong>Free Delivery</strong>
              <span>Delivery available across India</span>
            </div>
          </div>

          <div className="details-actions">

            <button
              className="add-cart-large"
              onClick={() => {
                addToCart(product)
                openCart()
              }}
            >
              🛒 Add to Cart
            </button>

            <button
              className="buy-now"
              onClick={() => {
                addToCart(product)
                openCart()
              }}
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>

    </section>
  )
}

export default ProductDetails