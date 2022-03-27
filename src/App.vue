<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AppHeader from '@/components/AppHeader';
import AppLoader from '@/components/AppLoader';

const router = useRouter();
const { state, dispatch } = useStore();
const loader = computed(() => state.loader);

onMounted(() => {
  Promise.all([dispatch('fetchWeatherForecast'), dispatch('fetchWeekWeather')])
    .catch((err) => {
      console.log(err);
      router.push({
        name: 'error',
        params: { message: 'Network error, 請稍後再試！' },
      });
    })
    .finally(() => {
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
