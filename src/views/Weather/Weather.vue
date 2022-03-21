<script setup>
import { defineProps, computed } from 'vue';
import { useStore } from 'vuex';
import useWeatherPic from '@/utils/useWeatherPic.js';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import WeatherWeekCard from '@/components/WeatherWeekCard';

const props = defineProps({
  city: {
    type: String,
    required: true,
  },
});

const { state, dispatch } = useStore();
const { setWeatherPic } = useWeatherPic();

const cityData = computed(() => {
  return state.weatherForecast.find(
    (weatherData) => weatherData.locationName === props.city
  );
});

const cityWeekData = computed(() => {
  return state.weekWeatherForecast.find(
    (weatherData) => weatherData.locationName === props.city
  );
});

(async () => {
  if (!state.weekweatherForecast) {
    await dispatch('fetchWeekWeather');
  }
})();

function getWx(wx) {
  const wxResult = wx.time.find((time) => {
    return timeNumber(time.startTime) <= Date.now() < timeNumber(time.endTime);
  });
  return wxResult.elementValue;
}

function getT(t) {
  const tResult = t.time.find((time) => {
    return timeNumber(time.dataTime) > Date.now();
  });
  return tResult.elementValue[0].value;
}

function getPoP6h(pop6h) {
  const pop6hResult = pop6h.time.find((time) => {
    return timeNumber(time.startTime) <= Date.now() < timeNumber(time.endTime);
  });
  return pop6hResult.elementValue[0].value;
}

function getWeatherDescription(wd) {
  const wdResult = wd.time.find((time) => {
    return timeNumber(time.startTime) <= Date.now() < timeNumber(time.endTime);
  });
  return wdResult.elementValue[0].value;
}

function timeNumber(time) {
  return new Date(time).getTime();
}
</script>

<template>
  <div class="weather text-center">
    <div class="relative z-10">
      <div class="m-10 relative text-5xl font-bold">
        <div class="text-5xl">{{ city }}</div>
        <div class="text-7xl mt-2">
          {{ getT(cityData.weatherElement['T']) }}&#8451;
        </div>
        <div class="mt-4 text-4xl">
          <span>{{ getWx(cityData.weatherElement.Wx)[0].value }}</span>
          <span class="ml-4 text-yellow-400"
            >{{ getPoP6h(cityData.weatherElement.PoP6h) }}%</span
          >
        </div>
        <img
          class="absolute w-1/4 -top-5 right-5 z-0"
          :src="setWeatherPic(getWx(cityData.weatherElement.Wx)[1].value)"
          alt=""
        />
      </div>

      <div v-if="cityData" class="card">
        <div class="relative z-10">
          <div class="pt-4 px-4 text-left">
            <p
              class="pb-4 border-b border-gray-100 text-gray-200 dark:text-gray-400"
            >
              {{
                getWeatherDescription(
                  cityData.weatherElement.WeatherDescription
                )
              }}
            </p>
          </div>
          <PerfectScrollbar class="pb-4">
            <ul class="whitespace-nowrap">
              <li
                v-for="(time, timeIndex) in cityData.weatherElement.Wx.time"
                :key="`today${timeIndex}`"
                class="w-auto inline-block p-4"
              >
                <p class="text-2xl">
                  <span>{{ new Date(time.startTime).getMonth() + 1 }}月</span
                  ><span>{{ new Date(time.startTime).getDate() }}日</span>
                </p>
                <p class="text-2xl">
                  <span>{{ new Date(time.startTime).getHours() }}:00</span> -
                  <span>{{ new Date(time.endTime).getHours() }}:00</span>
                </p>
                <div class="h-10 mt-2">
                  <img
                    class="block h-full w-auto m-auto"
                    :src="setWeatherPic(time.elementValue[1].value)"
                  />
                </div>
                <p class="mt-2">
                  {{
                    cityData.weatherElement['T'].time[timeIndex].elementValue[0]
                      .value
                  }}&#8451;
                </p>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </div>

      <WeatherWeekCard v-if="cityWeekData" :cityWeekData="cityWeekData" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './Weather.scss';
</style>
