<template>
  <teleport to="body">
    <div
      class="background"
      :style="`background-color: ${layoutSetting.color};background-image:url(${currentBg});${layoutSetting.displayMode}; filter: blur(${(layoutSetting.filter || 0) * 0.2}px);${layoutSetting.filter ? 'transform:scale(1.04)' : ''}`"
    >
    <div class="background-mask" :style="{backgroundColor: `rgba(0,0,0, ${(layoutSetting.mask || 0) * 0.01})`}"></div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineProps } from 'vue';
import { useStore } from '@/store';
import { dataURLtoBlob } from '@/common/util';

const store = useStore();

const layoutSetting = computed(() => store.state.layoutSetting);

const currentBg = computed(() => (layoutSetting.value.networkUrl ? layoutSetting.value.networkUrl : window.URL.createObjectURL(dataURLtoBlob(layoutSetting.value.bg) || new Blob())));

</script>

<style lang="less">
.background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #333;
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
  background-color: rgba(0,0,0,.1);
}
</style>
