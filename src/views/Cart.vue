<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">購物車</h1>
    <div v-if="cartItems.length === 0" class="text-center text-gray-600">
      購物車是空的，快去選購喜歡的公仔吧！
    </div>
    <div v-else>
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="border-b border-gray-200 last:border-b-0"
        >
          <div class="flex items-center p-4">
            <img
              :src="item.imageSrc"
              :alt="item.name"
              class="w-20 h-20 object-cover rounded-md mr-4"
            />
            <div class="flex-grow">
              <h2 class="text-lg font-semibold text-gray-800">{{ item.name }}</h2>
              <p class="text-gray-600">價格: ${{ item.price }}</p>
            </div>
            <div class="flex items-center">
              <button
                @click="decreaseQuantity(item)"
                class="bg-gray-200 text-gray-800 px-2 py-1 rounded-l"
              >
                -
              </button>
              <span class="bg-gray-100 px-4 py-1">{{ item.quantity }}</span>
              <button
                @click="increaseQuantity(item)"
                class="bg-gray-200 text-gray-800 px-2 py-1 rounded-r"
              >
                +
              </button>
            </div>
            <button @click="removeItem(item)" class="ml-4 text-red-500 hover:text-red-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="mt-8 flex justify-between items-center">
        <p class="text-xl font-semibold text-gray-800">總計: ${{ total }}</p>
        <button
          @click="checkout"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          :disabled="cartItems.length === 0"
        >
          結帳
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useGtag } from 'vue-gtag-next';

const router = useRouter();
const { event } = useGtag();

const cartItems = inject('cartItems');

const total = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const increaseQuantity = (item) => {
  item.quantity++;
};

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
  }
};

const removeItem = (item) => {
  const index = cartItems.value.findIndex((i) => i.id === item.id);
  if (index !== -1) {
    cartItems.value.splice(index, 1);
  }
};

const checkout = () => {
  if (cartItems.value.length > 0) {
    router.push({ name: 'checkout' });
    event('begin_checkout', {
      items: cartItems.value,
      value: total.value
    });
  } else {
    alert('購物車是空的,請先添加商品');
  }
};
</script>
