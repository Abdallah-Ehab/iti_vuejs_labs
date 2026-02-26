<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '../../stores/UseCartStore'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()

const discountedPrice = computed(() => {
  if (props.product.discount > 0) {
    return props.product.price * (1 - props.product.discount / 100)
  }
  return props.product.price
})

const hasDiscount = computed(() => {
  return props.product.discount > 0
})

const handleBuyNow = async () => {
  if (props.product.stock > 0) {
    try {
      await cartStore.addToCart(props.product)
    } catch (error) {
      console.error('Failed to add product to cart:', error)
      // Could show a toast notification here
    }
  }
}

onMounted(() => {
  console.log('ProductDetails mounted with product:', props.product)
})
onUnmounted(() => {
  console.log('ProductDetails unmounted')
})
</script>

<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content flex-col lg:flex-row">
      <img
        :src="product.image"
        :alt="product.imageAlt"
        class="max-w-sm rounded-lg shadow-2xl"
      />
      <div>
        <h1 class="text-5xl font-bold">{{ product.title }}</h1>
        <p class="py-6">
          {{ product.description }}
        </p>


        <div class="mb-6">
          <div v-if="hasDiscount" class="flex items-center gap-3">
            <span class="text-3xl font-bold text-primary">${{ discountedPrice.toFixed(2) }}</span>
            <span class="text-lg text-gray-500 line-through">${{ product.price.toFixed(2) }}</span>
            <div class="badge badge-error text-white font-medium">-{{ product.discount }}%</div>
          </div>
          <div v-else>
            <span class="text-3xl font-bold text-primary">${{ product.price.toFixed(2) }}</span>
          </div>
        </div>

        <div class="flex items-center gap-3 mb-4">
          <button
            class="btn btn-primary"
            @click.prevent="handleBuyNow"
            :disabled="product.stock === 0"
          >
            {{ product.stock > 0 ? 'Buy Now' : 'Out of Stock' }}
          </button>
          <div
            v-if="product.stock > 0"
            class="badge badge-success gap-2 text-white font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {{ product.stock }} in stock
          </div>
          <div
            v-else
            class="badge badge-error gap-2 text-white font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Out of stock
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="tag in product.tags"
            :key="tag"
            class="badge text-white badge-neutral"
          >
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>