<template>
  <div class="cropper">
    <nav-bar title="编辑头像" left-text="返回" right-text="完成" left-arrow @click-right="handleSubmit" @click-left="emit('close')"></nav-bar>
    <div class="cropper-body">
      <img ref="image" :src="props.image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineProps, defineEmits, Ref } from 'vue';
import { NavBar } from 'vant';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';

let cropper: Cropper | null = null;
const emit = defineEmits(['close']);
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
    viewMode: 2,
    aspectRatio: 9 / 16,
    dragMode: 'crop',
    // guides: false,
    background: false,
    movable: true,
  });
});
const handleSubmit = () => {
  console.log(cropper);
};

</script>

<style lang="less">
.cropper {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #000;
  &-body {
    height: 100%;
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
