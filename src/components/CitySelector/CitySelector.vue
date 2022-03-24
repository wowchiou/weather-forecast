<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { WEATHER_CITY } from '@/storage.js';

const { state } = useStore();
const router = useRouter();
const cities = computed(() => state.weatherForecast);

function handleCityChange(e) {
  const target = e.target.value;
  if (!target) return;
  const weatherCity = localStorage.getItem(WEATHER_CITY);
  if (!weatherCity) {
    localStorage.setItem(WEATHER_CITY, target);
  } else if (weatherCity.indexOf(target) === -1) {
    localStorage.setItem(WEATHER_CITY, `${weatherCity}/${target}`);
  }
  router.push({ name: 'weather', params: { city: target } });
}
</script>

<template>
  <div class="input-wrap">
    <select
      class="flex-1 text-3xl text-center"
      data-test="city-selector"
      @change="handleCityChange"
    >
      <option value="">-- 請選擇城市 --</option>
      <option
        v-for="city in cities"
        :key="city.locationName"
        :value="city.locationName"
        data-test="city-options"
      >
        {{ city.locationName }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
@import './CitySelector.scss';
</style>
