<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { WEATHER_CITY } from '@/storage.js';
import useWeather from '@/utils/useWeather.js';

import CitySelector from '@/components/CitySelector';
import AppIcon from '@/components/AppIcon';

const { state } = useStore();
const { setWeatherPic } = useWeather();

const isEdit = ref(false);
const cities = ref(localStorage.getItem(WEATHER_CITY));

function toggleEdit() {
  isEdit.value = !isEdit.value;
}

function removeCity(cityIndex) {
  const city = cities.value.split('/');
  city.splice(cityIndex, 1);
  if (city.length === 0) {
    localStorage.removeItem(WEATHER_CITY);
    cities.value = null;
  } else {
    localStorage.setItem(WEATHER_CITY, city.join('/'));
    cities.value = city.join('/');
  }
}

function getCityData(city) {
  const cityData = state.weatherForecast.find(
    (itm) => itm.locationName === city
  );
  return cityData.weatherElement;
}
</script>

<template>
  <div class="home">
    <div class="mt-5">
      <CitySelector />

      <p
        v-if="!cities || state.weatherForecast.length === 0"
        class="mt-5 text-3xl text-center text-yellow-400"
      >
        請選擇城市
      </p>

      <ul v-else class="mt-5" :class="{ active: isEdit }">
        <li
          class="weather-list"
          v-for="(city, cityIndex) in cities.split('/')"
          :key="city"
        >
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
                <p class="text-6xl">
                  {{
                    getCityData(city)['T'].time[0].elementValue[0].value
                  }}&#8451;
                </p>
              </div>
              <div class="flex justify-between items-center mt-5">
                <p class="flex justify-start items-center">
                  <span class="w-14 h-14 mr-2 flex justify-start items-center"
                    ><img
                      class="m-h-11/12 m-w-11/12 w-full h-hull"
                      :src="
                        setWeatherPic(
                          getCityData(city)['Wx'].time[0].elementValue[1].value
                        )
                      "
                      alt=""
                  /></span>
                  <span>
                    {{ getCityData(city)['Wx'].time[0].elementValue[0].value }}
                  </span>
                </p>
                <p class="text-3xl">
                  降雨率
                  {{
                    getCityData(city)['PoP6h'].time[0].elementValue[0].value
                  }}%
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="edit-btn" :class="{ active: isEdit }" @click="toggleEdit">
      <AppIcon class="text-5xl" icon="edit" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './Home.scss';
</style>
