<template>
  <section class="shortcut">
    <swipe class="my-swipe" indicator-color="white" :loop="false">
      <swipe-item v-for="(shorts, index) in shortcutList" :key="index">
        <div class="shortcut--list">
          <div class="shortcut--item" v-for="(shortcut, i) in shorts" :key="i" @click="jump(shortcut)">
            <div class="shortcut__icon" :style="{ backgroundImage: `url(${shortcut.backgroundImage})`, backgroundColor: shortcut.logoBgColor, fontSize: `${shortcut.logoLabelSize / 100}rem`, color: shortcut.logoColor }">
              <p v-if="!shortcut.backgroundImage">{{ shortcut.logoLabel }}</p>
            </div>
            <div class="shortcut__label van-ellipsis">{{ shortcut.sitName }}</div>
          </div>
        </div>
      </swipe-item>
    </swipe>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, Ref, ComputedRef } from 'vue';
import { Swipe, SwipeItem } from 'vant';
import { useStore } from '@/store';
import { ShortcutData } from '@/common/types';

const pageSize = 6;
const store = useStore();

const sliceArray = (arr = [], size = 10) => {
  if (!Array.isArray(arr)) return [];
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};
const shortcutList: ComputedRef<(ShortcutData & { backgroundImage: string })[][]> = computed(() => sliceArray(store.getters.getShortcutList, pageSize));

const jump = (data: ShortcutData) => {
  const { sitUrl = '' } = data;
  window.location.href = sitUrl;
};

</script>

<style lang="less">
@import url("./index.less");
</style>
