import { useStore } from 'vuex';

export default function useWeatherPic() {
  const { state } = useStore();

  const isDark =
    Date.now() >= state.sunrise.night || Date.now() < state.sunrise.day;
  const darkText = isDark ? 'night' : 'day';

  function setWeatherPic(index) {
    return `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${darkText}/${index}.svg`;
  }

  function setWeekDay(time) {
    let status;
    const timeDate = new Date(time).getDate();
    const day = timeDate === new Date().getDate() ? '今日' : `${timeDate}日`;
    switch (new Date(time).getHours()) {
      case 0:
        status = '凌晨';
        break;
      case 6:
        status = '早上';
        break;
      default:
        status = '晚上';
        break;
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

  return { setWeatherPic, setWeekDay, setTemperatureBar, isDark };
}
