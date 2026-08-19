import React from 'react'
import './Cart.css'

function Cart({
  cart,
  increaseQty,
  decreaseQty,
  removeItem,
  openCheckout,
  continueShopping
}) {

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  )

  if (cart.length === 0) {

    return (
      <section className="empty-cart">

        <div className="empty-cart-icon">
          🛒
        </div>

        <h2>Your Cart is Empty</h2>

        <p>
          Looks like you haven't added anything yet.
        </p>

        <button
          onClick={continueShopping}
        >
          Start Shopping →
        </button>

      </section>
    )
  }

  return (
    <section className="cart-page">

      <div className="cart-title">

        <span>YOUR CART</span>

        <h1>Shopping Cart</h1>

        <p>
          {cart.reduce(
            (sum, item) =>
              sum + item.quantity,
            0
          )} items in your cart
        </p>

      </div>

      <div className="cart-layout">

        <div className="cart-products">

          {cart.map(item => (

            <div
              className="cart-item"
              key={item.id}
            >

              <div className="cart-product-image">
                {item.icon}
              </div>

              <div className="cart-product-info">

                <h3>{item.name}</h3>

                <span>{item.category}</span>

                <p>
                  ₹{item.price.toLocaleString('en-IN')}
                </p>

                <div className="quantity-box">

                  <button
                    onClick={() =>
                      decreaseQty(item.id)
                    }
                  >
                    −
                  </button>

                  <strong>
                    {item.quantity}
                  </strong>

                  <button
                    onClick={() =>
                      increaseQty(item.id)
                    }
                  >
                    +
                  </button>

                </div>

              </div>

              <div className="cart-item-right">

                <strong>
                  ₹{(
                    item.price *
                    item.quantity
                  ).toLocaleString('en-IN')}
                </strong>

                <button
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

        <div className="cart-summary">

          <h2>Order Summary</h2>

          <div>
            <span>Subtotal</span>
            <strong>
              ₹{total.toLocaleString('en-IN')}
            </strong>
          </div>

          <div>
            <span>Shipping</span>
            <strong className="free">
              FREE
            </strong>
          </div>

          <div>
            <span>Tax</span>
            <strong>₹0</strong>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <strong>
              ₹{total.toLocaleString('en-IN')}
            </strong>
          </div>

          <button
            className="checkout-button"
            onClick={openCheckout}
          >
            Proceed to Checkout →
          </button>

          <button
            className="continue-button"
            onClick={continueShopping}
          >
            ← Continue Shopping
          </button>

        </div>

      </div>

    </section>
  )
}

export default Cart