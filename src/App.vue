<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <router-link
          to="/"
          class="text-2xl font-bold text-gray-800 hover:text-gray-600 transition duration-300"
        >
          公仔世界
        </router-link>
        <nav class="flex items-center">
          <router-link to="/" class="text-gray-600 hover:text-gray-800 mx-2">首頁</router-link>
          <router-link to="/cart" class="text-gray-600 hover:text-gray-800 mx-2 relative">
            購物車
            <span
              v-if="cartItemCount > 0"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              {{ cartItemCount }}
            </span>
          </router-link>
        </nav>
      </div>
    </header>

    <main class="flex-grow">
      <router-view></router-view>
    </main>

    <footer class="bg-gray-800 text-white py-4">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; 2024 公仔世界. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, provide } from 'vue';
import { useGtag } from 'vue-gtag-next';

const { event } = useGtag();

const cartItems = ref([]);
provide('cartItems', cartItems);

const cartItemCount = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
});

const total = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});
provide('total', total);

const addToCart = (product) => {
  const existingItem = cartItems.value.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.value.push({ ...product, quantity: 1 });
  }
};

provide('addToCart', addToCart);

const trackEvent = (action, category, label, value) => {
  event(action, {
    event_category: category,
    event_label: label,
    value: value
  });
};

defineExpose({ trackEvent });
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-x: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
