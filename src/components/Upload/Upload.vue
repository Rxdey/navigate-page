<template>
  <div class="Upload">
    <input id="file" accept="image/*" type="file" name="file" ref="fileRef" @change="onChange" />
  </div>
</template>

<script setup lang="ts">
import { Toast } from 'vant';
import { ref, onMounted, computed, Ref, defineExpose, defineEmits } from 'vue';

export interface UploadExpose {
  chooseImage: () => void;
}
const emit = defineEmits(['upload']);
const fileRef: Ref<HTMLInputElement | null> = ref(null);

const chooseImage = () => {
  if (!fileRef.value) return;
  fileRef.value.value = '';
  fileRef.value.files = null;
  fileRef.value.click();
};

const onChange = (e: Event) => {
  if (!e.target) return;
  const { files } = e.target as HTMLInputElement;
  if (!files) return;
  const { size } = files[0];
  if (size > 102400) {
    Toast('因本地存储问题，请上传小于100kb的图标');
    return;
  }
  const reader = new FileReader();
  reader.readAsDataURL(files[0]);
  reader.onload = () => {
    emit('upload', reader.result);
  };
};

defineExpose({ chooseImage });
</script>

<style lang="less">
#file {
  display: none;
}
</style>
