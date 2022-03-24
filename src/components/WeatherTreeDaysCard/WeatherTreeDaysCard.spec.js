import { mount } from '@vue/test-utils';
import { createVuexStore } from '@/store';
import WeatherTreeDaysCard from './WeatherTreeDaysCard.vue';
import useWeather from '@/utils/useWeather';
import weatherForecast from '@/mocks/weather-forecast.json';

const store = createVuexStore({ weatherForecast });
const {
  getWeatherValue,
  getWeatherElement,
  getWeatherPic,
  getWeatherTime,
  getDayStatus,
} = useWeather({
  weatherForecast,
});

let wrapper;

describe('WeatherTreeDaysCard', () => {
  let forecastListData;
  let forecastListLength;
  beforeEach(() => {
    wrapper = mount(WeatherTreeDaysCard, {
      props: {
        city: '新竹市',
      },
      global: {
        plugins: [store],
      },
    });
    forecastListData = getWeatherElement(wrapper.vm.city, 'Wx').time;
    forecastListLength = getWeatherElement(wrapper.vm.city, 'Wx').time.length;
  });

  it('card has current weather description', () => {
    const $DESCRIPTION = wrapper.find('[data-test="weather-description"]');
    expect($DESCRIPTION.text()).toEqual(
      getWeatherValue(wrapper.vm.city, 'WeatherDescription')
    );
  });

  it(`forecast list has ${forecastListLength}`, () => {
    const $FORECAST_LIST = wrapper.findAll('[data-test="forecast-list"]');
    expect($FORECAST_LIST).toHaveLength(forecastListLength);
  });

  it(`forecast list has current month`, () => {
    const $FORECAST_MONTH = wrapper.findAll('[data-test="forecast-month"]');
    expect($FORECAST_MONTH[0].text()).toContain(
      getWeatherTime(forecastListData[0].startTime).month
    );
  });

  it(`forecast list has current day`, () => {
    const $FORECAST_DAY = wrapper.findAll('[data-test="forecast-day"]');
    expect($FORECAST_DAY[0].text()).toContain(
      getWeatherTime(forecastListData[0].startTime).day
    );
  });

  it(`forecast list has current start hours`, () => {
    const $FORECAST_START = wrapper.findAll(
      '[data-test="forecast-start-hours"]'
    );
    expect($FORECAST_START[0].text()).toContain(
      getWeatherTime(forecastListData[0].startTime).hours
    );
  });

  it(`forecast list has current end hours`, () => {
    const $FORECAST_END = wrapper.findAll('[data-test="forecast-end-hours"]');
    expect($FORECAST_END[0].text()).toContain(
      getWeatherTime(forecastListData[0].endTime).hours
    );
  });

  it(`forecast list has current weather picture`, () => {
    const $FORECAST_PIC = wrapper.findAll('[data-test="forecast-pic"]');
    const picIndex = forecastListData[0].elementValue[1].value;
    const timeStatus = getDayStatus(forecastListData[0].startTime).status;
    expect($FORECAST_PIC[0].html()).toContain(
      getWeatherPic(picIndex, timeStatus)
    );
  });

  it(`forecast list has current weather temperature`, () => {
    const $FORECAST_T = wrapper.findAll('[data-test="forecast-t"]');
    const temperatureValue = getWeatherElement(wrapper.vm.city, 'T').time[0]
      .elementValue[0].value;
    expect($FORECAST_T[0].text()).toContain(temperatureValue);
  });
});
