import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from '@/router';
import AppHeader from './AppHeader.vue';

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

function mountComponent(config = {}) {
  config.mountOptions = config.mountOptions || {};
  config.plugins = config.plugins || {};
  return shallowMount(AppHeader, {
    global: {
      plugins: [router],
    },
    ...config.mountOptions,
  });
}

let wrapper;

describe('AppHeader', () => {
  beforeEach(() => {
    wrapper = mountComponent();
  });

  it('has link', () => {
    const $LINK = wrapper.findAll('[data-test="header-link"]');
    expect($LINK).toHaveLength(1);
  });

  it('click header link routes to the home page', async () => {
    const $LINK = wrapper.find('[data-test="header-link"]');
    await $LINK.trigger('click');
    await router.isReady();
    expect(wrapper.vm.$route.name).toContain('home');
  });

  it('render dark mode switch button', () => {
    const $SWITCH_BUTTON = wrapper.find('[data-test="dark-mode-switch"]');
    expect($SWITCH_BUTTON.exists()).toBeTruthy();
  });
});
