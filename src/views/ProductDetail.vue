<template>
  <div v-if="product" class="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden my-8">
    <img :src="product.imageSrc" :alt="product.name" class="w-full h-64 object-cover" />
    <div class="p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ product.name }}</h1>
      <p class="text-2xl text-gray-600 mb-4">價格: ${{ product.price }}</p>
      <p class="text-gray-700 mb-6">{{ product.description }}</p>
      <button
        @click="addToCart"
        class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition duration-300"
      >
        加入購物車
      </button>
    </div>
  </div>
  <div v-else class="text-center text-gray-600 my-8">商品不存在或已下架</div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router';
import { useGtag } from 'vue-gtag-next';
import { PRODUCTS } from '@/constants/products';

const route = useRoute();
const { event } = useGtag();
const product = ref(null);

const addToCartGlobal = inject('addToCart');

onMounted(() => {
  const id = parseInt(route.params.id);
  product.value = PRODUCTS.find((p) => p.id === id);

  if (product.value) {
    event('view_item', {
      send_to: [
        import.meta.env.VITE_GA4_MEASUREMENT_ID,
        import.meta.env.VITE_VIEWITEM_CONVERSION_ID
      ],
      items: [{ id: product.value.id, name: product.value.name, price: product.value.price }],
      value: product.value.price,
      currency: 'TWD'
    });
  }
});

const addToCart = () => {
  if (product.value) {
    addToCartGlobal(product.value);
    console.log('添加到購物車:', product.value);

    event('add_to_cart', {
      send_to: [
        import.meta.env.VITE_GA4_MEASUREMENT_ID,
        import.meta.env.VITE_ADDTOCART_CONVERSION_ID
      ],
      items: [{ id: product.value.id, name: product.value.name, price: product.value.price }],
      value: product.value.price,
      currency: 'TWD'
    });

    alert(`${product.value.name} 已添加到購物車`);
  }
};
</script>
