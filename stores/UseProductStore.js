import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApi } from '../composables/UseApi'

export const useProductStore = defineStore('products', () => {
  const products = ref([])
  const { data, loading, error, getAll, update } = useApi(
    'http://localhost:3000/products',
  )

  const fetchProducts = async () => {
    await getAll()
    products.value = data.value || []
  }

  const getProductById = computed(() => {
    return (id) => products.value.find((p) => p.id === String(id))
  })

  const decreaseStock = async (id) => {
    console.log('Decreasing stock for product:', id)
    // Ensure id is string for comparison with database IDs
    const productId = String(id)
    const product = products.value.find((p) => p.id === productId)
    console.log('Found product:', product)

    if (!product || product.stock <= 0) {
      console.log('Product not found or out of stock')
      return
    }

    // Update local state first
    product.stock--
    console.log('Updated local stock to:', product.stock)

    // Then update the server with PUT request (full product object)
    try {
      await update(productId, product)
      console.log('Server updated successfully')
    } catch (error) {
      // Revert local state if server update fails
      product.stock++
      console.error('Failed to update stock on server:', error)
      throw error // Re-throw to handle in components
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    decreaseStock,
  }
})
