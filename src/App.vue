<template>
  <div class="navigate-wrap">
    <SearchBarVue />
    <SettingVue />
  </div>
  <BackgroundVue />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import SettingVue from '@/container/Setting/Setting.vue';
import SearchBarVue from '@/container/SearchBar/SearchBar.vue';
import BackgroundVue from '@/container/Background/Background.vue';
import useIndexedDb, { CreateStore } from '@/common/indexedDB';
import { LayoutSettingData, ShortcutData } from '@/common/types';
import { useStore } from '@/store';

const store = useStore();
onMounted(async () => {
  const layout: CreateStore<LayoutSettingData> = useIndexedDb.useStore('layout');
  const layoutSetting = await layout.findAll();
  if (layoutSetting) {
    store.commit('SAVE_LAYOUT_SETTING', layoutSetting.value);
  }
  const shortcut: CreateStore<ShortcutData> = useIndexedDb.useStore('shortcut');
  const shortcutList = await shortcut.findAll();
  console.log(shortcutList);
  // if (shortcutList) {
  //   store.commit('UPDATE_LAYOUT_SETTING', layoutSetting);
  // }
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
