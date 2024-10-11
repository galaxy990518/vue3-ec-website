<template>
  <div class="flex-grow bg-gray-100 py-8">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">商品列表</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105"
        >
          <img :src="product.imageSrc" :alt="product.name" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ product.name }}</h2>
            <p class="text-gray-600 mb-4">價格: ${{ product.price }}</p>
            <div class="flex justify-between">
              <button
                @click="viewProduct(product.id)"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                查看商品
              </button>
              <button
                @click="addToCart(product)"
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useGtag } from 'vue-gtag-next';
import { PRODUCTS } from '@/constants/products';

const router = useRouter();
const { event } = useGtag();

const addToCartGlobal = inject('addToCart');

const products = ref(PRODUCTS);

const viewProduct = (id) => {
  router.push({ name: 'productDetail', params: { id } });
  event('view_item', {
    items: [{ id: id, name: `商品${id}` }]
  });
};

const addToCart = (product) => {
  addToCartGlobal(product);
  console.log('添加到購物車:', product);
  event('add_to_cart', {
    items: [{ id: product.id, name: product.name, price: product.price }]
  });
  alert(`${product.name} 已添加到購物車`);
};
</script>
