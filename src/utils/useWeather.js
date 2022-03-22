import { useStore } from 'vuex';

export default function useWeather() {
  const { state } = useStore();

  const isDay =
    state.sunrise.day <= Date.now() && Date.now() < state.sunrise.night;

  const timeText = isDay ? 'night' : 'day';

  function setWeatherPic(index) {
    return `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${timeText}/${index}.svg`;
  }

  function setWeekDay(time) {
    let status;
    const date = getWeatherTime(time);
    const day = date.day === new Date().getDate() ? '今日' : `${date.day}日`;
    const hours = date.hours;
    if (0 <= hours && hours < 6) {
      status = '凌晨';
    } else if (6 <= hours && hours < 18) {
      status = '白天';
    } else {
      status = '夜晚';
    }
    return { day, status };
  }

  function setTemperatureBar(max, min, timeIndex) {
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
    if (!valueIndex) {
      return cityData.weatherElement[dataName].time[0].elementValue[0].value;
    } else {
      return cityData.weatherElement[dataName].time[0].elementValue[valueIndex]
        .value;
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
    setWeatherPic,
    setWeekDay,
    setTemperatureBar,
    getWeatherData,
    getWeatherTime,
    isDay,
  };
}
