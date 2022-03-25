import { mount } from '@vue/test-utils';
import { createVuexStore } from '@/store';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from '@/router';
import App from '@/App.vue';
import AppLoader from '@/components/AppLoader';

let wrapper;
const store = createVuexStore();
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

describe(`App`, () => {
  beforeEach(() => {
    // create teleport target
    const el = document.createElement('div');
    el.id = 'portal-loader';
    document.body.appendChild(el);

    wrapper = mount(App, {
      global: { plugins: [store, router] },
    });
  });

  afterEach(() => {
    // clean up
    document.body.outerHTML = '';
  });

  it(`app header exists`, () => {
    expect(wrapper.find('[data-test="app-header"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="app-header"]').html()).toContain('天氣');
  });

  it(`app loader show`, () => {
    expect(wrapper.findComponent(AppLoader).exists()).toBeTruthy();
  });

  it(`app loader do not show`, () => {
    const store = createVuexStore({ loader: false });
    wrapper = mount(App, { global: { plugins: [store, router] } });
    expect(wrapper.findComponent(AppLoader).exists()).toBeFalsy();
  });

  it(`App initial route`, async () => {
    router.push('/');
    await router.isReady();
    expect(wrapper.find('[data-test="edit-button"]').exists()).toBeTruthy();
  });
});
