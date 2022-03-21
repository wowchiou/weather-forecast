<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AppIcon from '@/components/AppIcon';

const { state } = useStore();
const router = useRouter();
const cities = computed(() => state.weatherForecast);

function handleCityChange(e) {
  if (!e.target.value) return;
  router.push({ name: 'weather', params: { city: e.target.value } });
}
</script>

<template>
  <div class="input-wrap">
    <div class="flex items-center justify-center pl-1">
      <AppIcon class="text-5xl" icon="search" />
    </div>
    <select class="flex-1" type="text" @change="handleCityChange">
      <option value="">-- 請選擇城市 --</option>
      <option
        v-for="city in cities"
        :key="city.locationName"
        :value="city.locationName"
      >
        {{ city.locationName }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
@import './CitySelector.scss';
</style>
