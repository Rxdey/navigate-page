<template>
  <section class="layout">
    <p class="tip">请注意，预览效果不会被保存，请手动保存</p>
    <div class="layout-wrap" v-if="globalSetting">
      <van-cell-group title="搜索框位置">
        <my-slider
          v-model="globalSetting.searchBar.positionY"
          :step="1"
          :max="100"
          :min="0"
          active-color="#333"
          button-size="0.4rem"
        />
      </van-cell-group>
      <van-cell-group title="搜索框圆角">
        <my-slider
          v-model="globalSetting.searchBar.radius"
          :step="1"
          :max="100"
          :min="0"
          active-color="#333"
          button-size="0.4rem"
        />
      </van-cell-group>
      <van-cell-group title="搜索框宽度">
        <my-slider
          v-model="globalSetting.searchBar.width"
          :step="1"
          :max="100"
          :min="60"
          active-color="#333"
          button-size="0.4rem"
        />
      </van-cell-group>
    </div>
    <div class="button-wrap">
      <van-button block round type="danger" @click="handleSubmit">保存</van-button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, Ref, WritableComputedRef, watch } from 'vue';
import { Switch as VanSwitch, Toast, Slider as VanSlider } from 'vant';
import { useStore } from '@/store';
import { GlobalSettingData } from '@/common/types';
import { UPDATE_GLOBAL_SETTING } from '@/store/conf';
import { DEFAULT_GLOBAL_SETTING } from '@/conf/conf';

const store = useStore();
const globalData = computed(() => store.state.globalSetting);
const globalSetting: Ref<GlobalSettingData> = ref(DEFAULT_GLOBAL_SETTING);

const handleSubmit = () => {
  store.commit(UPDATE_GLOBAL_SETTING, JSON.parse(JSON.stringify(globalSetting.value)));
};

onMounted(() => {
  globalSetting.value = JSON.parse(JSON.stringify(globalData.value));
});

watch(() => globalSetting.value, (val) => {
  store.commit(`${UPDATE_GLOBAL_SETTING}_TEMP`, JSON.parse(JSON.stringify(val)));
}, { deep: true });
</script>

<style lang="less">
@import url("../index.less");
</style>
