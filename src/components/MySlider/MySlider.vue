<template>
  <div class="slider">
    <div class="slider-wrap">
      <div class="slider-content">
        <van-slider v-model="currentValue" v-bind="{ ...attrs }" @update:model-value="onChange" />
      </div>
      <div>{{ modelValue || 0 }}%</div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, watch, useAttrs, onBeforeMount } from 'vue';
import { Slider as VanSlider } from 'vant';

type Props = {
  modelValue?: number
}
const attrs = useAttrs();
const emit = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
});
const currentValue = ref(0);
const onChange = (val: number) => {
  emit('update:modelValue', val);
};
// slider的update:modelValue会比onMounted更早触发，因此在挂载前赋值
onBeforeMount(() => {
  currentValue.value = props.modelValue;
});

watch(() => props.modelValue, (val) => {
  currentValue.value = props.modelValue;
});

</script>

<style lang="less">
.slider {
  margin-bottom: 16px;
  padding: 0 var(--box-padding);
  font-size: var(--font-s);
  .slider-wrap {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
  .slider-content {
    flex: 1;
    width: 1px;
    padding: 0 50px 0 16px;
  }
  .color-picker {
    bottom: 0;
    position: absolute;
    z-index: 10;
    right: 72px;
  }
}
</style>
