<script setup>
import { ref, onMounted } from 'vue';
import { WEATHER_DARK_MODE } from '@/storage.js';
import AppIcon from '@/components/AppIcon';
import AppSwitch from '@/components/AppSwitch';

const dark = ref(false);

onMounted(() => {
  const localDarkMode = localStorage.getItem(WEATHER_DARK_MODE);
  if (!localDarkMode) {
    const date = new Date();
    const currentHours = date.getHours();
    dark.value = currentHours < 6 || currentHours >= 18;
  } else if (localDarkMode === 'on') {
    dark.value = true;
  }

  setDarkMode(dark.value);
});

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
