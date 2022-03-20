<script setup>
function getWeatherPicURL(index) {
  let picIndex = index < 10 ? `0${index}` : index;
  return `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${picIndex}.svg`;
}
</script>

<template>
  <div class="app-container text-center">
    <div class="summary">
      <div class="text-5xl font-bold">板橋區</div>
      <div class="text-7xl font-bold mt-2">26&#8451;</div>
      <div class="mt-4">多雲時晴</div>
      <div class="flex justify-center items-center mt-2">
        <span>最高29&#8451;</span>
        <span class="ml-4">最低21&#8451;</span>
      </div>
    </div>

    <div class="card">
      <div class="relative z-10">
        <div class="pt-4 px-4 text-left">
          <p class="pb-4 border-b border-gray-100">預計大約下午8時居部多雲。</p>
        </div>
        <div class="overflow-x-auto pb-4">
          <ul class="whitespace-nowrap">
            <li
              v-for="index in 24"
              :key="`today${index}`"
              class="w-auto inline-block p-4"
            >
              <p><span class="text-sm">下午</span>19:00</p>
              <div class="h-10 mt-2">
                <img
                  class="block h-full w-auto m-auto"
                  :src="getWeatherPicURL(index)"
                  alt=""
                />
              </div>
              <p class="mt-2">22&#8451;</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card mt-10">
      <div class="relative z-10">
        <div class="pt-4 px-4 text-left">
          <p class="pb-4 border-b border-gray-100">7天天氣預報</p>
        </div>
        <ul>
          <li
            v-for="index in 7"
            :key="`week${index}`"
            class="flex justify-between items-center p-4 font-bold text-3xl"
          >
            <p class="w-1/5 text-left">今天</p>
            <div class="w-1/5">
              <div class="w-1/2">
                <div class="h-10 mb-1">
                  <img class="h-full" :src="getWeatherPicURL(index)" alt="" />
                </div>
                <p class="text-2xl text-gray-100">70%</p>
              </div>
            </div>
            <div class="flex items-center flex-1">
              <p class="opacity-60">18&#8451;</p>
              <div class="flex-1 mx-3 h-2 bg-gray-100 rounded-full"></div>
              <p>27&#8451;</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './Weather.scss';
.summary {
  @apply my-10;
}

.card {
  @apply relative rounded-md overflow-hidden;
  &::after {
    @apply absolute w-full h-full top-0 left-0 z-0;
    content: '';
    background-color: rgba(255, 255, 255, 0.1);
    filter: blur(10px);
  }
}
</style>
