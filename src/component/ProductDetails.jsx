import React from 'react'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/format'
import './ProductDetails.css'

function ProductDetails({ product, goBack, openCart }) {
  const { addToCart } = useCart()

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
        <button onClick={goBack}>← Back to Products</button>
      </div>
    )
  }

  const outOfStock = product.stock <= 0

  function handleAddAndGo() {
    if (outOfStock) return
    addToCart(product)
    openCart()
  }

  return (
    <section className="details-page">
      <button className="back-button" onClick={goBack}>
        ← Back to Products
      </button>

      <div className="details-container">
        <div className="details-image">
          <span>{product.icon}</span>
        </div>

        <div className="details-content">
          <span className="details-category">{product.category}</span>

          <h1>{product.name}</h1>

          <div className="details-rating">
            ⭐ {product.rating}
            <span> | 120+ Reviews</span>
          </div>

          <h2>{formatINR(product.price)}</h2>

          <p>{product.description}</p>

          <div className={`stock-line ${outOfStock ? 'out' : ''}`}>
            {outOfStock
              ? 'Currently out of stock'
              : product.stock <= 5
              ? `Only ${product.stock} left in stock — order soon`
              : 'In stock'}
          </div>

          <div className="delivery-box">
            🚚
            <div>
              <strong>Free Delivery</strong>
              <span>Delivery available across India</span>
            </div>
          </div>

          <div className="details-actions">
            <button
              className="add-cart-large"
              disabled={outOfStock}
              onClick={handleAddAndGo}
            >
              🛒 Add to Cart
            </button>

            <button
              className="buy-now"
              disabled={outOfStock}
              onClick={handleAddAndGo}
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
