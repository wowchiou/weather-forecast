import { createStore } from 'vuex';
import Http from '@/services';

const createVuexStore = (initialState) => {
  const state = Object.assign(
    {
      sunrise: {
        day: 0,
        night: 0,
      },
      weatherForecast: [],
      weekWeatherForecast: [],
    },
    initialState
  );

  const getters = {};

  const mutations = {
    SET_SUNRISE(state, sunData) {
      state.sunrise = sunData;
    },
    SET_WEATHER_FORECAST(state, weatherData) {
      state.weatherForecast = weatherData;
    },
    SET_WEEK_WEATHER_FORECAST(state, weatherData) {
      state.weekWeatherForecast = weatherData;
    },
  };

  const actions = {
    fetchWeatherForecast({ commit }) {
      return Http.getWeatherForecast().then((res) => {
        const newWeatherData = formateWeatherData(
          res.data.records.locations[0].location
        );
        commit('SET_WEATHER_FORECAST', newWeatherData);
      });
    },

    fetchWeekWeather({ commit }) {
      return Http.getWeekWeather().then((res) => {
        const newWeatherData = formateWeatherData(
          res.data.records.locations[0].location
        );
        commit('SET_WEEK_WEATHER_FORECAST', newWeatherData);
      });
    },

    fetchSunrise({ commit }) {
      const date = new Date();
      const year = date.getFullYear();
      const month =
        date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      const now = `${year}-${month}-${day}`;
      return Http.getSunrise(now).then((res) => {
        let sunData = {};
        res.data.records.locations.location[0].time[0].parameter.forEach(
          (param) => {
            const time = new Date(`${now} ${param.parameterValue}`).getTime();
            if (param.parameterName === '日出時刻') return (sunData.day = time);
            if (param.parameterName === '日沒時刻')
              return (sunData.night = time);
          }
        );
        commit('SET_SUNRISE', sunData);
      });
    },
  };

  const store = {
    modules: {},
    state,
    getters,
    mutations,
    actions,
  };

  return createStore(store);
};

function formateWeatherData(data) {
  return data.map((itm) => {
    let newWeatherElement = {};
    itm.weatherElement.forEach((el) => {
      newWeatherElement[el.elementName] = el;
    });
    return { ...itm, weatherElement: newWeatherElement };
  });
}

export default createVuexStore();
export { createVuexStore };
