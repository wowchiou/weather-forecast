import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/weather',
    name: 'weather',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Weather'),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
