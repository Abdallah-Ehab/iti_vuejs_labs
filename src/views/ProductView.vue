<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import productsData from '../data/products.js'
import ProductDetails from '../components/ProductDetails.vue'
import CarouselBanner from '../components/CarouselBanner.vue'

const route = useRoute()


const products = ref([...productsData.value])

const currentProduct = computed(() => {
  const productId = parseInt(route.params.id)
  return products.value.find(product => product.id === productId) || products.value[0]
})

const handleBuyProduct = (productId) => {
  const productIndex = products.value.findIndex(p => p.id === productId)
  if (productIndex !== -1 && products.value[productIndex].stock > 0) {
    products.value[productIndex].stock--
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