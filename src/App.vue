<template>
  <div class="navigate-wrap" v-if="renderPage">
    <div class="navigate-content" :style="searchStyle">
      <SearchBarVue />
      <ShortcutVue />
    </div>
    <SettingVue />
  </div>
  <BackgroundVue />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import localforage from 'localforage';
import SettingVue from '@/container/Setting/Setting.vue';
import SearchBarVue from '@/container/SearchBar/SearchBar.vue';
import BackgroundVue from '@/container/Background/Background.vue';
import ShortcutVue from '@/container/Shortcut/Shortcut.vue';
import * as SETTING from '@/store/conf';
import { useStore } from '@/store';

const store = useStore();
const renderPage = ref(false);
const searchStyle = computed(() => store.getters.getSearchStyle);

const initStore = async () => {
  try {
    Object.keys(SETTING).forEach(async (item) => {
      const setting = await localforage.getItem(item);
      if (setting) store.commit(item, setting);
    });
  } catch (error) {
    console.log('error');
  }
  renderPage.value = true;
};
onMounted(() => {
  initStore();
});
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
.navigate-content {
  position: absolute;
  width: 100%;
  top: var(--search-margin-top);
}
</style>
