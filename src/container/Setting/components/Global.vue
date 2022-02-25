<template>
  <section class="layout">
    <div class="layout-wrap">
      <van-cell-group title="搜索框位置">
        <div class="slider">
          <div class="slider-wrap">
            <div class="slider-content">
              <van-slider
                v-model="searchBarSetting.positionY"
                :step="1"
                :max="100"
                :min="0"
                active-color="#333"
                button-size="0.4rem"
              />
            </div>
            <div>{{ searchBarSetting.positionY || 0 }}%</div>
          </div>
        </div>
      </van-cell-group>
    </div>
    <div class="button-wrap">
      <van-button block round type="danger" @click="handleSubmit">保存</van-button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, Ref } from 'vue';
import { Switch as VanSwitch, Toast, Slider as VanSlider } from 'vant';
import { useStore } from '@/store';
import { GLOBAL_SETTING } from '@/conf/conf';
import { GlobalSettingData } from '@/common/types';

const store = useStore();
const globalSetting = computed(() => store.state.globalSetting);
const searchBarSetting = ref(GLOBAL_SETTING.searchBar);

onMounted(() => { });

const handleSubmit = () => {
  searchBarSetting.value = globalSetting.value.searchBar;
};
</script>

<style lang="less">
@import url("../index.less");
</style>
