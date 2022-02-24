<template>
  <div class="navigate-wrap">
    <SearchBarVue />
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
import { UPDATE_LAYOUT_SETTING, UPDATE_SHORTCUT_LIST } from '@/store/conf';
import { useStore } from '@/store';

const store = useStore();

const initStore = async () => {
  const layoutSetting = await localforage.getItem(UPDATE_LAYOUT_SETTING);
  console.log(layoutSetting);
  if (layoutSetting) store.commit(UPDATE_LAYOUT_SETTING, layoutSetting);
  const shortcutList = await localforage.getItem(UPDATE_SHORTCUT_LIST);
  if (shortcutList) store.commit(UPDATE_SHORTCUT_LIST, shortcutList);
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
</style>
