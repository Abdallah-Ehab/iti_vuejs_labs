<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../../stores/UseProductStore'
import ProductDetails from '../components/ProductDetails.vue'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()
const productStore = useProductStore()

onMounted(async () => {
  if (productStore.products.length === 0) {
    await productStore.fetchProducts()
  }
})

const currentProduct = computed(() => {
  return productStore.getProductById(route.params.id)
})

const relatedProducts = computed(() => {
  return productStore.products.filter(p => p.id !== route.params.id)
})
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="productStore.loading" class="text-center py-16">
      <div class="loading loading-spinner loading-lg"></div>
      <p class="mt-4 text-lg">Loading product...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="productStore.error" class="text-center py-16">
      <div class="text-6xl mb-4">😕</div>
      <h2 class="text-2xl font-bold mb-4">Product not found</h2>
      <p class="text-red-600 mb-6">{{ productStore.error }}</p>
      <router-link to="/" class="btn btn-primary">
        Back to Home
      </router-link>
    </div>

    <!-- Product Details -->
    <div v-else-if="currentProduct">
      <ProductDetails :product="currentProduct" />

      <!-- Related Products -->
      <div class="mt-16 container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8 text-center">Related Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          <ProductCard
            v-for="product in relatedProducts.slice(0, 4)"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>

    <!-- Product Not Found -->
    <div v-else class="text-center py-16">
      <div class="text-6xl mb-4">🔍</div>
      <h2 class="text-2xl font-bold mb-4">Product not found</h2>
      <p class="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
      <router-link to="/" class="btn btn-primary">
        Back to Home
      </router-link>
    </div>
  </div>
</template>