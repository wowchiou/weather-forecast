import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';
import './assets/scss/main.scss';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';

createApp(App).use(store).use(router).mount('#app');
