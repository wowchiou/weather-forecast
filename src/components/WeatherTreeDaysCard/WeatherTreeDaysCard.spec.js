import { mount } from '@vue/test-utils';
import { createVuexStore } from '@/store';
import WeatherTreeDaysCard from './WeatherTreeDaysCard.vue';
import weatherForecast from '@/mocks/weather-forecast.json';

const store = createVuexStore({ weatherForecast });
let forecastListLength = weatherForecast[0].weatherElement['Wx'].time.length;
let wrapper;

describe('WeatherTreeDaysCard', () => {
  beforeEach(() => {
    wrapper = mount(WeatherTreeDaysCard, {
      props: {
        city: '新竹縣',
      },
      global: {
        plugins: [store],
      },
    });
  });

  it('card has current weather description', () => {
    const $DESCRIPTION = wrapper.find('[data-test="weather-description"]');
    expect($DESCRIPTION.text()).toEqual(
      '短暫雨。降雨機率 30%。溫度攝氏21度。舒適。東北風 平均風速<= 1級(每秒0公尺)。相對濕度85%。'
    );
  });

  it(`forecast list has ${forecastListLength}`, () => {
    const $FORECAST_LIST = wrapper.findAll('[data-test="forecast-list"]');
    expect($FORECAST_LIST).toHaveLength(forecastListLength);
  });

  it(`forecast list has current month`, () => {
    const $FORECAST_MONTH = wrapper.findAll('[data-test="forecast-month"]');
    expect($FORECAST_MONTH[0].text()).toEqual('3月');
  });

  it(`forecast list has current day`, () => {
    const $FORECAST_DAY = wrapper.findAll('[data-test="forecast-day"]');
    expect($FORECAST_DAY[0].text()).toEqual('24日');
  });

  it(`forecast list has current start hours`, () => {
    const $FORECAST_START = wrapper.findAll(
      '[data-test="forecast-start-hours"]'
    );
    expect($FORECAST_START[0].text()).toEqual('18:00');
  });

  it(`forecast list has current end hours`, () => {
    const $FORECAST_END = wrapper.findAll('[data-test="forecast-end-hours"]');
    expect($FORECAST_END[0].text()).toEqual('21:00');
  });

  it(`forecast list has current weather picture`, () => {
    const $FORECAST_PIC = wrapper.findAll('[data-test="forecast-pic"]');
    expect($FORECAST_PIC[0].html()).toContain('08');
    expect($FORECAST_PIC[0].html()).toContain('night');
    expect($FORECAST_PIC[4].html()).toContain('08');
    expect($FORECAST_PIC[4].html()).toContain('day');
  });

  it(`forecast list has current weather temperature`, () => {
    const $FORECAST_T = wrapper.findAll('[data-test="forecast-t"]');
    expect($FORECAST_T[0].text()).toContain('21');
  });
});
