import { useStore } from 'vuex';

export default function useWeatherPic() {
  const { state } = useStore();

  const isDark =
    Date.now() >= state.sunrise.night || Date.now() < state.sunrise.day;
  const darkText = isDark ? 'night' : 'day';

  function setWeatherPic(index) {
    return `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${darkText}/${index}.svg`;
  }

  return { setWeatherPic, isDark };
}
