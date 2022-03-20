import { mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createVuexStore } from '@/store';
import { routes } from '@/router';
import AppNavigation from './AppNavigation.vue';

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

function mountComponent(config = {}) {
  config.mountOptions = config.mountOptions || {};
  config.plugins = config.plugins || {};
  const store = config.store || createVuexStore();
  return mount(AppNavigation, {
    global: {
      plugins: [store, router],
    },
    ...config.mountOptions,
  });
}

let wrapper;

describe('AppNavigation', () => {
  beforeEach(() => {
    wrapper = mountComponent();
  });

  it('AppNavigation is exist', () => {
    expect(true).toBe(true);
  });
});
