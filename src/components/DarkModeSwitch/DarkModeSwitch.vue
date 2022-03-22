<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { WEATHER_DARK_MODE } from '@/storage.js';

import AppIcon from '@/components/AppIcon';
import AppSwitch from '@/components/AppSwitch';

const { state, dispatch } = useStore();
const dark = ref(false);

(async () => {
  const localDark = localStorage.getItem(WEATHER_DARK_MODE);
  if (!localDark) {
    await dispatch('fetchSunrise');
    const date = Date.now();
    dark.value = date >= state.sunrise.night || date < state.sunrise.day;
  } else if (localDark && localDark === 'on') {
    dark.value = true;
  }
  setDarkMode(dark.value);
})();

function toggleDark() {
  dark.value = !dark.value;
  setDarkMode(dark.value);
  dark.value
    ? localStorage.setItem(WEATHER_DARK_MODE, 'on')
    : localStorage.setItem(WEATHER_DARK_MODE, 'off');
}

function setDarkMode(dark) {
  dark
    ? document.querySelector('html').classList.add('dark')
    : document.querySelector('html').classList.remove('dark');
}
</script>

<template>
  <div class="flex justify-center items-center">
    <AppIcon class="text-3xl mr-2" icon="wb_sunny" />
    <AppSwitch :active="dark" @click="toggleDark" />
    <AppIcon class="text-3xl ml-2" icon="nightlight_round" />
  </div>
</template>

<style lang="scss" scoped>
@import './DarkModeSwitch.scss';
</style>
