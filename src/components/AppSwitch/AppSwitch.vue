<script setup>
import { defineProps } from 'vue';

defineProps({
  active: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div class="switch-btn" :class="{ active }">
    <div class="ball"></div>
  </div>
</template>

<style lang="scss" scoped>
@import './AppSwitch.scss';
</style>
