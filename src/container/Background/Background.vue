<template>
  <div
    class="Background"
    :style="`background-color: ${layoutSetting.color};background-image:url(${currentBg});${layoutSetting.displayMode}`"
  ></div>
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
.Background {
  position: absolute;
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
</style>
