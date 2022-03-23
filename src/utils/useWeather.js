import { useStore } from 'vuex';

export default function useWeather() {
  const { state } = useStore();

  const TIME_TEXT = {
    earlyMorning: '凌晨',
    morning: '白天',
    night: '夜晚',
  };

  const picURL =
    'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/';

  function getWeatherPic(picIndex, status) {
    const { earlyMorning, morning, night } = TIME_TEXT;
    const { day: sunDay, night: sunNight } = state.sunrise;
    const isDay = sunDay <= Date.now() && Date.now() < sunNight;
    let timeText = isDay ? 'day' : 'night';
    if ((status && status === earlyMorning) || status === night) {
      timeText = 'night';
    } else if (status && status === morning) {
      timeText = 'day';
    }
    return `${picURL}${timeText}/${picIndex}.svg`;
  }

  function getDayStatus(time) {
    let status;
    const { earlyMorning, morning, night } = TIME_TEXT;
    const date = getWeatherTime(time);
    const day = date.day === new Date().getDate() ? '今日' : `${date.day}日`;
    const hours = date.hours;
    if (0 <= hours && hours < 6) {
      status = earlyMorning;
    } else if (6 <= hours && hours < 18) {
      status = morning;
    } else {
      status = night;
    }
    return { day, status };
  }

  function getTemperatureBar(max, min, timeIndex) {
    const maxT = Math.max(
      ...max.time.map((t) => Number(t.elementValue[0].value))
    );
    const minT = Math.min(
      ...min.time.map((t) => Number(t.elementValue[0].value))
    );
    const currentMaxT = Number(max.time[timeIndex].elementValue[0].value);
    const currentMinT = Number(min.time[timeIndex].elementValue[0].value);
    const left = ((currentMinT - minT) / (maxT - minT)) * 100;
    const width = ((currentMaxT - currentMinT) / (maxT - minT)) * 100;
    return { left, width: width ? width : 10 };
  }

  function getWeatherData(city, dataName, valueIndex) {
    const cityData = state.weatherForecast.find(
      (itm) => itm.locationName === city
    );
    const weatherElData = cityData.weatherElement[dataName].time[0];
    if (!valueIndex) {
      return weatherElData.elementValue[0].value;
    } else {
      return weatherElData.elementValue[valueIndex].value;
    }
  }

  function getWeatherTime(time) {
    const date = new Date(time);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours(),
    };
  }

  return {
    getWeatherPic,
    getDayStatus,
    getTemperatureBar,
    getWeatherData,
    getWeatherTime,
  };
}
