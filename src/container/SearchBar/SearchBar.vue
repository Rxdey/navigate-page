<template>
  <section class="search-bar">
    <div class="search-bar--wrap">
      <div class="search-bar__icon">
        <van-icon name="edit" size=".507rem" />
      </div>
      <div class="search-bar__content">
        <input type="search" v-model="searchValue" autocomplete="off" name="search" class="custom-input" placeholder="开始吧✨✨~" @blur="onBlur" @focus="onFocus" @input="onInput" @keypress.enter="handleSearch(searchValue)" />
      </div>
      <div class="search-bar__clear" @click="clearSearchValue">
        <van-icon name="cross" size=".507rem" v-show="showClear" />
      </div>
    </div>
    <!-- 候选词 -->
    <div class="search-drop">
      <ul class="search-list">
        <li class="search-list__item" v-for="(item, i) in searchList" :key="i" @click.stop="handleSearch(item)">{{ item }}</li>
      </ul>
    </div>
    <!-- 选择搜索引擎 -->
    <div class="search-drop" v-if="showEngine">
      <div class="engine">

        <div class="engine--item" v-for="(engine, i) in searchEngineList" :key="i">
          <img class="engine__logo" :src="engine.logo" alt="">
          <p class="engine__label">{{ engine.label }}</p>
        </div>
        <div class="engine--item">
          <van-icon name="plus" size=".8rem" color="#C3C3C3" />
          <p class="engine__label">添加</p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, Ref, ComputedRef } from 'vue';
import { baidu } from '@/service/model';
import { useStore } from '@/store';
import { SearchEngine } from '@/common/types';

const store = useStore();
const searchValue = ref('');
// 上次搜索文本，防止多余搜索
const lastValue = ref('');
const showClear = ref(false);
const showEngine = ref(false);
const searchList: Ref<Array<string>> = ref([]);
// 全部搜索引擎
const searchEngineList: ComputedRef<SearchEngine[]> = computed(() => store.getters.getSearchEngineList);
// 默认搜索引擎
const defaultSearchEngine: ComputedRef<SearchEngine> = computed(() => store.getters.getDefaultSearchEngine);

// 获取百度候选词
const getWaitData = async () => {
  if (!searchValue.value || lastValue.value === searchValue.value) return;
  const res = await baidu.request({ wd: searchValue.value, p: 2, t: new Date().getTime() });
  lastValue.value = searchValue.value;
  if (!res.s || !res.s.length) return;
  searchList.value = res.s;
};

const onBlur = () => {
  showClear.value = Boolean(searchValue.value);
};
const onFocus = () => {
  showClear.value = Boolean(searchValue.value);
};
const onInput = () => {
  showClear.value = Boolean(searchValue.value);
  getWaitData();
};
const clearSearchValue = () => {
  searchValue.value = '';
  showClear.value = Boolean(searchValue.value);
  searchList.value = [];
};
const handleSearch = (item = '') => {
  if (item) searchValue.value = item;
  const { url } = defaultSearchEngine.value;
  if (!searchValue.value) return;
  window.location.href = `${url}${encodeURIComponent(searchValue.value)}`;
};
</script>

<style lang="less">
@import url("./index.less");
</style>
