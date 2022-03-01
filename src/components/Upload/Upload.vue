<template>
  <div class="Upload">
    <input id="file" accept="image/*" type="file" name="file" ref="fileRef" @change="onChange" />
  </div>
</template>

<script setup lang="ts">
import { Toast } from 'vant';
import { ref, onMounted, computed, Ref, defineExpose, defineEmits, defineProps } from 'vue';

export interface UploadExpose {
  chooseImage: () => void;
}
const props = defineProps({
  blob: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
    default: 20000,
  },
});
const emit = defineEmits(['upload']);
const fileRef: Ref<HTMLInputElement | null> = ref(null);
const kbToSize = computed(() => {
  if (props.limit === 0) return '0 kB';
  const k = 1024; // or 1024
  const sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(props.limit) / Math.log(k));

  return `${(props.limit / (k ** i)).toPrecision(3)} ${sizes[i]}`;
});
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
  if (size > (1024 * props.limit) && props.limit !== 0) {
    Toast(`请上传小于${kbToSize.value}的图标`);
    return;
  }
  if (props.blob) {
    emit('upload', window.URL.createObjectURL(files[0]));
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
