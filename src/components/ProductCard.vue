<script setup>
import { useCartStore } from '../../stores/UseCartStore'

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const cartStore = useCartStore()

const handleAddToCart = async () => {
  try {
    await cartStore.addToCart(props.product)
  } catch (error) {
    console.error('Failed to add product to cart:', error)
    // Could show a toast notification here
  }
}
</script>

<template>
  <RouterLink :to="`/product/${product.id}`" class="card bg-base-100 w-96 shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
    <figure>
      <img
        :src="product.image"
        :alt="product.imageAlt" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        {{ product.title }}
        <div v-for="tag in product.tags" :key="tag" class="badge badge-secondary">{{ tag }}</div>
      </h2>
      <p>{{ product.description }}</p>
      <div class="card-actions justify-between items-center">
        <div class="text-lg font-bold">${{ product.price.toFixed(2) }}</div>
        <button
          class="btn btn-primary btn-sm"
          :disabled="product.stock === 0"
          @click.prevent="handleAddToCart"
        >
          {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
        </button>
      </div>
      <div v-if="product.stock <= 5" class="text-sm text-orange-600">
        Only {{ product.stock }} left in stock!
      </div>
    </div>
  </RouterLink>
</template>