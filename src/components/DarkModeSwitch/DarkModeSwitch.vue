<script setup>
import { ref } from 'vue';
import { WEATHER_DARK_MODE } from '@/storage.js';
import AppIcon from '@/components/AppIcon';
import AppSwitch from '@/components/AppSwitch';

const date = new Date();
const dark = ref(false);
const currentHours = ref(date.getHours());
const localDarkMode = localStorage.getItem(WEATHER_DARK_MODE);

if (!localDarkMode) {
  dark.value = currentHours.value >= 6 && currentHours.value < 18;
} else if (localDarkMode === 'on') {
  dark.value = true;
}

setDarkMode(dark.value);

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
    <AppIcon data-test="dark-sun" class="text-3xl mr-2" icon="wb_sunny" />
    <AppSwitch data-test="dark-switch" :active="dark" @click="toggleDark" />
    <AppIcon
      data-test="dark-moon"
      class="text-3xl ml-2"
      icon="nightlight_round"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './DarkModeSwitch.scss';
</style>
