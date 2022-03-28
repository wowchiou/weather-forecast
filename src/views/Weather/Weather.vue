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

const { getters } = useStore();
const cityData = computed(() => getters.getCityWeather(props.city));
const cityWeekData = computed(() => getters.getCityWeekWeather(props.city));
</script>

<template>
  <div class="weather text-center">
    <div
      v-if="cityData && cityWeekData"
      data-test="card-wrapper"
      class="relative z-10"
    >
      <WeatherNowCard :city="city" />
      <WeatherTreeDaysCard :city="city" />
      <WeatherWeekCard :city="city" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './Weather.scss';
</style>
