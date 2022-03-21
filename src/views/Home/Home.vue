<script setup>
import { ref } from 'vue';
import CitySelector from '@/components/CitySelector';
import AppIcon from '@/components/AppIcon';

const isEdit = ref(false);

function toggleEdit() {
  isEdit.value = !isEdit.value;
}
</script>

<template>
  <div class="home">
    <div class="mt-5">
      <CitySelector />

      <ul class="mt-5 pb-20" :class="{ active: isEdit }">
        <li v-for="index in 1" :key="`weather${index}`" class="weather-list">
          <div class="remove-btn">
            <AppIcon
              icon="remove"
              class="bg-red-600 w-10 h-10 mx-auto flex justify-center items-center rounded-full"
            />
          </div>
          <router-link :to="{ name: 'weather', params: { city: '板橋區' } }">
            <div class="relative z-10">
              <div class="flex justify-between items-end">
                <p class="text-4xl">板橋區</p>
                <p class="text-6xl">26&#8451;</p>
              </div>
              <div class="flex justify-between items-center mt-5">
                <p>多雲時晴</p>
                <div class="flex justify-between items-center text-3xl">
                  <p class="text-gray-200">21&#8451;</p>
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
</style>
