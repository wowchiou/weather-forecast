import { mount } from '@vue/test-utils';
import { createVuexStore } from '@/store';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from '@/router';
import { WEATHER_CITY } from '@/storage.js';
import weatherForecast from '@/mocks/weather-forecast.json';

import Home from './Home.vue';
import CitySelector from '@/components/CitySelector';
import HomeWeatherList from '@/components/HomeWeatherList';

let wrapper;
let store;
let router;

describe('Home', () => {
  beforeEach(() => {
    store = createVuexStore();
    router = createRouter({
      history: createWebHashHistory(process.env.BASE_URL),
      routes,
    });
    wrapper = mount(Home, {
      global: { plugins: [store, router] },
    });
  });

  afterEach(() => {
    localStorage.removeItem(WEATHER_CITY);
  });

  it('has city selector', () => {
    expect(wrapper.findComponent(CitySelector).exists()).toBeTruthy();
  });

  describe(`show empty text`, () => {
    it(`localStorage's WEATHER_CITY and store weatherForecast is empty`, () => {
      const $EMPTY_TEXT = wrapper.find('[data-test="empty-text"]');
      expect($EMPTY_TEXT.exists()).toBeTruthy();
      expect($EMPTY_TEXT.text()).toEqual('請選擇城市');
      expect(wrapper.findComponent(HomeWeatherList).exists()).toBeFalsy();
    });

    it(`localStorage has WEATHER_CITY and store weatherForecast is empty`, () => {
      localStorage.setItem(WEATHER_CITY, '新竹縣/新北市/高雄市');
      const $EMPTY_TEXT = wrapper.find('[data-test="empty-text"]');
      expect($EMPTY_TEXT.exists()).toBeTruthy();
      expect($EMPTY_TEXT.text()).toEqual('請選擇城市');
      expect(wrapper.findComponent(HomeWeatherList).exists()).toBeFalsy();
    });

    it(`localStorage WEATHER_CITY is empty and store weatherForecast has value`, () => {
      store = createVuexStore({ weatherForecast });
      wrapper = mount(Home, {
        global: { plugins: [store, router] },
      });
      const $EMPTY_TEXT = wrapper.find('[data-test="empty-text"]');
      expect($EMPTY_TEXT.exists()).toBeTruthy();
      expect($EMPTY_TEXT.text()).toEqual('請選擇城市');
      expect(wrapper.findComponent(HomeWeatherList).exists()).toBeFalsy();
    });
  });

  it(`show weather list`, () => {
    localStorage.setItem(WEATHER_CITY, '新竹縣/新北市/高雄市');
    store = createVuexStore({ weatherForecast });
    wrapper = mount(Home, {
      global: { plugins: [store, router] },
    });

    expect(wrapper.find('[data-test="empty-text"]').exists()).toBeFalsy();
    const $HOME_LIST = wrapper.findComponent(HomeWeatherList);
    expect($HOME_LIST.exists()).toBeTruthy();
  });

  it(`click edit button toggle active`, async () => {
    const $EDIT_BUTTON = wrapper.find('[data-test="edit-button"]');
    await $EDIT_BUTTON.trigger('click');
    expect($EDIT_BUTTON.classes()).toContain('active');
    await $EDIT_BUTTON.trigger('click');
    expect($EDIT_BUTTON.classes()).not.toContain('active');
  });
});
