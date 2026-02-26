<script setup>
import { useCartStore } from '../../stores/UseCartStore'

const cartStore = useCartStore()

const handleRemoveFromCart = (id) => {
  cartStore.removeFromCart(id)
}

const handleClearCart = () => {
  cartStore.clearCart()
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-8">Shopping Cart</h1>

    <!-- Empty state -->
    <div v-if="cartStore.items.length === 0" class="text-center py-16">
      <div class="text-6xl mb-4">🛒</div>
      <h2 class="text-2xl font-bold mb-4">Your cart is empty</h2>
      <p class="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
      <router-link
        to="/"
        class="btn btn-primary"
      >
        Continue Shopping
      </router-link>
    </div>

    <!-- Cart items -->
    <div v-else>
      <div class="grid gap-6 mb-8">
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="card bg-base-100 shadow-xl"
        >
          <div class="card-body">
            <div class="flex items-center gap-4">
              <div class="avatar">
                <div class="w-16 rounded">
                  <img :src="item.image" :alt="item.imageAlt" />
                </div>
              </div>

              <div class="flex-1">
                <h3 class="card-title">{{ item.title }}</h3>
                <p class="text-gray-600">{{ item.description }}</p>
                <div class="flex items-center gap-4 mt-2">
                  <span class="font-bold">${{ item.price.toFixed(2) }}</span>
                  <span class="text-sm text-gray-500">Quantity: {{ item.quantity }}</span>
                  <span class="font-bold text-primary">${{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>

              <div class="card-actions">
                <button
                  @click="handleRemoveFromCart(item.id)"
                  class="btn btn-error btn-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart summary -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <div class="flex justify-between items-center text-xl font-bold">
            <span>Total Items: {{ cartStore.totalItems }}</span>
            <span>Total Price: ${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>

          <div class="card-actions justify-center mt-4">
            <button
              @click="handleClearCart"
              class="btn btn-outline btn-warning"
            >
              Clear Cart
            </button>
            <button class="btn btn-primary btn-wide">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>