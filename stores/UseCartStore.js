import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage'
import { useProductStore } from './UseProductStore'

export const useCartStore = defineStore('cart', () => {
  // Use useLocalStorage composable for persistence
  const items = useLocalStorage('cart', [])

  const totalItems = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0),
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity * i.price, 0),
  )

  const addToCart = async (product) => {
    // First decrease stock in the product store
    const productStore = useProductStore()
    try {
      await productStore.decreaseStock(product.id)

      // Then add to cart
      const item = items.value.find((i) => i.id === product.id)
      if (item) {
        item.quantity++
      } else {
        items.value.push({ ...product, quantity: 1 })
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
      throw error
    }
  }

  const removeFromCart = (id) => {
    items.value = items.value.filter((i) => i.id !== id)
  }

  const clearCart = () => {
    items.value = []
  }

  return { items, totalItems, totalPrice, addToCart, removeFromCart, clearCart }
})
