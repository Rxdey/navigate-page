<template>
  <section class="layout">
    <p class="tip">请注意，预览效果不会被保存，请手动保存</p>
    <div class="layout-wrap">
      <van-cell-group title="背景图片">
        <van-cell center title="网络图片">
          <template #right-icon>
            <van-switch v-model="checked" size="24" />
          </template>
        </van-cell>
        <van-field label="图片地址" v-model="backgroundImage" placeholder="请输入图片地址" v-if="checked"></van-field>
        <van-cell center title="开启裁剪模式" label="仅上传本地图片生效" v-show="!checked">
          <template #right-icon>
            <van-switch v-model="isCut" size="24" />
          </template>
        </van-cell>
        <p class="tip">请控制本地图片大小最好不要超过5兆</p>
        <div class="bg-wrap box-padding">
          <div class="bg-item">
            <div class="current-image image-inner">
              <div
                class="current-image__inner"
                :style="`background-color: ${layoutSetting.color};background-image:url(${currentBg});${layoutSetting.displayMode}`"
              ></div>
            </div>
          </div>
          <div class="bg-item" v-show="!checked">
            <div class="current-image upload" @click="handleUplpad">
              <van-icon name="plus" size=".65rem" color="#C3C3C3" />
            </div>
          </div>
        </div>
      </van-cell-group>
      <van-cell-group>
        <template #title>
          <div class="group-title">
            展示方式
            <span
              class="title-right font-color-picker"
              @click.stop="showFontColorPicker = !showFontColorPicker"
            ></span>
          </div>
        </template>
        <div class="box-padding">
          <RadioTagVue :options="displayModeList" v-model="layoutSetting.displayMode" />
        </div>
        <div class="picker-wrap" v-show="showFontColorPicker" @click.stop>
          <Chrome v-model="tempColor" />
        </div>
      </van-cell-group>
      <van-cell-group title="遮罩层">
        <my-slider
          v-model="layoutSetting.mask"
          :step="1"
          :max="100"
          :min="0"
          active-color="#333"
          button-size="0.4rem"
        />
      </van-cell-group>
      <van-cell-group title="背景模糊">
        <my-slider
          v-model="layoutSetting.filter"
          :step="1"
          :max="100"
          :min="0"
          active-color="#333"
          button-size="0.4rem"
        />
      </van-cell-group>
    </div>
    <div class="button-wrap">
      <van-button block round type="danger" @click="handleSubmit">保存</van-button>
    </div>
    <Upload ref="uploadRef" @upload="onUpload" :blob="isCut" :limit="0"></Upload>
  </section>
  <!-- 裁剪 -->
  <van-popup v-model:show="showPopup" position="bottom" :style="{ height: '100%' }" teleport="body">
    <CropperVue
      v-if="showPopup"
      :image="tempImage"
      @close="showPopup = false"
      @submit="onImageSubmit"
    />
  </van-popup>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, Ref, watch } from 'vue';
import { Popup as VanPopup, Switch as VanSwitch, Field as VanField, Toast } from 'vant';
import Upload, { UploadExpose } from '@/components/Upload/Upload.vue';
import CropperVue from '@/components/Cropper/Cropper.vue';
import RadioTagVue from '@/components/RadioTag/RadioTag.vue';
import { LayoutSettingData } from '@/common/types';
import { dataURLtoBlob } from '@/common/util';
import { Chrome } from '@ckpack/vue-color';
import { useStore } from '@/store';
import { DEFAULT_LAYOUT_SETTING } from '@/conf/conf';
import { UPDATE_LAYOUT_SETTING, UPDATE_BACKGROUND_IMAGE } from '@/store/conf';

type TempColor = {
  rgba?: { r: number, g: number, b: number, a: number }
}

const displayModeList = [
  { label: '填充', value: 'background-size:cover' },
  { label: '适应', value: 'background-size:contain' },
  { label: '平铺', value: 'background-size:contain;background-repeat:repeat' },
];

const store = useStore();
const layoutSetting: Ref<LayoutSettingData> = ref(DEFAULT_LAYOUT_SETTING);
const backgroundImage = ref('');
const uploadRef = ref<InstanceType<typeof Upload> & UploadExpose>();
const showPopup = ref(false);
const tempImage = ref('');
const checked = ref(false);
const isCut = ref(true);
const tempColor: Ref<string | TempColor> = ref({});
const showFontColorPicker = ref(false);

const currentBg = computed(() => (checked.value ? backgroundImage.value : window.URL.createObjectURL(dataURLtoBlob(backgroundImage.value) || new Blob())));

onMounted(() => {
  document.body.addEventListener('click', () => {
    showFontColorPicker.value = false;
  });
  layoutSetting.value = JSON.parse(JSON.stringify(store.state.layoutSetting));
  tempColor.value = layoutSetting.value.color || '';
  backgroundImage.value = store.state.backgroundImage;
  checked.value = /^(http|https)/.test(backgroundImage.value);
});

// 提交
const handleSubmit = () => {
  const saveData: LayoutSettingData = JSON.parse(JSON.stringify(layoutSetting.value));
  store.commit(UPDATE_LAYOUT_SETTING, saveData);
  store.commit(UPDATE_BACKGROUND_IMAGE, backgroundImage.value);
  Toast.success('保存成功');
};
// 上传图片
const handleUplpad = () => {
  if (!uploadRef.value) return;
  uploadRef.value.chooseImage();
};
const onUpload = (blob: string) => {
  if (!blob) return;
  if (!isCut.value) {
    store.commit(UPDATE_BACKGROUND_IMAGE, blob);
    backgroundImage.value = blob;
    return;
  }
  tempImage.value = blob;
  showPopup.value = true;
};
const onImageSubmit = (data: string) => {
  backgroundImage.value = data;
  store.commit(UPDATE_BACKGROUND_IMAGE, data);
  showPopup.value = false;
  // console.log(currentBg.value);
};
// 取色器格式不对，处理一下
watch(tempColor, (val) => {
  let color;
  if (typeof val === 'object') {
    const { rgba } = val;
    if (!rgba) return;
    const { r, g, b, a } = rgba;
    color = `rgba(${r}, ${g}, ${b}, ${a})`;
  } else {
    color = val;
  }
  layoutSetting.value.color = color;
});
watch(() => layoutSetting.value, (val) => {
  store.commit(`${UPDATE_LAYOUT_SETTING}_TEMP`, JSON.parse(JSON.stringify(val)));
}, { deep: true });
</script>

<style lang="less">
@import url("../index.less");
.bg-wrap {
  display: flex;
  flex-flow: row nowrap;
  .bg-item {
    margin-right: 16px;
  }
}
.current-image {
  width: 105px;
  height: 180px;
  border-radius: var(--border-radius);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &.upload {
    border-style: dashed;
    border: 1px dashed transparent;
    background: linear-gradient(white, white) padding-box,
      repeating-linear-gradient(
        -45deg,
        #ccc 0,
        #ccc 0.3em,
        white 0,
        white 0.52em
      );
  }
  &__inner {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
}
.picker-wrap {
  position: absolute;
  bottom: 80%;
  right: 80px;
  z-index: 1;
}
</style>
