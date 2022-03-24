import { flushPromises, mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { createVuexStore } from '@/store';
import WeatherNowCard from './WeatherNowCard.vue';
import useWeather from '@/utils/useWeather';
import weatherForecast from '@/mocks/weather-forecast.json';

const store = createVuexStore({ weatherForecast });
const { getWeatherPic, getWeatherValue } = useWeather({
  weatherForecast,
});

let wrapper;

describe('WeatherNowCard', () => {
  beforeEach(() => {
    wrapper = mount(WeatherNowCard, {
      props: {
        city: '新竹市',
      },
      global: {
        plugins: [store],
      },
    });
  });

  it('card has current city name', () => {
    const $CITY_NAME = wrapper.find('[data-test="city-name"]');
    expect($CITY_NAME.text()).toEqual(wrapper.vm.city);
  });

  it(`card has current temperature`, async () => {
    await flushPromises();
    const $WEATHER_T = wrapper.find('[data-test="weather-t"]');
    expect($WEATHER_T.text()).toContain(getWeatherValue(wrapper.vm.city, 'T'));
  });

  it(`card has current wx`, () => {
    const $WEATHER_WX = wrapper.find('[data-test="weather-wx"]');
    expect($WEATHER_WX.text()).toContain(
      getWeatherValue(wrapper.vm.city, 'Wx')
    );
  });

  it(`card has current pop`, () => {
    const $WEATHER_POP = wrapper.find('[data-test="weather-pop"]');
    expect($WEATHER_POP.text()).toContain(
      getWeatherValue(wrapper.vm.city, 'PoP6h')
    );
  });

  it(`card has current weather picture`, () => {
    const $WEATHER_PIC = wrapper.find('[data-test="weather-pic"]');
    const wxValue = getWeatherValue(wrapper.vm.city, 'Wx', 1);
    expect($WEATHER_PIC.html()).toContain(getWeatherPic(wxValue));
  });
});
