<template>
  <div class="layout">
    <van-cell-group title="背景图片">
      <div class="bg-wrap box-padding">
        <div class="bg-item">
          <div class="current-image image-inner">
            <div class="current-image__inner"></div>
          </div>
        </div>
        <div class="bg-item">
          <div class="current-image upload" @click="handleUplpad">
            <van-icon name="plus" size=".65rem" color="#C3C3C3" />
          </div>
        </div>
      </div>
    </van-cell-group>
    <van-cell-group title="展示方式">
      <div class="box-padding">
        <RadioTagVue :options="displayModeList" v-model="bgOpt.displayMode"/>
      </div>
    </van-cell-group>
    <Upload ref="uploadRef" @upload="onUpload" blob :limit="1540"></Upload>
  </div>
  <!-- 裁剪 -->
  <!-- <van-popup
    v-model:show="showPopup"
    position="bottom"
    :style="{ height: '100%'}"
    teleport="body"
  >
    <CropperVue v-if="showPopup" :image="tempImage" @close="showPopup = false"/>
  </van-popup>-->
</template>

<script setup lang="ts">
import { ref, onMounted, computed, Ref } from 'vue';
import { Popup as VanPopup } from 'vant';
import Upload, { UploadExpose } from '@/components/Upload/Upload.vue';
// import CropperVue from '@/components/Cropper/Cropper.vue';
import RadioTagVue from '@/components/RadioTag/RadioTag.vue';
import { LayoutSettingData } from '@/common/types';

const displayModeList = [
  { label: '填充', value: 'background-size:cover' },
  { label: '适应', value: 'background-size:contain' },
  { label: '平铺', value: 'background-size:contain;background-repeat:repeat' },
];

const bgOpt: Ref<LayoutSettingData> = ref({
  displayMode: 'background-size:cover',
});
const uploadRef = ref<InstanceType<typeof Upload> & UploadExpose>();
const showPopup = ref(false);
const tempImage = ref('');

const handleUplpad = () => {
  if (!uploadRef.value) return;
  uploadRef.value.chooseImage();
};
const onUpload = (blob: string) => {
  if (!blob) return;
  console.log(blob);
  tempImage.value = blob;
  showPopup.value = true;
};

</script>

<style lang="less">
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
}
</style>
