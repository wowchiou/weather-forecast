import { createStore } from 'vuex';
import Http from '@/services';

const createVuexStore = (initialState) => {
  const state = Object.assign(
    {
      sunrise: {
        day: 0,
        night: 0,
      },
    },
    initialState
  );

  const getters = {
    darkMode(state) {
      const date = Date.now();
      return date >= state.sunrise.night || date < state.sunrise.day;
    },
  };

  const mutations = {
    SET_SUNRISE(state, sunData) {
      state.sunrise = sunData;
    },
  };

  const actions = {
    fetchWeatherForecast() {
      return Http.getWeatherForecast().then((res) => {
        console.log(res.data);
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

export default createVuexStore();
export { createVuexStore };
