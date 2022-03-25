import { mount } from '@vue/test-utils';
import { createVuexStore } from '@/store';
import WeatherWeekCard from './WeatherWeekCard.vue';
import weekWeatherForecast from '@/mocks/week-weather-forecast.json';
import useWeather from '@/utils/useWeather.js';

const store = createVuexStore({ weekWeatherForecast });
const { getWeekWeatherValue, getWeekWeatherElement, getTemperatureBar } =
  useWeather({
    weekWeatherForecast,
  });
const city = '新竹縣';

function getBarStyle(timeIndex) {
  const maxElement = getWeekWeatherValue(city, 'MaxT');
  const minElement = getWeekWeatherValue(city, 'MinT');
  const bar = getTemperatureBar(maxElement, minElement, timeIndex);
  return { width: `${bar.width}%`, left: `${bar.left}%` };
}

function getWeekWeatherData(dataName, timeIndex, valueIndex) {
  const valIndex = valueIndex || null;
  return getWeekWeatherValue(city, dataName, timeIndex, valIndex);
}
let wrapper;

describe('WeatherWeekCard', () => {
  const weekListTemperature = getWeekWeatherElement(city, 'T').time;
  const weekListLength = weekListTemperature.length;

  beforeEach(() => {
    wrapper = mount(WeatherWeekCard, {
      props: { city },
      global: {
        plugins: [store],
      },
    });
  });

  it('function getBarStyle get current result', () => {
    const minT = 19;
    const maxT = 21;
    const weekMinT = 15;
    const weekMaxT = 28;
    const width = ((maxT - minT) / (weekMaxT - weekMinT)) * 100 + '%';
    const left = ((minT - weekMinT) / (weekMaxT - weekMinT)) * 100 + '%';
    expect(getBarStyle(0)).toEqual({ width, left });
  });

  it(`function getWeekWeatherData get current result`, () => {
    expect(getWeekWeatherData('Wx', 0)).toEqual('陰時多雲短暫雨');
    expect(getWeekWeatherData('Wx', 0, 1)).toEqual('10');
  });

  it(`week list has ${weekListLength}`, () => {
    expect(wrapper.findAll('[data-test="week-list"]')).toHaveLength(
      weekListLength
    );
  });

  it(`render current day status`, () => {
    expect(wrapper.findAll('[data-test="week-day"]')[0].text()).toContain('24');
    expect(wrapper.findAll('[data-test="week-status"]')[0].text()).toContain(
      '夜晚'
    );
  });

  it(`render current weather picture`, () => {
    const $WEEK_PIC = wrapper.findAll('[data-test="week-pic"]')[0];
    expect($WEEK_PIC.html()).toContain('10');
    expect($WEEK_PIC.html()).toContain('night');
  });

  it(`render current weather pop or wx`, () => {
    const $WEEK_WEATHER_0 = wrapper.findAll('[data-test="week-weather"]')[0];
    expect($WEEK_WEATHER_0.find('[data-test="week-pop"]').text()).toContain(
      '60'
    );
    expect($WEEK_WEATHER_0.find('[data-test="week-wx"]').exists()).toBe(false);

    const $WEEK_WEATHER_7 = wrapper.findAll('[data-test="week-weather"]')[7];
    expect($WEEK_WEATHER_7.find('[data-test="week-pop"]').exists()).toBe(false);
    expect($WEEK_WEATHER_7.find('[data-test="week-wx"]').text()).toContain(
      '陰陣雨'
    );
  });

  it(`render current min temperature`, () => {
    expect(wrapper.findAll('[data-test="week-minT"]')[0].text()).toContain(
      '19'
    );
  });

  it(`render current max temperature`, () => {
    expect(wrapper.findAll('[data-test="week-maxT"]')[0].text()).toContain(
      '21'
    );
  });

  it(`render current temperature bar`, () => {
    const minT = 19;
    const maxT = 21;
    const weekMinT = 15;
    const weekMaxT = 28;
    const width = ((maxT - minT) / (weekMaxT - weekMinT)) * 100 + '%';
    const left = ((minT - weekMinT) / (weekMaxT - weekMinT)) * 100 + '%';
    const elementStyle = wrapper
      .findAll('[data-test="week-bar"]')[0]
      .find('span').element.style;
    expect(elementStyle.width).toEqual(width);
    expect(elementStyle.left).toEqual(left);
  });
});
