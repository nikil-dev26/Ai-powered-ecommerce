import React, { useState } from 'react'
import './Products.css'

function Products({
  addToCart,
  search,
  openProduct
}) {

  const [category, setCategory] = useState('All')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 2499,
      rating: 4.5,
      icon: '🎧',
      category: 'Electronics',
      description:
        'Premium wireless headphones with powerful sound, comfortable ear cushions and long battery life.'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 3999,
      rating: 4.3,
      icon: '⌚',
      category: 'Electronics',
      description:
        'Modern smartwatch with fitness tracking, notifications and stylish premium design.'
    },
    {
      id: 3,
      name: 'Running Shoes',
      price: 2999,
      rating: 4.7,
      icon: '👟',
      category: 'Sports',
      description:
        'Lightweight running shoes designed for comfort, flexibility and everyday performance.'
    },
    {
      id: 4,
      name: 'Urban Backpack',
      price: 1499,
      rating: 4.2,
      icon: '🎒',
      category: 'Fashion',
      description:
        'Durable and stylish backpack perfect for work, college and everyday travel.'
    },
    {
      id: 5,
      name: 'Premium Sunglasses',
      price: 1299,
      rating: 4.6,
      icon: '🕶️',
      category: 'Fashion',
      description:
        'Trendy sunglasses with a modern frame designed for everyday style.'
    },
    {
      id: 6,
      name: 'Bluetooth Speaker',
      price: 1899,
      rating: 4.4,
      icon: '🔊',
      category: 'Electronics',
      description:
        'Compact Bluetooth speaker delivering clear audio and deep bass wherever you go.'
    }
  ]

  // Search + Category + Price Filter
  const filteredProducts = products.filter((product) => {

    const searchText = search.trim().toLowerCase()

    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText)

    const matchesCategory =
      category === 'All' ||
      product.category === category

    let matchesPrice = true

    if (priceRange === 'under1000') {
      matchesPrice = product.price < 1000
    }

    if (priceRange === '1000-2000') {
      matchesPrice =
        product.price >= 1000 &&
        product.price <= 2000
    }

    if (priceRange === '2000-3000') {
      matchesPrice =
        product.price > 2000 &&
        product.price <= 3000
    }

    if (priceRange === 'above3000') {
      matchesPrice = product.price > 3000
    }

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice
    )
  })

  // Sorting
  const sortedProducts = [...filteredProducts].sort(
    (a, b) => {

      if (sortBy === 'priceLow') {
        return a.price - b.price
      }

      if (sortBy === 'priceHigh') {
        return b.price - a.price
      }

      if (sortBy === 'ratingHigh') {
        return b.rating - a.rating
      }

      if (sortBy === 'nameAZ') {
        return a.name.localeCompare(b.name)
      }

      if (sortBy === 'nameZA') {
        return b.name.localeCompare(a.name)
      }

      return 0
    }
  )

  // Clear all filters
  function clearFilters() {
    setCategory('All')
    setPriceRange('all')
    setSortBy('default')
  }

  return (
    <section
      className="products"
      id="products"
    >

      {/* Section Heading */}

      <div className="section-heading">

        <span>OUR COLLECTION</span>

        <h2>Featured Products</h2>

        <p>
          Discover quality products at the best prices.
        </p>

      </div>


      {/* Filter Section */}

      <div className="product-toolbar">

        <div className="filter-title">

          <strong>Find Your Product</strong>

          <span>
            {sortedProducts.length} product(s) found
          </span>

        </div>


        {/* Category */}

        <div className="filter-group">

          <label>Category</label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            <option value="All">
              All Categories
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Fashion">
              Fashion
            </option>

            <option value="Sports">
              Sports
            </option>

          </select>

        </div>


        {/* Price */}

        <div className="filter-group">

          <label>Price</label>

          <select
            value={priceRange}
            onChange={(e) =>
              setPriceRange(e.target.value)
            }
          >

            <option value="all">
              All Prices
            </option>

            <option value="under1000">
              Under ₹1,000
            </option>

            <option value="1000-2000">
              ₹1,000 - ₹2,000
            </option>

            <option value="2000-3000">
              ₹2,000 - ₹3,000
            </option>

            <option value="above3000">
              Above ₹3,000
            </option>

          </select>

        </div>


        {/* Sorting */}

        <div className="filter-group">

          <label>Sort By</label>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >

            <option value="default">
              Default
            </option>

            <option value="priceLow">
              Price: Low to High
            </option>

            <option value="priceHigh">
              Price: High to Low
            </option>

            <option value="ratingHigh">
              Highest Rated
            </option>

            <option value="nameAZ">
              Name: A - Z
            </option>

            <option value="nameZA">
              Name: Z - A
            </option>

          </select>

        </div>


        {/* Clear */}

        <button
          className="clear-filters"
          onClick={clearFilters}
        >
          Reset
        </button>

      </div>


      {/* Active Filters */}

      {(category !== 'All' ||
        priceRange !== 'all' ||
        sortBy !== 'default') && (

        <div className="active-filters">

          <span>Active filters:</span>

          {category !== 'All' && (
            <button
              onClick={() => setCategory('All')}
            >
              {category} ×
            </button>
          )}

          {priceRange !== 'all' && (
            <button
              onClick={() => setPriceRange('all')}
            >
              Price Filter ×
            </button>
          )}

          {sortBy !== 'default' && (
            <button
              onClick={() => setSortBy('default')}
            >
              Sorting ×
            </button>
          )}

        </div>

      )}


      {/* Products */}

      {sortedProducts.length === 0 ? (

        <div className="no-products">

          <div className="no-product-icon">
            🔍
          </div>

          <h3>
            No Products Found
          </h3>

          <p>
            Try changing your search or filters.
          </p>

          <button
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>

      ) : (

        <div className="product-container">

          {sortedProducts.map((product) => (

            <div
              className="product-card"
              key={product.id}
            >

              {/* Product Image */}

              <div
                className="product-image"
                onClick={() =>
                  openProduct(product)
                }
              >

                <span className="product-category">
                  {product.category}
                </span>

                <span className="product-emoji">
                  {product.icon}
                </span>

              </div>


              {/* Product Info */}

              <div className="product-info">

                <div className="rating">
                  ⭐ {product.rating}
                </div>

                <h3>
                  {product.name}
                </h3>

                <p className="product-description">
                  {product.description}
                </p>


                <div className="product-bottom">

                  <strong>
                    ₹{product.price.toLocaleString('en-IN')}
                  </strong>

                  <button
                    onClick={() =>
                      addToCart(product)
                    }
                  >
                    + Cart
                  </button>

                </div>


                <button
                  className="view-details"
                  onClick={() =>
                    openProduct(product)
                  }
                >
                  View Details →
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  )
}

export default Products