<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../../stores/UseProductStore'
import ProductCard from '../components/ProductCard.vue'
import CarouselBanner from '../components/CarouselBanner.vue'

const productStore = useProductStore()

onMounted(async () => {
  await productStore.fetchProducts()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Carousel Banner -->
    <CarouselBanner class="mb-8" />

    <!-- Loading State -->
    <div v-if="productStore.loading" class="text-center py-16">
      <div class="loading loading-spinner loading-lg"></div>
      <p class="mt-4 text-lg">Loading products...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="productStore.error" class="text-center py-16">
      <div class="text-6xl mb-4">😕</div>
      <h2 class="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
      <p class="text-red-600 mb-6">{{ productStore.error }}</p>
      <button
        @click="productStore.fetchProducts()"
        class="btn btn-primary"
      >
        Try Again
      </button>
    </div>

    <!-- Products Grid -->
    <div v-else>
      <h1 class="text-4xl font-bold text-center mb-8">Our Products</h1>
      <div class="grid justify-content-center grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-5">
        <ProductCard
          v-for="product in productStore.products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>