<template>
  <div class="setting-button">
    <van-icon name="bar-chart-o" size=".7rem" color="#fff" @click="showPopup" />
  </div>
  <van-popup
    v-model:show="show"
    :position="popupSetting.position"
    :round="popupSetting.round"
    closeable
    :overlay="false"
    teleport="body"
    class="current-popup"
  >
    <van-tabs v-model:active="active" animated color="#fc7c79">
      <van-tab title="添加">
        <AddPaneVue />
      </van-tab>
      <van-tab title="背景">
        <LayoutVue />
      </van-tab>
      <van-tab title="全局">
        <GlobalVue />
      </van-tab>
    </van-tabs>
  </van-popup>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Popup as VanPopup, Tab as VanTab, Tabs as VanTabs, PopupPosition } from 'vant';
import AddPaneVue from './components/AddPane.vue';
import LayoutVue from './components/LayoutVue.vue';
import GlobalVue from './components/Global.vue';

const show = ref(false);
const active = ref(0);
const popupSetting = ref({
  position: 'bottom' as PopupPosition,
  round: true,
});

const setPosition = () => {
  if (window.innerWidth >= 680) {
    popupSetting.value = { position: 'right', round: false };
  } else {
    popupSetting.value = { position: 'bottom', round: true };
  }
};
const showPopup = () => {
  show.value = true;
};
onMounted(() => {
  setPosition();
  window.addEventListener('resize', setPosition);
});
</script>
<!-- favicon.ico -->

<style lang="less">
.van-tabs {
  display: flex;
  flex-flow: column;
  height: 100%;
  .van-tabs__content {
    flex: 1;
    min-height: 100px;
    .van-tab__pane {
      height: 100%;
      // overflow-y: auto;
    }
  }
}
.setting-button {
  position: fixed;
  bottom: 32px;
  left: 32px;
}
.current-popup {
  height: 80%;
  overflow: hidden;
}
@media screen and (min-width: 680px) {
  .current-popup {
    height: 100%;
    width: 600px;
  }
}
</style>
