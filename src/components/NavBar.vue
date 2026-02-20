<script setup>
import { computed } from 'vue';
import products from '../data/products.js'
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

const totalStock = computed(() => {
    return products.value.reduce((total, product) => total + product.stock, 0);
});
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
            <div class="badge badge-secondary">{{ totalStock }} items in stock</div>
        </li>
      </ul>
    </div>
  </div>
</template>