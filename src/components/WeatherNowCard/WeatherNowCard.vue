<script setup>
import { reactive, defineProps, watch, onMounted } from 'vue';
import gsap from 'gsap';
import useWeather from '@/utils/useWeather.js';

const props = defineProps({
  city: {
    type: String,
    required: true,
  },
});

const data = reactive({
  currentTemperature: 0,
  tweenedTemperature: 0,
});

const { getWeatherPic, getWeatherData } = useWeather();

watch(
  () => data.currentTemperature,
  (newValue) => {
    gsap.to(data, {
      duration: 1,
      ease: 'circ.out',
      tweenedTemperature: newValue,
    });
  }
);

onMounted(() => {
  data.currentTemperature = getWeatherData(props.city, 'T');
});
</script>

<template>
  <div class="m-10 relative text-5xl font-bold">
    <div class="text-5xl">{{ city }}</div>
    <div class="text-7xl mt-2">
      {{ data.tweenedTemperature.toFixed(0) }}&#8451;
    </div>
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
