import { mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createVuexStore } from '@/store';
import { routes } from '@/router';
import Weather from './Weather.vue';

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

function mountComponent(config = {}) {
  config.mountOptions = config.mountOptions || {};
  config.plugins = config.plugins || {};
  const store = config.store || createVuexStore();
  return mount(Weather, {
    global: {
      plugins: [store, router],
    },
    ...config.mountOptions,
  });
}

let wrapper;

describe('Weather', () => {
  beforeEach(() => {
    wrapper = mountComponent();
  });

  it('Weather is exist', () => {
    expect(true).toBe(true);
  });
});
