<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import products from '../data/products.js'

const route = useRoute()

const filteredProducts = computed(() => {
  const currentProductId = parseInt(route.params.id)
  return products.value.filter(product => product.id !== currentProductId)
})

I'm task_3
</script>

<template>
  <div class="carousel rounded-box w-full max-w-6xl mx-auto">
    <div v-for="product in filteredProducts" :key="product.id" class="carousel-item">
      <RouterLink :to="`/product/${product.id}`" class="card w-64 bg-base-100 shadow-xl mx-2 hover:shadow-2xl transition-shadow cursor-pointer">
        <figure>
          <img
            :src="product.image"
            :alt="product.name"
            class="h-48 w-full object-cover" />
        </figure>
        <div class="card-body p-4">
          <h2 class="card-title text-sm">{{ product.name }}</h2>
          <p class="text-xs text-gray-600 truncate">{{ product.description }}</p>
          <div class="card-actions justify-between items-center">
            <div class="badge badge-outline">${{ product.price }}</div>
            <div v-if="product.badge" class="badge badge-primary">{{ product.badge }}</div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
