<script setup>
import { defineProps, onMounted } from 'vue';
import useWeather from '@/utils/useWeather.js';
import useAnimate from '@/utils/useAnimate.js';

const props = defineProps({
  cityWeekData: {
    type: Object,
    required: true,
  },
});

const { getWeatherPic, getDayStatus, getTemperatureBar } = useWeather();
const { setWeekListAnimate } = useAnimate();

onMounted(() => {
  setWeekListAnimate();
});

function getElement(el, timeIndex, valueIndex) {
  const weatherEl = props.cityWeekData.weatherElement[el];
  if (typeof timeIndex === 'undefined') {
    return weatherEl;
  }
  if (!valueIndex) {
    return weatherEl.time[timeIndex].elementValue[0].value;
  }
  return weatherEl.time[timeIndex].elementValue[valueIndex].value;
}

function getBarStyle(timeIndex) {
  const maxElement = getElement('MaxT');
  const minElement = getElement('MinT');
  const bar = getTemperatureBar(maxElement, minElement, timeIndex);
  return { width: `${bar.width}%`, left: `${bar.left}%` };
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
          v-for="(time, timeIndex) in cityWeekData.weatherElement['T'].time"
          :key="`week${timeIndex}`"
          class="week-list"
        >
          <p class="w-['30%'] text-left text-2xl">
            <span>{{ getDayStatus(time.startTime).day }}</span>
            <span class="ml-2">{{ getDayStatus(time.startTime).status }}</span>
          </p>
          <div class="w-1/3 px-2">
            <div class="w-full mx-auto">
              <div class="h-10 mb-1">
                <img
                  class="h-full"
                  :src="
                    getWeatherPic(
                      getElement('Wx', timeIndex, 1),
                      getDayStatus(time.startTime).status
                    )
                  "
                />
              </div>
              <p class="text-2xl text-gray-100">
                <span v-if="getElement('PoP12h', timeIndex).trim()">
                  {{ getElement('PoP12h', timeIndex) }}%
                </span>
                <span v-else>
                  {{ getElement('Wx', timeIndex) }}
                </span>
              </p>
            </div>
          </div>
          <div class="flex items-center flex-1 text-2xl">
            <p class="text-blue-500 opacity-90">
              {{ getElement('MinT', timeIndex) }}&#8451;
            </p>
            <div class="bar-wrap">
              <span class="bar" :style="getBarStyle(timeIndex)"></span>
            </div>
            <p class="text-red-500 opacity-80">
              {{ getElement('MaxT', timeIndex) }}&#8451;
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
