import { createRouter, createWebHashHistory } from 'vue-router';
import CITY from '@/city.json';
import Home from '@/views/Home';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/weather/:city',
    name: 'weather',
    beforeEnter: (to, from, next) => {
      const isCityExist = CITY.find((itm) => itm === to.params.city);
      if (!isCityExist) {
        next({
          name: 'error',
          params: { message: `Can not find ${to.params.city}.` },
        });
      }
      next();
    },
    props: true,
    component: () =>
      import(/* webpackChunkName: "weather" */ '@/views/Weather'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error',
    props: true,
    component: () =>
      import(/* webpackChunkName: "error" */ '@/views/ErrorPage'),
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
