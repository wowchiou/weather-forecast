import { createStore } from 'vuex';
import Http from '@/services';

const createVuexStore = (initialState) => {
  const state = Object.assign(
    {
      loader: true,
      weatherForecast: [],
      weekWeatherForecast: [],
    },
    initialState
  );

  const getters = {
    getCityWeather: (state) => (city) => {
      return state.weatherForecast.find((itm) => itm.locationName === city);
    },
    getCityWeekWeather: (state) => (city) => {
      return state.weekWeatherForecast.find(
        (weatherData) => weatherData.locationName === city
      );
    },
  };

  const mutations = {
    SET_LOADER(state, loading) {
      state.loader = loading;
    },
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
    showLoader({ commit }, loading) {
      commit('SET_LOADER', loading);
    },

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
