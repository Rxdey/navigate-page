<template>
  <section class="layout">
    <div class="layout-wrap">
      <van-cell-group title="自定义导航">
        <van-field label="网站地址" v-model="form.sitUrl" placeholder="请输入网站地址"></van-field>
        <van-field label="网站名称" v-model="form.sitName" placeholder="请输入网站名称"></van-field>
      </van-cell-group>
      <van-cell-group title="选择图标">
        <div class="logo-wrap">
          <div class="logo-prefix">
            <div class="image-inner border-radius16" @click="clearIcon">
              <div class="logo-inner" :style="{ backgroundColor: form.logoBgColor }">
                <div
                  class="logo-img"
                  :style="{ backgroundImage: form.logoBg ? `url(${form.logoBg})` : '' }"
                >
                  <span
                    :style="{ fontSize: `${form.logoLabelSize / 100}rem`, color: form.logoColor }"
                    v-if="!isSelectIcon"
                  >{{ form.logoLabel }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="logo-list">
            <div
              class="logo-inner image-inner"
              :class="{ selected: isSelectIcon }"
              @click="handleSelectIcon"
            >
              <div class="logo-img" :style="{ backgroundImage: tempIco ? `url(${tempIco})` : '' }"></div>
            </div>
            <div class="logo-label van-hairline--bottom" v-show="!isSelectIcon">
              <input v-model="form.logoLabel" type="text" placeholder="图标文字(可选)" />
            </div>
          </div>
          <div class="logo-after">
            <div class="logo-inner upload" @click="handleChooseImage">
              <van-icon name="plus" size=".65rem" color="#C3C3C3" />
            </div>
          </div>
        </div>
      </van-cell-group>
      <van-cell-group v-if="!isSelectIcon">
        <template #title>
          <div class="group-title">
            字体大小
            <span
              class="title-right font-color-picker"
              @click.stop="showFontColorPicker = !showFontColorPicker"
            ></span>
          </div>
        </template>

        <div class="slider">
          <div class="slider-wrap">
            <div class="slider-content">
              <van-slider
                v-model="form.logoLabelSize"
                :step="1"
                :max="100"
                :min="30"
                active-color="#333"
                button-size="0.4rem"
              />
            </div>
            <div>{{ form.logoLabelSize }}</div>
          </div>
          <div class="color-picker" v-show="showFontColorPicker" @click.stop>
            <Chrome v-model="tempFontColor" />
          </div>
        </div>
      </van-cell-group>
      <van-cell-group title="背景颜色">
        <div class="logo-color">
          <div class="color-list">
            <div class="color-item" v-for="(color, i) in colorList" :key="i">
              <div class="color-box image-inner">
                <span
                  class="color-inner"
                  :style="{ backgroundColor: color }"
                  @click="setColorActive(i)"
                >
                  <van-icon v-show="colorActive === i" class="color-checked" name="success" />
                </span>
              </div>
            </div>
            <div class="color-item">
              <div
                class="color-box image-inner picker"
                @click.stop="showColorPicker = !showColorPicker"
              >
                <span class="color-inner">
                  <van-icon v-show="tempActive" class="color-checked" name="success" />
                </span>
              </div>
            </div>
          </div>
          <div class="color-picker" v-show="showColorPicker" @click.stop>
            <Chrome v-model="tempColor" />
          </div>
        </div>
      </van-cell-group>
    </div>

    <div class="button-wrap">
      <van-button block round type="danger" @click="handleSubmit">添加</van-button>
    </div>

    <Upload ref="uploadRef" @upload="onUpload"></Upload>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, Ref } from 'vue';
import { Field as VanField, Slider as VanSlider, Toast } from 'vant';
import { Chrome } from '@ckpack/vue-color';
import Upload, { UploadExpose } from '@/components/Upload/Upload.vue';
import { ShortcutData } from '@/common/types';
import { useStore } from '@/store';

type TempColor = {
  rgba?: { r: number, g: number, b: number, a: number }
}
const store = useStore();
const form: Ref<ShortcutData> = ref({
  sitUrl: '',
  sitName: '',
  logoColor: 'rgba(255,255,255,1)',
  logoBg: '',
  logoBgColor: '',
  logoLabel: '',
  logoLabelSize: 37,
});
const colorList = ref([
  'rgba(0,0,0,0)',
  'rgba(240,105,91,1)',
  'rgba(91,242,210,1)',
  'rgba(246,82,172,1)',
  'rgba(238,216,78,1)',
  'rgba(86,214,234,1)',
]); // 快速选择色盘

