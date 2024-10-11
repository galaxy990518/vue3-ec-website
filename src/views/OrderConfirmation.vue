<template>
  <div class="container mx-auto px-4 py-8 text-center">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">訂單確認</h1>
    <p class="text-xl text-gray-600 mb-8">
      感謝您的購買! 您的訂單號碼是: <span class="font-bold">{{ orderNumber }}</span>
    </p>
    <button
      @click="backToHome"
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
    >
      返回首頁
    </button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const orderNumber = route.params.orderNumber;

const backToHome = () => {
  router.push({ name: 'productList' });
};
</script>
