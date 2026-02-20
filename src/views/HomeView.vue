<script setup>
import products from '../data/products.js'
import ProductCard from '../components/ProductCard.vue'



const handleBuyProduct = (productId) => {
  const productIndex = products.value.findIndex(p => p.id === productId)
  if (productIndex !== -1 && products.value[productIndex].stock > 0) {
    products.value[productIndex].stock--
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-8">Our Products</h1>
    <div class="grid justify-content-center grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-5">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @buy="handleBuyProduct"
      />
    </div>
  </div>
</template>