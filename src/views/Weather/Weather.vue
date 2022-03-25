<script setup>
import { defineProps, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import WeatherNowCard from '@/components/WeatherNowCard';
import WeatherTreeDaysCard from '@/components/WeatherTreeDaysCard';
import WeatherWeekCard from '@/components/WeatherWeekCard';

const props = defineProps({
  city: {
    type: String,
    required: true,
  },
});

console.log(2);

const { getters } = useStore();
const router = useRouter();
const cityData = computed(() => getters.getCityWeather(props.city));
const cityWeekData = computed(() => getters.getCityWeekWeather(props.city));

onMounted(() => {
  console.log(3);
  if (!props.city) {
    router.push({ name: 'error' });
  }
});
</script>

<template>
  <div class="weather text-center">
    <div v-if="cityData && cityWeekData" class="relative z-10">
      <WeatherNowCard :city="city" />
      <WeatherTreeDaysCard :city="city" />
      <WeatherWeekCard :city="city" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './Weather.scss';
</style>
