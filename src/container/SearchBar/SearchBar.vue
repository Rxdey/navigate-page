<template>
  <section
    class="search-bar"
  >
    <div class="search-bar--wrap">
      <div class="search-bar__icon">
        <van-icon name="edit" size=".507rem" />
      </div>
      <div class="search-bar__content">
        <input
          type="search"
          v-model="searchValue"
          autocomplete="off"
          name="search"
          class="custom-input"
          placeholder="开始吧✨✨~"
          @blur="onBlur"
          @focus="onFocus"
          @input="onInput"
        />
      </div>
      <div class="search-bar__clear" @click="clearSearchValue">
        <van-icon name="cross" size=".507rem" v-show="showClear" />
      </div>
    </div>
    <div class="search-drop">
      <ul class="search-list">
        <li
          class="search-list__item"
          v-for="(item, i) in searchList"
          :key="i"
          @click="handleSearch(item)"
        >{{ item }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, Ref } from 'vue';
import { baidu } from '@/service/model';
import { useStore } from '@/store';

const store = useStore();
const searchValue = ref('');
// 上次搜索文本，防止多余搜索
const lastValue = ref('');
const showClear = ref(false);
const searchList: Ref<Array<string>> = ref([]);

// 获取百度候选词
const getWaitData = async () => {
  if (!searchValue.value || lastValue.value === searchValue.value) return;
  const res = await baidu.request({ wd: searchValue.value, p: 2, t: new Date().getTime() });
  lastValue.value = searchValue.value;
  if (!res.s || !res.s.length) return;
  searchList.value = res.s;
};
const setClear = () => {
  showClear.value = Boolean(searchValue.value);
  searchList.value = [];
};
const onBlur = () => {
  setClear();
};
const onFocus = () => {
  setClear();
};
const onInput = () => {
  setClear();
  getWaitData();
};
const clearSearchValue = () => {
  searchValue.value = '';
  setClear();
};
const handleSearch = (item: string) => {
  searchValue.value = item;
};
</script>

<style lang="less">
@import url("./index.less");
</style>
