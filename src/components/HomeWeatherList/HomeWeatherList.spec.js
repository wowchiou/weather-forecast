import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createVuexStore } from '@/store';
import { routes } from '@/router';
import HomeWeatherList from './HomeWeatherList.vue';
import weatherForecast from '@/mocks/weather-forecast.json';
import { WEATHER_CITY } from '@/storage.js';

const store = createVuexStore({ weatherForecast });
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});
let wrapper;
const cityArray = ['新竹縣', '桃園市', '新竹市'];

describe('HomeWeatherList', () => {
  beforeEach(() => {
    localStorage.setItem(WEATHER_CITY, cityArray.join('/'));
    wrapper = mount(HomeWeatherList, {
      global: {
        plugins: [store, router],
      },
    });
  });

  it(`weather list has ${cityArray.length}`, () => {
    const $WEATHER_LiST = wrapper.findAll('[data-test="weather-list"]');
    expect($WEATHER_LiST).toHaveLength(cityArray.length);
  });

  it(`click remove button, weather list has ${
    cityArray.length - 1
  }`, async () => {
    const $REMOVE_BUTTON = wrapper.find('[data-test="remove-button"]');
    await $REMOVE_BUTTON.trigger('click');
    const $WEATHER_LiST = wrapper.findAll('[data-test="weather-list"]');
    expect($WEATHER_LiST).toHaveLength(cityArray.length - 1);
  });

  it(`weather list has current city name`, () => {
    const $WEATHER_LiST = wrapper.findAll('[data-test="weather-list"]');
    expect($WEATHER_LiST[0].find('[data-test="city-name"]').text()).toEqual(
      '新竹縣'
    );
  });

  it(`weather list has current temperature`, () => {
    const $WEATHER_LiST = wrapper.findAll('[data-test="weather-list"]');
    expect($WEATHER_LiST[0].find('[data-test="weather-t"]').text()).toContain(
      '21'
    );
  });

  it(`weather list has current wx`, () => {
    const $WEATHER_LiST = wrapper.findAll('[data-test="weather-list"]');
    expect($WEATHER_LiST[0].find('[data-test="weather-wx"]').text()).toEqual(
      '短暫雨'
    );
  });

  it(`weather list has current pop`, () => {
    const $WEATHER_LiST = wrapper.findAll('[data-test="weather-list"]');
    expect($WEATHER_LiST[0].find('[data-test="weather-pop"]').text()).toContain(
      '30'
    );
  });

  it(`weather list has current weather picture`, () => {
    const $WEATHER_LiST = wrapper.findAll('[data-test="weather-list"]');
    expect($WEATHER_LiST[0].find('[data-test="weather-pic"]').html()).toContain(
      '08'
    );
    let status = 'day';
    if (new Date().getHours() >= 18 || new Date().getHours() < 6) {
      status = 'night';
    }
    expect($WEATHER_LiST[0].find('[data-test="weather-pic"]').html()).toContain(
      status
    );
  });

  it(`click weather list routes to weather page with city name`, async () => {
    const $WEATHER_LIST_LINK = wrapper.findAll(
      '[data-test="weather-list-link"]'
    );
    await $WEATHER_LIST_LINK[0].trigger('click');
    await flushPromises();
    expect(wrapper.vm.$route.name).toContain('weather');
    expect(wrapper.vm.$route.params.city).toEqual(cityArray[0]);
  });
});
