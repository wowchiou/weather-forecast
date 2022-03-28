import useWeather from './useWeather';
import weatherForecast from '@/mocks/weather-forecast.json';
import weekWeatherForecast from '@/mocks/week-weather-forecast.json';

const {
  getWeatherPic,
  getWeatherTime,
  getDayStatus,
  getWeatherValue,
  getWeatherElement,
  getWeekWeatherValue,
  getWeekWeatherElement,
  getTemperatureBar,
} = useWeather({
  weatherForecast,
  weekWeatherForecast,
});

const time = 1648440552584;

describe('useWeather', () => {
  it(`getWeatherPic`, () => {
    expect(getWeatherPic('02', '凌晨')).toEqual(
      `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/02.svg`
    );
    expect(getWeatherPic('02', '白天')).toEqual(
      `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/02.svg`
    );
    expect(getWeatherPic('02', '夜晚')).toEqual(
      `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/02.svg`
    );
  });

  it(`getWeatherTime`, () => {
    expect(getWeatherTime(time)).toEqual({
      year: 2022,
      month: 3,
      day: 28,
      hours: 12,
    });
  });

  it(`getDayStatus`, () => {
    const day = getWeatherTime(time).day;
    const dayText = day === new Date().getDate() ? '今日' : `${day}日`;
    expect(getDayStatus(time)).toEqual({
      day: dayText,
      status: '白天',
    });
  });

  it(`getWeatherValue`, () => {
    expect(getWeatherValue('新竹縣', 'Wx')).toBe('短暫雨');
    expect(getWeatherValue('新竹縣', 'Wx', 1)).toBe('08');
  });

  it(`getWeatherElement`, () => {
    expect(getWeatherElement('新竹縣', 'Wx')).toEqual(
      weatherForecast[0].weatherElement.Wx
    );
  });

  it(`getWeekWeatherValue`, () => {
    expect(getWeekWeatherValue('新竹縣', 'Wx', 0)).toBe('陰時多雲短暫雨');
    expect(getWeekWeatherValue('新竹縣', 'Wx', 0, 1)).toBe('10');
  });

  it(`getWeekWeatherElement`, () => {
    expect(getWeekWeatherElement('新竹縣', 'Wx')).toEqual(
      weekWeatherForecast[0].weatherElement.Wx
    );
  });

  it(`getTemperatureBar`, () => {
    const max = getWeekWeatherElement('新竹縣', 'MaxT');
    const min = getWeekWeatherElement('新竹縣', 'MinT');
    //新竹縣 周最低溫15 周最高溫28 第1項最低溫19 第1項最高溫21
    expect(getTemperatureBar(max, min, 0)).toEqual({
      left: ((19 - 15) / (28 - 15)) * 100,
      width: ((21 - 19) / (28 - 15)) * 100,
    });
  });
});
