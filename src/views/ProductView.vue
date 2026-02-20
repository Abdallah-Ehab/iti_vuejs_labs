<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import productsData from '../data/products.js'
import ProductDetails from '../components/ProductDetails.vue'
import CarouselBanner from '../components/CarouselBanner.vue'

const route = useRoute()


const currentProduct = computed(() => {
  const productId = parseInt(route.params.id)
  return productsData.value.find(product => product.id === productId) || productsData.value[0]
})

const handleBuyProduct = (productId) => {
  const productIndex = productsData.value.findIndex(p => p.id === productId)
  if (productIndex !== -1 && productsData.value[productIndex].stock > 0) {
    productsData.value[productIndex].stock--
  }
}
</script>

<template>
  <div>
    <ProductDetails :product="currentProduct" @buy-product="handleBuyProduct" />
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4 text-center">Other Products</h2>
      <div class="flex justify-center">
        <CarouselBanner />
      </div>
    </div>
  </div>
</template>