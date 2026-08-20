// Central product catalog.
// In a real deployment this would come from an API (e.g. GET /api/products)
// backed by the inventory database. Keeping it here as a single source of
// truth at least stops the same array from being duplicated across files.

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 2499,
    rating: 4.5,
    icon: '🎧',
    category: 'Electronics',
    stock: 18,
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
    stock: 6,
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
    stock: 0,
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
    stock: 25,
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
    stock: 12,
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
    stock: 4,
    description:
      'Compact Bluetooth speaker delivering clear audio and deep bass wherever you go.'
  }
]

export default products
