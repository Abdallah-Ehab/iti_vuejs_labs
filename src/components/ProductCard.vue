<script setup>
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const buyEmit = defineEmits(['buy'])
const handleBuy = () => {
    buyEmit('buy', props.product.id)
}
</script>

<template>
  <RouterLink :to="`/product/${product.id}`" class="card bg-base-100 w-96 shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
    <figure>
      <img
        :src="product.image"
        :alt="product.name" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        {{ product.name }}
        <div v-if="product.badge" class="badge badge-secondary">{{ product.badge }}</div>
      </h2>
      <p>{{ product.description }}</p>
      <div class="card-actions justify-between items-center">
        <div class="text-lg font-bold">${{ product.price }}</div>
        <button class="btn btn-primary btn-sm" :disabled="product.stock === 0" @click.prevent="handleBuy">
          Buy Now
        </button>
      </div>
    </div>
  </RouterLink>
</template>