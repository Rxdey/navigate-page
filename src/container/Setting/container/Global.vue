<template>
  <section class="layout">
    <p class="tip">请注意，预览效果不会被保存，请手动保存</p>
    <div class="layout-wrap" v-if="globalSetting">

      <collapse v-model="activeName" accordion>
        <collapse-item title="搜索框配置" name="1">
          <van-cell-group title="搜索框位置">
            <my-slider v-model="globalSetting.searchBar.positionY" :step="1" :max="100" :min="0" active-color="#333" button-size="0.4rem" />
          </van-cell-group>
          <van-cell-group title="搜索框圆角">
            <my-slider v-model="globalSetting.searchBar.radius" :step="1" :max="100" :min="0" active-color="#333" button-size="0.4rem" />
          </van-cell-group>
          <van-cell-group title="搜索框宽度">
            <my-slider v-model="globalSetting.searchBar.width" :step="1" :max="100" :min="60" active-color="#333" button-size="0.4rem" />
          </van-cell-group>
          <van-cell-group title="搜索框下边距">
            <my-slider v-model="globalSetting.searchBar.marginBottom" :step="1" :max="200" :min="0" unit="px" active-color="#333" button-size="0.4rem" />
          </van-cell-group>
        </collapse-item>
        <collapse-item title="快捷导航设置" name="2">
          <van-cell-group title="图标大小">
            <my-slider v-model="globalSetting.grid.iconSize" :step="1" :max="100" :min="50" active-color="#333" button-size="0.4rem" />
          </van-cell-group>
          <van-cell-group title="图标圆角">
            <my-slider v-model="globalSetting.grid.iconRadius" :step="1" :max="100" :min="0" active-color="#333" button-size="0.4rem" />
          </van-cell-group>
          <van-cell-group title="字体大小(拖到最低即不显示)">
            <my-slider v-model="globalSetting.grid.iconFontSize" :step="1" :max="100" :min="90" active-color="#333" button-size="0.4rem" />
          </van-cell-group>
        </collapse-item>
      </collapse>
    </div>
    <div class="button-wrap">
      <van-button block round type="danger" @click="handleSubmit">保存</van-button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, Ref, WritableComputedRef, watch } from 'vue';
import { Switch as VanSwitch, Toast, Slider as VanSlider, Collapse, CollapseItem } from 'vant';
import { useStore } from '@/store';
import { GlobalSettingData } from '@/common/types';
import { UPDATE_GLOBAL_SETTING } from '@/store/conf';
import { DEFAULT_GLOBAL_SETTING } from '@/conf/conf';

const store = useStore();
const globalData = computed(() => store.state.globalSetting);
const globalSetting: Ref<GlobalSettingData> = ref(DEFAULT_GLOBAL_SETTING);
const activeName = ref('');

const handleSubmit = () => {
  store.commit(UPDATE_GLOBAL_SETTING, globalSetting.value);
  Toast.success('保存成功');
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