const colorActive = ref(0);
const showColorPicker = ref(false);
const showFontColorPicker = ref(false);
const tempActive = ref(false);
const tempColor: Ref<string | TempColor> = ref({});
const tempFontColor: Ref<string | TempColor> = ref('rgba(255,255,255,1)');
const tempIco = ref('');
const isSelectIcon = ref(false);
const uploadRef = ref<InstanceType<typeof Upload> & UploadExpose>();

onMounted(() => {
  document.body.addEventListener('click', () => {
    showColorPicker.value = false;
    showFontColorPicker.value = false;
  });
});

// 选择图标
const handleSelectIcon = () => {
  if (!tempIco.value) return;
  isSelectIcon.value = true;
  form.value.logoBg = tempIco.value;
};
// 清除图标
const clearIcon = () => {
  form.value.logoBg = '';
  isSelectIcon.value = false;
};
// 选择颜色
const setColorActive = (active: number) => {
  colorActive.value = active;
  const color = colorList.value[colorActive.value];
  if (!color) return;
  form.value.logoBgColor = color;
  tempColor.value = color;
  if (tempActive.value) tempActive.value = false;
};
// 上传图片
const handleChooseImage = () => {
  if (!uploadRef.value) return;
  uploadRef.value.chooseImage();
};
const onUpload = (base64: string) => {
  if (!base64) return;
  tempIco.value = base64;
  handleSelectIcon();
};

const handleSubmit = () => {
  const { sitUrl, sitName, logoBg, logoBgColor, logoLabel } = form.value;
  if (!sitUrl) {
    Toast('请输入网站地址');
    return;
  }
  if (!sitName) {
    Toast('请输入网站名称');
    return;
  }
  if (!logoBg && !logoBgColor && !logoLabel) {
    Toast('请完善图标设置');
    return;
  }
  if (!/[http|https]:\/\//.test(form.value.sitUrl || '')) {
    form.value.sitUrl = `http://${form.value.sitUrl}`;
  }
  const { shortcutList } = store.state;
  shortcutList.push(form.value);
  store.commit('UPDATE_SHORTCUT_LIST', JSON.parse(JSON.stringify(shortcutList)));
  tempIco.value = '';
  clearIcon();
  colorActive.value = 0;
  tempActive.value = false;
  form.value = {
    sitUrl: '',
    sitName: '',
    logoColor: 'rgba(255,255,255,1)',
    logoBg: '',
    logoBgColor: '',
    logoLabel: '',
    logoLabelSize: 37,
  };
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
  form.value.logoBgColor = color;
  if (showColorPicker.value) {
    colorActive.value = -1;
    tempActive.value = true;
  }
});
watch(tempFontColor, (val) => {
  let color;
  if (typeof val === 'object') {
    const { rgba } = val;
    if (!rgba) return;
    const { r, g, b, a } = rgba;
    color = `rgba(${r}, ${g}, ${b}, ${a})`;
  } else {
    color = val;
  }
  form.value.logoColor = color;
  if (showColorPicker.value) {
    tempActive.value = true;
  }
});

</script>

<style lang="less">
@import url("../index.less");
:root {
  --logo-size: 90px;
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
  padding: 0 var(--box-padding);
  margin-bottom: 16px;
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
    color: #fff;
    font-weight: bold;
    line-height: var(--logo-size);
    font-size: var(--font-s);
    &.selected {
      box-shadow: 0 0 10px #009688;
    }
    .logo-img {
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
    }
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
    display: flex;
    flex-flow: row nowrap;
    .logo-label {
      flex: 1;
      align-items: center;
      margin-left: 16px;
      input {
        width: 100%;
        height: 100%;
        padding: 16px 32px;
        font-size: var(--font-s);
        border: none;
        outline: none;
      }
    }
  }
}

.logo-color {
  padding: 16px var(--box-padding);
  color: #969799;
  font-size: var(--font-s);
  position: relative;
  .color-list {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    .color-item {
      flex: 1;
      &:first-child {
        .color-checked {
          color: #333;
        }
      }
    }
    .color-box {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      overflow: hidden;
      &.picker .color-inner {
        background: url(image/color.png) no-repeat center;
        background-size: contain;
      }
    }
    .color-inner {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      background-color: #dddddd;
      cursor: pointer;
    }
    .color-checked {
      position: absolute;
      top: 50%;
      left: 50%;
      color: #fff;
      transform: translate(-50%, -50%);
      font-size: 40px;
    }
  }
  .color-picker {
    position: absolute;
    bottom: 80%;
    right: var(--box-padding);
    z-index: 1;
  }
}
</style>
