import { mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createVuexStore } from '@/store';
import { routes } from '@/router';
import WeatherNowCard from './WeatherNowCard.vue';

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

function mountComponent(config = {}) {
  config.mountOptions = config.mountOptions || {};
  config.plugins = config.plugins || {};
  const store = config.store || createVuexStore();
  return mount(WeatherNowCard, {
    global: {
      plugins: [store, router],
    },
    ...config.mountOptions,
  });
}

let wrapper;

describe('WeatherNowCard', () => {
  beforeEach(() => {
    wrapper = mountComponent();
  });

  it('WeatherNowCard is exist', () => {
    expect(true).toBe(true);
  });
});
