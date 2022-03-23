<script setup>
import { defineProps, computed } from 'vue';
import { useStore } from 'vuex';
import WeatherNowCard from '@/components/WeatherNowCard';
import WeatherTreeDaysCard from '@/components/WeatherTreeDaysCard';
import WeatherWeekCard from '@/components/WeatherWeekCard';

const props = defineProps({
  city: {
    type: String,
    required: true,
  },
});

const { state } = useStore();

const cityData = computed(() => {
  return state.weatherForecast.find(
    (weatherData) => weatherData.locationName === props.city
  );
});

const cityWeekData = computed(() => {
  return state.weekWeatherForecast.find(
    (weatherData) => weatherData.locationName === props.city
  );
});
</script>

<template>
  <div class="weather text-center">
    <div v-if="cityData" class="relative z-10">
      <WeatherNowCard :city="city" />
      <WeatherTreeDaysCard :city="city" :cityData="cityData" />
      <WeatherWeekCard v-if="cityWeekData" :cityWeekData="cityWeekData" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './Weather.scss';
</style>
