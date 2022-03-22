<script setup>
import { defineProps } from 'vue';
import useWeather from '@/utils/useWeather.js';

defineProps({
  city: {
    type: String,
    required: true,
  },
});

const { getWeatherPic, getWeatherData } = useWeather();
</script>

<template>
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
      :src="getWeatherPic(getWeatherData(city, 'Wx', 1))"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './WeatherNowCard.scss';
</style>
