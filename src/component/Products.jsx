import React, { useMemo, useState } from 'react'
import { useCart } from '../context/CartContext'
import products from '../data/products'
import { formatINR } from '../utils/format'
import './Products.css'

function Products({ search, openProduct }) {
  const { addToCart } = useCart()

  const [category, setCategory] = useState('All')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  const filteredProducts = useMemo(() => {
    const searchText = search.trim().toLowerCase()

    return products.filter(product => {
      const matchesSearch =
        !searchText ||
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText)

      const matchesCategory =
        category === 'All' || product.category === category

      let matchesPrice = true
      if (priceRange === 'under1000') matchesPrice = product.price < 1000
      if (priceRange === '1000-2000')
        matchesPrice = product.price >= 1000 && product.price <= 2000
      if (priceRange === '2000-3000')
        matchesPrice = product.price > 2000 && product.price <= 3000
      if (priceRange === 'above3000') matchesPrice = product.price > 3000

      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [search, category, priceRange])

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts]

    switch (sortBy) {
      case 'priceLow':
        return list.sort((a, b) => a.price - b.price)
      case 'priceHigh':
        return list.sort((a, b) => b.price - a.price)
      case 'ratingHigh':
        return list.sort((a, b) => b.rating - a.rating)
      case 'nameAZ':
        return list.sort((a, b) => a.name.localeCompare(b.name))
      case 'nameZA':
        return list.sort((a, b) => b.name.localeCompare(a.name))
      default:
        return list
    }
  }, [filteredProducts, sortBy])

  function clearFilters() {
    setCategory('All')
    setPriceRange('all')
    setSortBy('default')
  }

  const filtersActive =
    category !== 'All' || priceRange !== 'all' || sortBy !== 'default'

  return (
    <section className="products" id="products">
      <div className="section-heading">
        <span>OUR COLLECTION</span>
        <h2>Featured Products</h2>
        <p>Discover quality products at the best prices.</p>
      </div>

      <div className="product-toolbar">
        <div className="filter-title">
          <strong>Find Your Product</strong>
          <span>{sortedProducts.length} product(s) found</span>
        </div>

        <div className="filter-group">
          <label htmlFor="category-filter">Category</label>
          <select
            id="category-filter"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="price-filter">Price</label>
          <select
            id="price-filter"
            value={priceRange}
            onChange={e => setPriceRange(e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="under1000">Under ₹1,000</option>
            <option value="1000-2000">₹1,000 - ₹2,000</option>
            <option value="2000-3000">₹2,000 - ₹3,000</option>
            <option value="above3000">Above ₹3,000</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-filter">Sort By</label>
          <select
            id="sort-filter"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="ratingHigh">Highest Rated</option>
            <option value="nameAZ">Name: A - Z</option>
            <option value="nameZA">Name: Z - A</option>
          </select>
        </div>

        <button className="clear-filters" onClick={clearFilters}>
          Reset
        </button>
      </div>

      {filtersActive && (
        <div className="active-filters">
          <span>Active filters:</span>
          {category !== 'All' && (
            <button onClick={() => setCategory('All')}>{category} ×</button>
          )}
          {priceRange !== 'all' && (
            <button onClick={() => setPriceRange('all')}>
              Price Filter ×
            </button>
          )}
          {sortBy !== 'default' && (
            <button onClick={() => setSortBy('default')}>Sorting ×</button>
          )}
        </div>
      )}

      {sortedProducts.length === 0 ? (
        <div className="no-products">
          <div className="no-product-icon">🔍</div>
          <h3>No Products Found</h3>
          <p>Try changing your search or filters.</p>
          <button onClick={clearFilters}>Clear Filters</button>
        </div>
      ) : (
        <div className="product-container">
          {sortedProducts.map(product => {
            const outOfStock = product.stock <= 0
            const lowStock = !outOfStock && product.stock <= 5

            return (
              <div className="product-card" key={product.id}>
                <div
                  className="product-image"
                  onClick={() => openProduct(product)}
                >
                  <span className="product-category">
                    {product.category}
                  </span>
                  <span className="product-emoji">{product.icon}</span>
                  {outOfStock && (
                    <span className="stock-badge out">Out of stock</span>
                  )}
                  {lowStock && (
                    <span className="stock-badge low">
                      Only {product.stock} left
                    </span>
                  )}
                </div>

                <div className="product-info">
                  <div className="rating">⭐ {product.rating}</div>
                  <h3>{product.name}</h3>
                  <p className="product-description">
                    {product.description}
                  </p>

                  <div className="product-bottom">
                    <strong>{formatINR(product.price)}</strong>
                    <button
                      disabled={outOfStock}
                      onClick={() => addToCart(product)}
                    >
                      {outOfStock ? 'Sold Out' : '+ Cart'}
                    </button>
                  </div>

                  <button
                    className="view-details"
                    onClick={() => openProduct(product)}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default Products
