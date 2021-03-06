<script setup>
import { defineProps, onMounted } from 'vue';
import { useStore } from 'vuex';
import useWeather from '@/utils/useWeather.js';
import useAnimate from '@/utils/useAnimate.js';

const props = defineProps({
  city: { type: String, required: true },
});

const { state } = useStore();
const { setWeekListAnimate } = useAnimate();
const {
  getWeekWeatherValue,
  getWeekWeatherElement,
  getWeatherPic,
  getDayStatus,
  getTemperatureBar,
} = useWeather({
  weekWeatherForecast: state.weekWeatherForecast,
});

onMounted(() => {
  setWeekListAnimate();
});

function getBarStyle(timeIndex) {
  const maxElement = getWeekWeatherValue(props.city, 'MaxT');
  const minElement = getWeekWeatherValue(props.city, 'MinT');
  const bar = getTemperatureBar(maxElement, minElement, timeIndex);
  return { width: `${bar.width}%`, left: `${bar.left}%` };
}

function getWeekWeatherData(dataName, timeIndex, valueIndex) {
  const valIndex = valueIndex || null;
  return getWeekWeatherValue(props.city, dataName, timeIndex, valIndex);
}
</script>

<template>
  <div class="card mt-10">
    <div class="relative z-10">
      <div class="pt-4 px-4 text-left">
        <p class="pb-4 border-b border-gray-100">7天天氣預報</p>
      </div>
      <ul>
        <li
          v-for="(time, timeIndex) in getWeekWeatherElement(city, 'T').time"
          :key="`week${timeIndex}`"
          data-test="week-list"
          class="week-list"
        >
          <p class="w-28 text-left text-2xl">
            <span data-test="week-day">{{
              getDayStatus(time.startTime).day
            }}</span>
            <span data-test="week-status" class="ml-2">{{
              getDayStatus(time.startTime).status
            }}</span>
          </p>
          <div class="w-1/3 px-2">
            <div class="w-full mx-auto">
              <div class="h-10 mb-1">
                <img
                  data-test="week-pic"
                  class="h-full"
                  :src="
                    getWeatherPic(
                      getWeekWeatherData('Wx', timeIndex, 1),
                      getDayStatus(time.startTime).status
                    )
                  "
                />
              </div>
              <p data-test="week-weather" class="text-2xl text-gray-100">
                <span
                  data-test="week-pop"
                  v-if="getWeekWeatherData('PoP12h', timeIndex).trim()"
                >
                  {{ getWeekWeatherData('PoP12h', timeIndex) }}%
                </span>
                <span data-test="week-wx" v-else>
                  {{ getWeekWeatherData('Wx', timeIndex) }}
                </span>
              </p>
            </div>
          </div>
          <div class="flex items-center flex-1 text-2xl">
            <p data-test="week-minT" class="text-blue-500 opacity-90">
              {{ getWeekWeatherData('MinT', timeIndex) }}&#8451;
            </p>
            <div data-test="week-bar" class="bar-wrap">
              <span class="bar" :style="getBarStyle(timeIndex)"></span>
            </div>
            <p data-test="week-maxT" class="text-red-500 opacity-80">
              {{ getWeekWeatherData('MaxT', timeIndex) }}&#8451;
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './WeatherWeekCard.scss';
</style>
