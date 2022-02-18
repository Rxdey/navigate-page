<template>
  <div class="setting-button">
    <van-icon name="bar-chart-o" size=".7rem" color="#fff" @click="showPopup"/>
  </div>
  <van-popup
    v-model:show="show"
    position="bottom"
    :style="{ height: '80%' }"
    round
    closeable
    teleport="body"
  >
    <van-tabs v-model:active="active" animated color="#fc7c79">
      <van-tab title="添加">
        <AddPaneVue />
      </van-tab>
      <van-tab title="布局">
        <LayoutVue />
      </van-tab>
      <van-tab title="设置">设置</van-tab>
    </van-tabs>
  </van-popup>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Popup as VanPopup, Tab as VanTab, Tabs as VanTabs } from 'vant';
import AddPaneVue from './components/AddPane.vue';
import LayoutVue from './components/LayoutVue.vue';

const show = ref(true);
const active = ref(1);

const showPopup = () => {
  show.value = true;
};
</script>
<!-- favicon.ico -->

<style lang="less">
.setting-button {
  position: fixed;
  bottom: 32px;
  left: 32px;
}
</style>
