<template>
  <div class="AddPane">
    <van-cell-group title="自定义导航">
      <van-field label="网站地址" v-model="form.sitUrl" placeholder="请输入网站地址"></van-field>
      <van-field label="网站名称" v-model="form.sitName" placeholder="请输入网站名称"></van-field>
    </van-cell-group>
    <van-cell-group title="选择图标">
      <div class="logo-wrap">
        <div class="logo-prefix">
          <div class="logo-inner"></div>
        </div>
        <div class="logo-list">
          <div class="logo-inner"></div>
        </div>
        <div class="logo-after">
          <div class="logo-inner upload">
            <van-icon name="plus" size=".65rem" color="#C3C3C3" />
          </div>
        </div>
      </div>
      <div class="logo-tool">
        <div class="slider">
          <p class="slider-label">字体大小</p>
          <div class="slider-wrap">
            <div class="slider-content">
              <van-slider v-model="form.sitNameSize" :step="1" :max="60" :min="22" />
            </div>
            <div>{{ form.sitNameSize }}</div>
          </div>
        </div>
      </div>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Field as VanField, Slider as VanSlider } from 'vant';
import RxIcon from '@/components/RxIcon/RxIcon.vue';

const form = ref({
  sitUrl: '',
  sitName: '',
  sitNameSize: 28,
});

</script>

<style lang="less">
:root {
  --logo-size: 120px;
}
.line {
  content: "";
  position: absolute;
  height: 100%;
  top: 0;
  background: rgb(236, 238, 238);
  width: 1px;
  transform: scale(0.8);
}
.logo-wrap {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  padding: 8px 32px;
  .logo-inner {
    width: var(--logo-size);
    height: var(--logo-size);
    border-radius: 16px;
    overflow: hidden;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px solid #c3c3c3;
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

  .logo-prefix {
    padding-right: 16px;
    position: relative;
    &::after {
      right: 0;
      .line;
    }
  }
  .logo-after {
    padding-left: 16px;
    position: relative;
    &::before {
      left: 0;
      .line;
    }
  }
  .logo-list {
    flex: 1;
    min-width: 1px;
    padding: 0 16px;
  }
}
.slider {
  margin-bottom: 32px;
  padding: 0 32px;
  font-size: var(--font-s);
  .slider-label {
    margin-bottom: 32px;
    color: var(--van-field-label-color);
  }
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
}
</style>
