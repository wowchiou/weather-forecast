<script setup>
import { ref } from 'vue';
import AppIcon from '@/components/AppIcon';
import AppSwitch from '@/components/AppSwitch';

const isEdit = ref(false);

function toggleEdit() {
  console.log(1);
  isEdit.value = !isEdit.value;
}
</script>

<template>
  <div class="app-container">
    <header class="flex justify-between items-center">
      <h1 class="text-5xl font-bold text-left">天氣</h1>
      <div class="flex justify-center items-center">
        <AppIcon class="text-3xl mr-2" icon="wb_sunny" />
        <AppSwitch />
        <AppIcon class="text-3xl ml-2" icon="nightlight_round" />
      </div>
    </header>

    <div class="mt-5">
      <div class="input-wrap">
        <div class="flex items-center justify-center pl-1">
          <AppIcon class="text-5xl" icon="search" />
        </div>
        <input class="flex-1" type="text" />
      </div>

      <ul class="mt-5 pb-20" :class="{ active: isEdit }">
        <li v-for="index in 14" :key="`weather${index}`" class="weather-list">
          <div class="remove-btn">
            <AppIcon
              icon="remove"
              class="bg-red-600 w-10 h-10 mx-auto flex justify-center items-center rounded-full"
            />
          </div>
          <router-link :to="{ name: 'weather' }">
            <div class="relative z-10">
              <div class="flex justify-between items-end">
                <p class="text-4xl">板橋區</p>
                <p class="text-6xl">26&#8451;</p>
              </div>
              <div class="flex justify-between items-center mt-5">
                <p>多雲時晴</p>
                <div class="flex justify-between items-center text-3xl">
                  <p class="text-gray-300">21&#8451;</p>
                  <span>－</span>
                  <p>29&#8451;</p>
                </div>
              </div>
            </div>
          </router-link>
          <div class="drag-btn">
            <AppIcon
              icon="menu"
              class="w-10 h-10 mx-auto flex justify-center items-center hover:text-gray-300"
            />
          </div>
        </li>
      </ul>
    </div>

    <div class="edit-btn" :class="{ active: isEdit }" @click="toggleEdit">
      <AppIcon class="text-5xl" icon="edit" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './Home.scss';
.input-wrap {
  @apply flex justify-start items-stretch rounded-md dark:bg-gray-600;
  background-color: rgba(255, 255, 255, 0.5);
}

ul {
  &.active {
    .remove-btn,
    .drag-btn {
      @apply w-20 translate-x-0 opacity-100;
    }
  }
}

.remove-btn {
  transition: 0.3s;
  @apply w-0 overflow-hidden -translate-x-full opacity-0 cursor-pointer;
}
.drag-btn {
  transition: 0.3s;
  @apply w-0 overflow-hidden translate-x-full opacity-0 cursor-pointer;
}
.weather-list {
  @apply rounded-md relative overflow-hidden mt-4 flex justify-center items-center;
  transition: 0.3s;
  text-shadow: 0.4rem 0.4rem 0.4rem rgba(0, 0, 0, 0.3);
  &:first-child {
    margin-top: 0;
  }

  a {
    @apply relative w-full px-5 py-6 z-10 font-bold;
    &::after {
      content: '';
      @apply absolute w-full h-full top-0 left-0 bg-right-bottom z-0;
      background-image: url(~@/assets/images/sky-1.jpeg);
      background-size: auto 500%;
      background-repeat: no-repeat;
      filter: contrast(90%);
      opacity: 0.5;
      animation: float-left 1000s infinite alternate linear;
    }
  }
}

.dark .weather-list a::after {
  background-image: url(~@/assets/images/sky-night-2.jpg);
}

@keyframes float-left {
  from {
    background-position: bottom left;
  }
  to {
    background-position: bottom right;
  }
}

.edit-btn {
  @apply fixed flex justify-center items-center w-20 h-20 rounded-full bottom-5 right-5 cursor-pointer z-20;
  &.active {
    background-color: rgba(255, 255, 255, 0.3);
  }
}
</style>
