<template>
  <teleport to="body">
    <div class="background" :style="layoutSetting">
      <div class="background-mask"></div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed, watch, ComputedRef } from 'vue';
import { useStore } from '@/store';
import { dataURLtoBlob } from '@/common/util';
import { LayoutSettingData } from '@/common/types';

const store = useStore();

const layoutSetting = computed(() => store.getters.getLayoutStyle);

</script>

<style lang="less">
.background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: var(--background-color);
  background-image: var(--background-bg);
  filter: blur(var(--background-filter));
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
