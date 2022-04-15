<template>
  <teleport to="body">
    <div class="background" :style="layoutSetting">
      <div class="background-image" :style="{ backgroundImage: `url(${bg})` }"></div>
      <div class="background-mask"></div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed, watch, ComputedRef } from 'vue';
import { useStore } from '@/store';

const store = useStore();

const layoutSetting = computed(() => store.getters.getLayoutStyle);
const bg = computed(() => store.getters.getBgImage);

</script>

<style lang="less">
.background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  filter: blur(var(--background-filter));
}
.background-image {
  background-color: var(--background-color);
  background-repeat: var(--background-repeat);
  background-size: var(--background-size);
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.background-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, var(--background-mask));
}
</style>
