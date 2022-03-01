<template>
  <div class="cropper">
    <nav-bar title="裁剪图片" left-text="返回" right-text="完成" left-arrow @click-right="handleSubmit" @click-left="emit('close')"></nav-bar>
    <div class="cropper-body">
      <img ref="image" :src="props.image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineProps, defineEmits, Ref } from 'vue';
import { NavBar, Toast } from 'vant';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';

let cropper: Cropper | null = null;
const emit = defineEmits(['close', 'submit']);
const props = defineProps({
  image: {
    type: String,
    default: '',
  },
});
const image: Ref<HTMLImageElement | null> = ref(null);

onMounted(() => {
  if (!image.value) return;
  cropper = new Cropper(image.value, {
    viewMode: 1,
    aspectRatio: 9 / 16,
    dragMode: 'move',
    // guides: false,
    background: false,
    movable: true,
  });
});
const handleSubmit = () => {
  // console.log(cropper);
  if (!cropper) {
    Toast.fail('裁剪图片失败');
    return;
  }
  emit('submit', cropper.getCroppedCanvas().toDataURL('image/jpeg', 0.8));
};

</script>

<style lang="less">
.cropper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
  display: flex;
  flex-flow: column;
  &-body {
    flex: 1;
    min-height: 100px;
    img {
      display: block;
      max-width: 100%;
    }
  }
  // .cropper-view-box,
  // .cropper-face {
  //   border-radius: 50%;
  // }
}
</style>
