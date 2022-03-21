<script setup>
import { useStore } from 'vuex';
import AppHeader from '@/components/AppHeader';

const { dispatch } = useStore();
(async () => {
  await dispatch('fetchWeatherForecast');
})();
</script>

<template>
  <div class="max-w-3xl w-11/12 m-auto pt-5 pb-20 text-white">
    <AppHeader />
    <router-view />
  </div>
</template>

<style lang="scss">
@import '~@/assets/scss/_var.scss';
</style>
