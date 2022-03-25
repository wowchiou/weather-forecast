<script setup>
import { reactive, defineProps, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import gsap from 'gsap';
import useWeather from '@/utils/useWeather.js';

const props = defineProps({
  city: {
    type: String,
    required: true,
  },
});

const { state } = useStore();
const { getWeatherPic, getWeatherValue } = useWeather({
  weatherForecast: state.weatherForecast,
});

const temperature = reactive({
  current: 0,
  animateNumber: 0,
});

watch(
  () => temperature.current,
  (newValue) => {
    gsap.to(temperature, {
      duration: 1,
      ease: 'circ.out',
      animateNumber: newValue,
    });
  }
);

onMounted(() => {
  temperature.current = getWeatherValue(props.city, 'T');
});
</script>

<template>
  <div class="m-10 relative text-5xl font-bold">
    <div data-test="city-name" class="text-5xl">{{ city }}</div>
    <div data-test="weather-t" class="text-7xl mt-2">
      {{ temperature.animateNumber.toFixed(0) }}&#8451;
    </div>
    <div class="mt-4 text-4xl">
      <span data-test="weather-wx">{{ getWeatherValue(city, 'Wx') }}</span>
      <span data-test="weather-pop" class="ml-4 text-yellow-400"
        >{{ getWeatherValue(city, 'PoP6h') }}%</span
      >
    </div>
    <img
      data-test="weather-pic"
      class="absolute w-1/4 -top-5 right-5 z-0"
      :src="getWeatherPic(getWeatherValue(city, 'Wx', 1))"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './WeatherNowCard.scss';
</style>
