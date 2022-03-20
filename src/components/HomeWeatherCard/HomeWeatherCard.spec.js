import { mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createVuexStore } from '@/store';
import { routes } from '@/router';
import HomeWeatherCard from './HomeWeatherCard.vue';

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

function mountComponent(config = {}) {
  config.mountOptions = config.mountOptions || {};
  config.plugins = config.plugins || {};
  const store = config.store || createVuexStore();
  return mount(HomeWeatherCard, {
    global: {
      plugins: [store, router],
    },
    ...config.mountOptions,
  });
}

let wrapper;

describe('HomeWeatherCard', () => {
  beforeEach(() => {
    wrapper = mountComponent();
  });

  it('HomeWeatherCard is exist', () => {
    expect(true).toBe(true);
  });
});
