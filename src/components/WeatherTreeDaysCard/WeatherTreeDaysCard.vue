<script setup>
import { defineProps } from 'vue';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import useWeather from '@/utils/useWeather.js';

const { getWeatherData, getWeatherPic, getWeatherTime, getDayStatus } =
  useWeather();

defineProps({
  city: {
    type: String,
    required: true,
  },
  cityData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="card">
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
                :src="
                  getWeatherPic(
                    time.elementValue[1].value,
                    getDayStatus(time.startTime).status
                  )
                "
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
</template>

<style lang="scss" scoped>
@import './WeatherTreeDaysCard.scss';
</style>
