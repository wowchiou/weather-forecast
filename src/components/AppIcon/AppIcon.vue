<script setup>
import { defineProps } from 'vue';

defineProps({
  icon: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <span class="material-icons">{{ icon }}</span>
</template>

<style lang="scss" scoped>
@import './AppIcon.scss';
.material-icons {
  user-select: none;
}
</style>
