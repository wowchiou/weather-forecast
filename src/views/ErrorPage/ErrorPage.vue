<script setup>
import { defineProps } from 'vue';

defineProps({
  message: {
    type: String,
  },
});
</script>

<template>
  <div class="error flex justify-center items-center">
    <div class="font-bold">
      <h1 data-test="error-title" class="text-4xl text-yellow-400 mt-10">
        Oops!Something went wrong!
      </h1>
      <p v-if="!message" data-test="error-404" class="error-text">
        Page not found.
      </p>
      <p v-else data-test="error-message" class="error-text">{{ message }}</p>
      <router-link
        data-test="home-button"
        class="mt-5 border-2 py-1 px-5 rounded-md"
        :to="{ name: 'home' }"
        >返回首頁</router-link
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './ErrorPage.scss';
</style>
