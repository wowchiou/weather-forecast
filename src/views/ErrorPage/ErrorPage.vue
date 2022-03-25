<script setup></script>

<template>
  <div class="error flex justify-center items-center">
    <h1 class="">Oops!Page not found!</h1>
    <router-link :to="{ name: 'home' }">返回首頁</router-link>
  </div>
</template>

<style lang="scss" scoped>
@import './ErrorPage.scss';
</style>
