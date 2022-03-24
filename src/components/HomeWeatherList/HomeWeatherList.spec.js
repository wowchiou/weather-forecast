import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createVuexStore } from '@/store';
import { routes } from '@/router';
import HomeWeatherList from './HomeWeatherList.vue';
import weatherForecast from '@/mocks/weather-forecast.json';
import { WEATHER_CITY } from '@/storage.js';
import useWeather from '@/utils/useWeather';

const store = createVuexStore({ weatherForecast });
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});
const { getWeatherPic, getWeatherValue } = useWeather({
  weatherForecast,
});
let wrapper;
const cityArray = ['新北市', '桃園市', '新竹市'];

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
    expect($WEATHER_LiST[0].find('[data-test="city-name"]').text()).toContain(
      cityArray[0]
    );
  });

  it(`weather list has current temperature`, () => {
    const $WEATHER_LiST = wrapper.findAll('[data-test="weather-list"]');
    expect($WEATHER_LiST[0].find('[data-test="weather-t"]').text()).toContain(
      getWeatherValue(cityArray[0], 'T')
    );
  });

  it(`weather list has current wx`, () => {
    const $WEATHER_LiST = wrapper.findAll('[data-test="weather-list"]');
    expect($WEATHER_LiST[0].find('[data-test="weather-wx"]').text()).toContain(
      getWeatherValue(cityArray[0], 'Wx')
    );
  });

  it(`weather list has current pop`, () => {
    const $WEATHER_LiST = wrapper.findAll('[data-test="weather-list"]');
    expect($WEATHER_LiST[0].find('[data-test="weather-pop"]').text()).toContain(
      getWeatherValue(cityArray[0], 'PoP6h')
    );
  });

  it(`weather list has current weather picture`, () => {
    const $WEATHER_LiST = wrapper.findAll('[data-test="weather-list"]');
    const wxValue = getWeatherValue(cityArray[0], 'Wx', 1);
    expect($WEATHER_LiST[0].find('[data-test="weather-pic"]').html()).toContain(
      getWeatherPic(wxValue)
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
