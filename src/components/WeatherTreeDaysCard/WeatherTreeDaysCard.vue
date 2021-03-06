<script setup>
import { defineProps } from 'vue';
import { useStore } from 'vuex';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import useWeather from '@/utils/useWeather.js';

defineProps({
  city: {
    type: String,
    required: true,
  },
});

const { state } = useStore();
const {
  getWeatherValue,
  getWeatherElement,
  getWeatherPic,
  getWeatherTime,
  getDayStatus,
} = useWeather({
  weatherForecast: state.weatherForecast,
});
</script>

<template>
  <div class="card">
    <div class="relative z-10">
      <div class="pt-4 px-4 text-left">
        <p
          data-test="weather-description"
          class="pb-4 border-b border-gray-100 text-gray-200 dark:text-gray-400"
        >
          {{ getWeatherValue(city, 'WeatherDescription') }}
        </p>
      </div>
      <PerfectScrollbar class="pb-4">
        <ul class="whitespace-nowrap">
          <li
            v-for="(time, timeIndex) in getWeatherElement(city, 'Wx').time"
            :key="`today${timeIndex}`"
            data-test="forecast-list"
            class="w-auto inline-block p-4"
          >
            <p class="text-2xl">
              <span data-test="forecast-month"
                >{{ getWeatherTime(time.startTime).month }}月</span
              ><span data-test="forecast-day"
                >{{ getWeatherTime(time.startTime).day }}日</span
              >
            </p>
            <p class="text-2xl">
              <span data-test="forecast-start-hours"
                >{{ getWeatherTime(time.startTime).hours }}:00</span
              >
              -
              <span data-test="forecast-end-hours"
                >{{ getWeatherTime(time.endTime).hours }}:00</span
              >
            </p>
            <div class="h-10 mt-2">
              <img
                data-test="forecast-pic"
                class="block h-full w-auto m-auto"
                :src="
                  getWeatherPic(
                    time.elementValue[1].value,
                    getDayStatus(time.startTime).status
                  )
                "
              />
            </div>
            <p data-test="forecast-t" class="mt-2">
              {{
                getWeatherElement(city, 'T').time[timeIndex].elementValue[0]
                  .value
              }}&#8451;
            </p>
          </li>
        </ul>
      </PerfectScrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './WeatherTreeDaysCard.scss';
</style>
