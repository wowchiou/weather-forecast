<script setup>
import { useRouter } from 'vue-router';
import { WEATHER_CITY } from '@/storage.js';
import CITY from '@/city.json';

const router = useRouter();

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
        v-for="city in CITY"
        :key="city"
        :value="city"
        data-test="city-options"
      >
        {{ city }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
@import './CitySelector.scss';
</style>
