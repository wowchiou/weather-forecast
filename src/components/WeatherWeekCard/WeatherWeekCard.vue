<script setup>
import { defineProps } from 'vue';
import useWeather from '@/utils/useWeather.js';

const props = defineProps({
  cityWeekData: {
    type: Object,
    required: true,
  },
});

const { setWeatherPic, setWeekDay, setTemperatureBar } = useWeather();

function getElement(el, timeIndex) {
  if (typeof timeIndex === 'undefined') {
    return props.cityWeekData.weatherElement[el];
  } else {
    return props.cityWeekData.weatherElement[el].time[timeIndex];
  }
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
          class="flex justify-between items-center p-4 font-bold text-3xl"
        >
          <p class="w-['30%'] text-left text-2xl">
            <span>{{ setWeekDay(time.startTime).day }}</span>
            <span class="ml-2">{{ setWeekDay(time.startTime).status }}</span>
          </p>
          <div class="w-1/3 px-2">
            <div class="w-full mx-auto">
              <div class="h-10 mb-1">
                <img
                  class="h-full"
                  :src="
                    setWeatherPic(
                      getElement('Wx', timeIndex).elementValue[1].value
                    )
                  "
                />
              </div>
              <p class="text-2xl text-gray-100">
                <span
                  v-if="
                    getElement('PoP12h', timeIndex).elementValue[0].value.trim()
                  "
                >
                  {{ getElement('PoP12h', timeIndex).elementValue[0].value }}%
                </span>
                <span v-else>
                  {{ getElement('Wx', timeIndex).elementValue[0].value }}
                </span>
              </p>
            </div>
          </div>
          <div class="flex items-center flex-1 text-2xl">
            <p class="text-blue-500 opacity-90">
              {{ getElement('MinT', timeIndex).elementValue[0].value }}&#8451;
            </p>
            <div
              class="relative flex-1 mx-3 h-2 bg-gray-100 rounded-full overflow-hidden"
            >
              <span
                class="absolute h-full top-0 left-3 bg-yellow-400 rounded-full"
                :style="{
                  width: `${
                    setTemperatureBar(
                      getElement('MaxT'),
                      getElement('MinT'),
                      timeIndex
                    ).width
                  }%`,
                  left: `${
                    setTemperatureBar(
                      getElement('MaxT'),
                      getElement('MinT'),
                      timeIndex
                    ).left
                  }%`,
                }"
              ></span>
            </div>
            <p class="text-red-500 opacity-80">
              {{ getElement('MaxT', timeIndex).elementValue[0].value }}&#8451;
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
