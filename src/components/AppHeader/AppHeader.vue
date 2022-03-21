<script setup>
import DarkModeSwitch from '@/components/DarkModeSwitch';
</script>

<template>
  <header class="flex justify-between items-center">
    <router-link :to="{ name: 'home' }">
      <h1 class="text-5xl font-bold text-left">天氣</h1>
    </router-link>
    <DarkModeSwitch />
  </header>
</template>

<style lang="scss" scoped>
@import './AppHeader.scss';
</style>
