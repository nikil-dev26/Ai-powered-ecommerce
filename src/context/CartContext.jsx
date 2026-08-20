import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'shopsmart_cart'

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      // Corrupt or blocked storage should never crash the app
      return []
    }
  })

  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // Ignore storage write failures (e.g. private browsing quota)
    }
  }, [cart])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(timer)
  }, [toast])

  function addToCart(product, qty = 1) {
    if (!product || product.stock <= 0) {
      setToast(`${product?.name || 'Item'} is out of stock`)
      return
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      const currentQty = existing ? existing.quantity : 0
      const nextQty = Math.min(currentQty + qty, product.stock)

      if (nextQty === currentQty) {
        setToast(`Only ${product.stock} left in stock`)
        return prev
      }

      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: nextQty } : item
        )
      }

      return [...prev, { ...product, quantity: nextQty }]
    })

    setToast(`${product.name} added to cart`)
  }

  function increaseQty(id) {
    setCart(prev =>
      prev.map(item => {
        if (item.id !== id) return item
        if (item.quantity >= item.stock) {
          setToast(`Only ${item.stock} left in stock`)
          return item
        }
        return { ...item, quantity: item.quantity + 1 }
      })
    )
  }

  function decreaseQty(id) {
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  function removeItem(id) {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  function clearCart() {
    setCart([])
  }

  const itemCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  )

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  )

  const value = {
    cart,
    itemCount,
    subtotal,
    toast,
    addToCart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
