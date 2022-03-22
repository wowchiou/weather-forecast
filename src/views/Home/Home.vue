<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { WEATHER_CITY } from '@/storage.js';

import AppIcon from '@/components/AppIcon';
import CitySelector from '@/components/CitySelector';
import HomeWeatherList from '@/components/HomeWeatherList';

const { state } = useStore();
const isEdit = ref(false);

const hasWeatherData = computed(
  () => localStorage.getItem(WEATHER_CITY) && state.weatherForecast.length !== 0
);
</script>

<template>
  <div class="home">
    <div class="mt-5">
      <CitySelector />
      <p v-if="!hasWeatherData" class="empty-text">請選擇城市</p>
      <HomeWeatherList v-else :isEdit="isEdit" />
    </div>
    <div class="edit-btn" :class="{ active: isEdit }" @click="isEdit = !isEdit">
      <AppIcon class="text-5xl" icon="edit" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './Home.scss';
.empty-text {
  @apply mt-5 text-3xl text-center text-yellow-400;
}
</style>
