<script setup>
import useWeatherPic from '@/utils/useWeatherPic.js';

const { setWeatherPic } = useWeatherPic();
</script>

<template>
  <div class="card mt-10">
    <div class="relative z-10">
      <div class="pt-4 px-4 text-left">
        <p class="pb-4 border-b border-gray-100">7天天氣預報</p>
      </div>
      <ul>
        <li
          v-for="index in 7"
          :key="`week${index}`"
          class="flex justify-between items-center p-4 font-bold text-3xl"
        >
          <p class="w-1/5 text-left">今天</p>
          <div class="w-1/5">
            <div class="w-1/2">
              <div class="h-10 mb-1">
                <img class="h-full" :src="setWeatherPic('01')" alt="" />
              </div>
              <p class="text-2xl text-gray-100">70%</p>
            </div>
          </div>
          <div class="flex items-center flex-1">
            <p class="opacity-60">18&#8451;</p>
            <div class="flex-1 mx-3 h-2 bg-gray-100 rounded-full"></div>
            <p>27&#8451;</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './WeatherWeekCard.scss';
</style>
