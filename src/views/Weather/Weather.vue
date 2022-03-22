<script setup>
import { defineProps, computed } from 'vue';
import { useStore } from 'vuex';
import useWeather from '@/utils/useWeather.js';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import WeatherWeekCard from '@/components/WeatherWeekCard';

const props = defineProps({
  city: {
    type: String,
    required: true,
  },
});

const { state, dispatch } = useStore();
const { setWeatherPic, getWeatherData, getWeatherTime } = useWeather();

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
  if (state.weekWeatherForecast.length === 0) {
    await dispatch('fetchWeekWeather');
  }
})();
</script>

<template>
  <div class="weather text-center">
    <div class="relative z-10">
      <div class="m-10 relative text-5xl font-bold">
        <div class="text-5xl">{{ city }}</div>
        <div class="text-7xl mt-2">{{ getWeatherData(city, 'T') }}&#8451;</div>
        <div class="mt-4 text-4xl">
          <span>{{ getWeatherData(city, 'Wx') }}</span>
          <span class="ml-4 text-yellow-400"
            >{{ getWeatherData(city, 'PoP6h') }}%</span
          >
        </div>
        <img
          class="absolute w-1/4 -top-5 right-5 z-0"
          :src="setWeatherPic(getWeatherData(city, 'Wx', 1))"
        />
      </div>

      <div v-if="cityData" class="card">
        <div class="relative z-10">
          <div class="pt-4 px-4 text-left">
            <p
              class="pb-4 border-b border-gray-100 text-gray-200 dark:text-gray-400"
            >
              {{ getWeatherData(city, 'WeatherDescription') }}
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
                  <span>{{ getWeatherTime(time.startTime).month }}月</span
                  ><span>{{ getWeatherTime(time.startTime).day }}日</span>
                </p>
                <p class="text-2xl">
                  <span>{{ getWeatherTime(time.startTime).hours }}:00</span> -
                  <span>{{ getWeatherTime(time.endTime).hours }}:00</span>
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
