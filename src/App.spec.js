import { mount, flushPromises } from '@vue/test-utils';
import { createVuexStore } from '@/store';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from '@/router';
import Http from '@/services';
import App from '@/App.vue';
import AppLoader from '@/components/AppLoader';

let store;
let router;
let wrapper;

describe(`App`, () => {
  beforeEach(() => {
    // create teleport target
    const el = document.createElement('div');
    el.id = 'portal-loader';
    document.body.appendChild(el);

    // jest.mock('@/store');
    jest.clearAllMocks();

    store = createVuexStore();
    router = createRouter({
      history: createWebHashHistory(process.env.BASE_URL),
      routes,
    });

    wrapper = mount(App, {
      global: { plugins: [store, router] },
    });
  });

  afterEach(() => {
    // clean up
    document.body.outerHTML = '';
  });

  // it(`display home pag when getWeatherForecast call success`, async () => {
  //   jest.spyOn(Http, 'getWeatherForecast').mockResolvedValueOnce();
  //   jest.spyOn(Http, 'getWeekWeather').mockResolvedValueOnce();
  //   wrapper = mount(App, {
  //     global: { plugins: [store, router] },
  //   });
  //   await flushPromises();
  //   expect(wrapper.vm.$route.name).toEqual('home');
  // });

  it(`display error page when getWeatherForecast call fail`, async () => {
    jest.spyOn(Http, 'getWeatherForecast').mockRejectedValueOnce();
    wrapper = mount(App, {
      global: { plugins: [store, router] },
    });
    await flushPromises();
    expect(Http.getWeatherForecast).toBeCalledTimes(1);
    expect(wrapper.vm.$route.name).toEqual('error');
    expect(wrapper.find('[data-test="error-message"]').text()).toEqual(
      'Network error, 請稍後再試！'
    );
  });

  it(`display error page when getWeekWeather call fail`, async () => {
    jest.spyOn(Http, 'getWeekWeather').mockRejectedValueOnce();
    wrapper = mount(App, {
      global: { plugins: [store, router] },
    });
    await flushPromises();
    expect(Http.getWeekWeather).toBeCalledTimes(1);
    expect(wrapper.vm.$route.name).toEqual('error');
    expect(wrapper.find('[data-test="error-message"]').text()).toEqual(
      'Network error, 請稍後再試！'
    );
  });

  it(`app header exists`, () => {
    expect(wrapper.find('[data-test="app-header"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="app-header"]').html()).toContain('天氣');
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
