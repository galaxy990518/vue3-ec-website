<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">結帳</h1>
    <form
      @submit.prevent="submitOrder"
      class="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name"> 姓名 </label>
        <input
          v-model="name"
          id="name"
          type="text"
          placeholder="請輸入姓名"
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="address"> 地址 </label>
        <input
          v-model="address"
          id="address"
          type="text"
          placeholder="請輸入地址"
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email"> 電子郵件 </label>
        <input
          v-model="email"
          id="email"
          type="email"
          placeholder="請輸入電子郵件"
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
        >
          完成購買
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useGtag } from 'vue-gtag-next';

const router = useRouter();
const { event } = useGtag();

const cartItems = inject('cartItems');
const total = inject('total');

const name = ref('小明');
const address = ref('台北市大安區');
const email = ref('test@test.com');

const submitOrder = () => {
  const orderNumber = Date.now().toString();

  console.log('訂單已提交', {
    name: name.value,
    address: address.value,
    email: email.value,
    orderNumber: orderNumber
  });

  event('purchase', {
    send_to: [import.meta.env.VITE_GA4_MEASUREMENT_ID, import.meta.env.VITE_PURCHASE_CONVERSION_ID],
    transaction_id: orderNumber,
    value: total.value,
    currency: 'TWD',
    items: cartItems.value.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }))
  });

  cartItems.value = [];

  router.push({
    name: 'orderConfirmation',
    params: { orderNumber: orderNumber }
  });
};
</script>
