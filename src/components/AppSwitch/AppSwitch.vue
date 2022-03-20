<script setup>
import { ref } from 'vue';

const isDark = ref(false);

function toggleDark() {
  isDark.value = !isDark.value;
  if (isDark.value) {
    return document.querySelector('html').classList.add('dark');
  }
  return document.querySelector('html').classList.remove('dark');
}
</script>

<template>
  <div class="switch-btn" :class="{ active: isDark }" @click="toggleDark">
    <div class="ball"></div>
  </div>
</template>

<style lang="scss" scoped>
@import './AppSwitch.scss';
.switch-btn {
  user-select: none;
  @apply relative w-16 h-8 bg-gray-100 rounded-full cursor-pointer;
  &.active {
    .ball {
      left: auto;
      @apply right-1 bg-gray-600;
    }
  }
}
.ball {
  transform: translate(0, -50%);
  transition: 0.3s;
  @apply absolute w-7 h-7 rounded-full bg-gray-400 top-1/2
    left-1;
}
</style>
