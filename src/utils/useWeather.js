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
    const timeDate = new Date(time).getDate();
    const day = timeDate === new Date().getDate() ? '今日' : `${timeDate}日`;
    const hours = new Date(time).getHours();
    if (0 <= hours && hours < 6) {
      status = '凌晨';
    } else if (6 <= hours && hours < 18) {
      status = '早上';
    } else {
      status = '晚上';
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

  return { setWeatherPic, setWeekDay, setTemperatureBar, isDay };
}
