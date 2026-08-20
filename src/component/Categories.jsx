import React from 'react'
import './Categories.css'

const categories = [
  { id: 1, name: 'Electronics', icon: '📱', count: '120+ Items' },
  { id: 2, name: 'Fashion', icon: '👕', count: '250+ Items' },
  { id: 3, name: 'Beauty', icon: '💄', count: '180+ Items' },
  { id: 4, name: 'Grocery', icon: '🛒', count: '300+ Items' },
  { id: 5, name: 'Sports', icon: '⚽', count: '100+ Items' },
  { id: 6, name: 'Home', icon: '🏠', count: '200+ Items' }
]

function Categories() {
  return (
    <section className="categories" id="categories">
      <div className="section-heading">
        <span>EXPLORE</span>
        <h2>Shop By Category</h2>
        <p>Everything you need, organized just for you.</p>
      </div>

      <div className="category-container">
        {categories.map(category => (
          <div className="category-card" key={category.id}>
            <div className="category-icon">{category.icon}</div>
            <h3>{category.name}</h3>
            <p>{category.count}</p>
            <button>Explore →</button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Categories
