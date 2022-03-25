import { mount } from '@vue/test-utils';
import { createVuexStore } from '@/store';
import WeatherNowCard from './WeatherNowCard.vue';
import useWeather from '@/utils/useWeather';
import weatherForecast from '@/mocks/weather-forecast.json';

const store = createVuexStore({ weatherForecast });
const { getWeatherPic, getWeatherValue } = useWeather({
  weatherForecast,
});

let wrapper;
const city = '新竹縣';

describe('WeatherNowCard', () => {
  beforeEach(() => {
    wrapper = mount(WeatherNowCard, {
      props: { city },
      global: {
        plugins: [store],
      },
    });
  });

  it('card has current city name', () => {
    const $CITY_NAME = wrapper.find('[data-test="city-name"]');
    expect($CITY_NAME.text()).toEqual(city);
  });

  // it(`card has current temperature`, () => {
  //   const $WEATHER_T = wrapper.find('[data-test="weather-t"]');
  //   expect($WEATHER_T.text()).toContain('21');
  // });

  it(`card has current wx`, () => {
    const $WEATHER_WX = wrapper.find('[data-test="weather-wx"]');
    expect($WEATHER_WX.text()).toEqual('短暫雨');
  });

  it(`card has current pop`, () => {
    const $WEATHER_POP = wrapper.find('[data-test="weather-pop"]');
    expect($WEATHER_POP.text()).toContain('30');
  });

  it(`card has current weather picture`, () => {
    const $WEATHER_PIC = wrapper.find('[data-test="weather-pic"]');
    expect($WEATHER_PIC.html()).toContain('08');
    let status = 'day';
    if (new Date().getHours() >= 18 || new Date().getHours() < 6) {
      status = 'night';
    }
    expect($WEATHER_PIC.html()).toContain(status);
  });
});
