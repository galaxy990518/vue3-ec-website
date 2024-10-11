import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueGtag from 'vue-gtag-next'

const app = createApp(App);

const vueGTagSettings = {
  property: { id: import.meta.env.VITE_GA4_MEASUREMENT_ID }
};
app.use(VueGtag, vueGTagSettings);

app.use(router);

app.mount('#app');
