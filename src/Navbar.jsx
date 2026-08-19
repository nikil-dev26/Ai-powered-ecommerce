import React from 'react'
import './Navbar.css'

function Navbar({
  cartCount,
  search,
  setSearch,
  openCart,
  goHome
}) {

  return (
    <nav className="navbar">

      <div
        className="logo"
        onClick={goHome}
      >
        <span className="logo-icon">S</span>
        <span>Shop<span>Smart</span></span>
      </div>

      <div className="search-box">

        <span className="search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        

        {search && (
          <button
            className="clear-search"
            onClick={() => setSearch('')}
          >
            ×
          </button>
        )}

      </div>

      <div className="nav-links">

        <button onClick={goHome}>
          Home
        </button>

        <button
          onClick={() =>
            document
              .getElementById('categories')
              ?.scrollIntoView({
                behavior: 'smooth'
              })
          }
        >
          Categories
        </button>

        <button
          onClick={() =>
            document
              .getElementById('products')
              ?.scrollIntoView({
                behavior: 'smooth'
              })
          }
        >
          Products
        </button>

        <button
          className="cart-link"
          onClick={openCart}
        >
          🛒
          <span>Cart</span>
          <b>{cartCount}</b>
        </button>

      </div>

    </nav>
  )
}

export default Navbar