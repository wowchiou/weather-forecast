import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/:city',
    name: 'weather',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '@/views/Weather'),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
