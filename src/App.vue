<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import AppHeader from '@/components/AppHeader';
import AppLoader from '@/components/AppLoader';

const { state, dispatch } = useStore();
const loader = computed(() => state.loader);

onMounted(() => {
  console.log(1);
  Promise.all([
    dispatch('fetchWeatherForecast'),
    dispatch('fetchWeekWeather'),
  ]).finally(() => {
    dispatch('showLoader', false);
  });
});
</script>

<template>
  <div class="max-w-3xl w-11/12 m-auto pt-5 pb-20 text-white">
    <AppHeader data-test="app-header" />

    <router-view v-slot="{ Component }">
      <transition name="slide-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <teleport to="#portal-loader">
      <AppLoader data-test="app-loader" v-if="loader" />
    </teleport>
  </div>
</template>

<style lang="scss">
@import '~@/assets/scss/_var.scss';
</style>
