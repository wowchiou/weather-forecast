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
const data = reactive({
  currentTemperature: 0,
  tweenedTemperature: 0,
});

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
  data.currentTemperature = getWeatherValue(props.city, 'T');
});
</script>

<template>
  <div class="m-10 relative text-5xl font-bold">
    <div class="text-5xl">{{ city }}</div>
    <div class="text-7xl mt-2">
      {{ data.tweenedTemperature.toFixed(0) }}&#8451;
    </div>
    <div class="mt-4 text-4xl">
      <span>{{ getWeatherValue(city, 'Wx') }}</span>
      <span class="ml-4 text-yellow-400"
        >{{ getWeatherValue(city, 'PoP6h') }}%</span
      >
    </div>
    <img
      class="absolute w-1/4 -top-5 right-5 z-0"
      :src="getWeatherPic(getWeatherValue(city, 'Wx', 1))"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './WeatherNowCard.scss';
</style>
