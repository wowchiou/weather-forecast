<script setup>
import { ref, defineProps } from 'vue';
import { useStore } from 'vuex';
import useWeather from '@/utils/useWeather.js';
import { WEATHER_CITY } from '@/storage.js';
import AppIcon from '@/components/AppIcon';

defineProps({
  isEdit: {
    type: Boolean,
  },
});

const { state } = useStore();
const { getWeatherPic, getWeatherValue } = useWeather({
  weatherForecast: state.weatherForecast,
});
const cities = ref(localStorage.getItem(WEATHER_CITY));

if (cities.value) {
  cities.value = cities.value.split('/');
}

function removeCity(cityIndex) {
  cities.value.splice(cityIndex, 1);
  if (cities.value.length === 0) {
    localStorage.removeItem(WEATHER_CITY);
    cities.value = null;
  } else {
    localStorage.setItem(WEATHER_CITY, cities.value.join('/'));
  }
}
</script>

<template>
  <transition-group
    tag="ul"
    name="slide-card"
    appear
    class="mt-5"
    :class="{ active: isEdit }"
  >
    <li v-for="(city, cityIndex) in cities" :key="city" class="weather-list">
      <div class="remove-btn">
        <AppIcon
          icon="remove"
          class="remove-icon"
          @click="removeCity(cityIndex)"
        />
      </div>
      <router-link :to="{ name: 'weather', params: { city } }">
        <div class="relative z-10">
          <div class="flex justify-between items-end">
            <p class="text-4xl">
              <span>{{ city }}</span>
            </p>
            <p class="text-6xl">{{ getWeatherValue(city, 'T') }}&#8451;</p>
          </div>
          <div class="flex justify-between items-center mt-5">
            <p class="flex justify-start items-center">
              <span class="w-14 h-14 mr-2 flex justify-start items-center"
                ><img
                  class="m-h-11/12 m-w-11/12 w-full h-hull"
                  :src="getWeatherPic(getWeatherValue(city, 'Wx', 1))"
              /></span>
              <span>
                {{ getWeatherValue(city, 'Wx') }}
              </span>
            </p>
            <p class="text-3xl">
              降雨率
              {{ getWeatherValue(city, 'PoP6h') }}%
            </p>
          </div>
        </div>
      </router-link>
    </li>
  </transition-group>
</template>

<style lang="scss">
@import './HomeWeatherList.scss';
</style>
