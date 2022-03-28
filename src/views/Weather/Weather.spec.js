import { mount } from '@vue/test-utils';
import { createVuexStore } from '@/store';
import weatherForecast from '@/mocks/weather-forecast.json';
import weekWeatherForecast from '@/mocks/week-weather-forecast.json';
import Weather from './Weather.vue';
import WeatherNowCard from '@/components/WeatherNowCard';
import WeatherTreeDaysCard from '@/components/WeatherTreeDaysCard';
import WeatherWeekCard from '@/components/WeatherWeekCard';

let wrapper;
let store = createVuexStore({ weatherForecast, weekWeatherForecast });

describe('Weather', () => {
  beforeEach(() => {
    wrapper = mount(Weather, {
      global: { plugins: [store] },
    });
  });

  it(`do not show card-wrapper when city props was empty`, () => {
    expect(wrapper.find('[data-test="card-wrapper"]').exists()).toBeFalsy();
  });

  it(`show card-wrapper when city props exists`, () => {
    wrapper = mount(Weather, {
      props: { city: '新竹縣' },
      global: { plugins: [store] },
    });
    expect(wrapper.find('[data-test="card-wrapper"]').exists()).toBeTruthy();
    expect(wrapper.findComponent(WeatherNowCard).exists()).toBeTruthy();
    expect(wrapper.findComponent(WeatherTreeDaysCard).exists()).toBeTruthy();
    expect(wrapper.findComponent(WeatherWeekCard).exists()).toBeTruthy();
  });
});
