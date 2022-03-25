import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from '@/router';
import { createVuexStore } from '@/store';
import CitySelector from './CitySelector.vue';
import weatherForecast from '@/mocks/weather-forecast.json';
import { WEATHER_CITY } from '@/storage.js';

const store = createVuexStore({ weatherForecast });

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

let wrapper;
const cityLength = weatherForecast.length;

describe('CitySelector', () => {
  beforeEach(() => {
    wrapper = shallowMount(CitySelector, {
      global: {
        plugins: [store, router],
      },
    });
  });

  it(`selector has ${cityLength} options`, () => {
    const $CITY_OPTIONS = wrapper.findAll('[data-test="city-options"]');
    expect($CITY_OPTIONS).toHaveLength(cityLength);
  });

  it(`change select, routes to weather page and set local storage`, async () => {
    const CITY = '新竹縣';
    const $CITY_SELECTOR = wrapper.find('[data-test="city-selector"]');
    await $CITY_SELECTOR.setValue(CITY);
    await router.isReady();
    expect(wrapper.vm.$route.name).toContain('weather');
    expect(localStorage.getItem(WEATHER_CITY)).toContain(CITY);
  });
});
