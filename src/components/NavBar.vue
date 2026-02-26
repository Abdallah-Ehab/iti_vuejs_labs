<script setup>
import { useCartStore } from '../../stores/UseCartStore'

const cartStore = useCartStore()

const links = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'About',
        href: '/about'
    },
]
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost text-xl">Product Store</RouterLink>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li v-for="link in links" :key="link.name">
          <RouterLink :to="link.href" class="hover:bg-base-200">{{ link.name }}</RouterLink>
        </li>
        <li>
          <RouterLink to="/cart" class="hover:bg-base-200">
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m.6 0L6 5H4m3 8a2 2 0 100 4 2 2 0 000-4zm12 0a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              <span v-if="cartStore.totalItems > 0" class="badge badge-sm badge-primary indicator-item">
                {{ cartStore.totalItems }}
              </span>
            </div>
            Cart
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>