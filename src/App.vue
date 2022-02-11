<template>
  <div class="navigate-wrap">
    <SearchBarVue />
    <SettingVue />
  </div>
  <BackgroundVue />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import SettingVue from './container/Setting/Setting.vue';
import SearchBarVue from './container/SearchBar/SearchBar.vue';
import BackgroundVue from './container/Background/Background.vue';

</script>

<style lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.navigate-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 10;
}
</style>
