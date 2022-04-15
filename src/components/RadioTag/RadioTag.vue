<template>
  <div class="RadioTag">
    <div class="radio-child" :class="{checked: opt.value === props.modelValue}" v-for="(opt, i) in options" :key="i" @click="onChecked(opt)">{{opt.label}}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, PropType, withDefaults } from 'vue';

type Props = {
  options?: Array<{ label: string, value: string }>,
  modelValue?: string | number
}
const emit = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  modelValue: '',
});
const onChecked = (opt: { label: string, value: string }) => {
  const { value } = opt;
  emit('update:modelValue', value);
};
</script>

<style lang="less">
.RadioTag {
  .radio-child {
    display: inline-block;
    min-width: 100px;
    border-radius: 100px;
    text-align: center;
    padding: 4px 8px;
    border: 1px solid var(--color-gray);
    color: var(--color-gray);
    font-size: var(--font-s);
    margin-right: 16px;
    &.checked {
      color: var(--color-red);
      border-color: var(--color-red);
    }
  }
}
</style>
