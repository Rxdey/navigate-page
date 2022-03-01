<template>
  <section class="shortcut">
    <div class="shortcut--list">
      <div class="shortcut--item" v-for="(shortcut, i) in shortcutList" :key="i">
        <div
          class="shortcut__icon"
          :style="{ backgroundImage: `url(${shortcut.backgroundImage})`, backgroundColor: shortcut.logoBgColor, fontSize: `${shortcut.logoLabelSize / 100}rem`, color: shortcut.logoColor }"
        >
          <p v-if="!shortcut.backgroundImage">{{shortcut.logoLabel}}</p>
        </div>
        <div class="shortcut__label van-ellipsis">{{ shortcut.sitName }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, Ref, onBeforeMount, ComputedRef } from 'vue';
import { useStore } from '@/store';
import { ShortcutData } from '@/common/types';

const store = useStore();
const shortcutList: ComputedRef<(ShortcutData & { backgroundImage: string })[]> = computed(() => store.getters.getShortcutList);

</script>

<style lang="less">
@import url("./index.less");
</style>
