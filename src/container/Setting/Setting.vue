<template>
  <section class="setting-button">
    <van-icon name="wap-nav" size=".7rem" color="#fff" @click="showPopup" />
  </section>
  <van-popup v-model:show="show" :position="popupSetting.position" :round="popupSetting.round" teleport="body" class="current-popup" :overlay-style="{ backgroundColor: 'transparent' }">
    <van-tabs v-model:active="active" animated color="#fc7c79" lazy-render>
      <van-tab title="添加">
        <ShortcutMenu />
      </van-tab>
      <van-tab title="背景">
        <LayoutVue />
      </van-tab>
      <van-tab title="全局">
        <GlobalVue />
      </van-tab>
      <!-- <van-tab title="设置">
      </van-tab> -->
    </van-tabs>
  </van-popup>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Popup as VanPopup, Tab as VanTab, Tabs as VanTabs, PopupPosition } from 'vant';
import ShortcutMenu from './container/ShortcutMenu/ShortcutMenu.vue';
import LayoutVue from './container/LayoutVue.vue';
import GlobalVue from './container/Global.vue';

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
  top: 32px;
  right: 32px;
}

.current-popup {
  height: 70%;
  overflow: hidden;
  background-color: rgba(255, 255, 255, .7);
  --van-cell-group-title-color: #ee0a24;
  .van-tabs__nav, .van-collapse-item__content {
    background-color: rgba(255, 255, 255, .5);
  }
  .van-cell,.van-cell-group {
    background-color: transparent;
  }
}

@media screen and (min-width: 680px) {
  .current-popup {
    height: 100%;
    width: 550px;
  }
}
</style>
