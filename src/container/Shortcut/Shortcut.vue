<template>
  <section class="shortcut">
    <swipe class="my-swipe" indicator-color="white" :loop="false">
      <swipe-item v-for="(shorts, index) in shortcutList" :key="index">
        <div class="shortcut--list">
          <div class="shortcut--item" v-for="(shortcut, i) in shorts" :key="i" @click="jump(shortcut)" v-longpress @longpress="onLongTap(shortcut, i)" @contextmenu.prevent>
            <div class="shortcut__icon" :style="{ backgroundImage: `url(${shortcut.backgroundImage})`, backgroundColor: shortcut.logoBgColor, fontSize: `${shortcut.logoLabelSize / 100}rem`, color: shortcut.logoColor }">
              <p v-if="!shortcut.backgroundImage">{{ shortcut.logoLabel }}</p>
            </div>
            <div class="shortcut__label van-ellipsis" v-show="iconFontSize > 90">{{ shortcut.sitName }}</div>
          </div>
        </div>
      </swipe-item>
    </swipe>
  </section>
  <van-popup v-model:show="show" position="bottom" closeable round teleport="body" class="current-popup" :overlay-style="{ backgroundColor: 'transparent' }" :close-on-click-overlay="clouseOnclickOverlay" @opened="clouseOnclickOverlay = true" @close="clouseOnclickOverlay = false">
    <AddPaneVue v-if="show" title="编辑图标" edit :data="selectShortcut" @close="show = false"></AddPaneVue>
  </van-popup>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, Ref, ComputedRef } from 'vue';
import { Swipe, SwipeItem, Popup as VanPopup } from 'vant';
import { useStore } from '@/store';
import { ShortcutData } from '@/common/types';
import AddPaneVue from '../Setting/container/ShortcutMenu/AddPane.vue';

const pageSize = 12;
const store = useStore();
const show = ref(false);
// 动画未结束前不触发点击背景关闭
const clouseOnclickOverlay = ref(false);
const selectShortcut: Ref<ShortcutData & { index?: number} | null> = ref(null);

const sliceArray = (arr = [], size = 10) => {
  if (!Array.isArray(arr)) return [];
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};
const shortcutList: ComputedRef<(ShortcutData & { backgroundImage: string })[][]> = computed(() => sliceArray(store.getters.getShortcutList, pageSize));
const iconFontSize = computed(() => store.state.globalSetting.grid.iconFontSize);

const jump = (data: ShortcutData) => {
  const { sitUrl = '' } = data;
  window.location.href = sitUrl;
};

const onLongTap = (shortcut: ShortcutData, i = 0) => {
  console.log(shortcut);
  selectShortcut.value = { ...shortcut, index: i };
  show.value = true;
};
</script>

<style lang="less">
@import url("./index.less");
</style>
