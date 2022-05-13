<template>
  <section class="layout">
    <template v-if="!switchPage">
      <van-search v-model="searchValue" placeholder="搜索网站" background="transparent" @search="onSearch" show-action>
        <template #action>
          <div @click="onSwitchPage" class="showAddPane">
            <van-icon name="edit" />
          </div>
        </template>
      </van-search>
      <div class="layout-wrap">
        <div class="shortcutMenu">
          <div class="shortcutMenu--aside">
            <div class="shortcutMenu--aside__item" :class="{ active: active === item.tag }" v-for="item in shortcutMenuNavList" :key="item.tag" @click="onMenuChange(item)">
              <van-icon v-if="item.icon" :name="item.icon"></van-icon>
              <span>{{ item.title }}</span>
            </div>
          </div>
          <div class="shortcutMenu--main"></div>
        </div>
      </div>
    </template>
    <template v-else>
      <AddPaneVue @onSwitch="onSwitchPage"></AddPaneVue>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Search as VanSearch } from 'vant';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '@/store';
import { shortcutMenuNavList, shortcutMenuList } from '@/conf/shortcutMenu';
import AddPaneVue from './AddPane.vue';

const searchValue = ref('');
const active = ref(1);
const switchPage = ref(false);

const onMenuChange = (data: typeof shortcutMenuNavList[number]) => {
  const { tag } = data;
  active.value = tag;
};

const onSwitchPage = () => {
  switchPage.value = !switchPage.value;
};
const onSearch = () => {

};
</script>

<style lang="less">
@import url('../../index.less');

.van-search__action:active {
  background-color: transparent;
}

.van-search__content {
  border-radius: 8px;
}

.showAddPane {
  background: var(--van-search-content-background-color);
  border-radius: 8px;
  color: #333;
  width: 70px;
  height: 100%;
  text-align: center;
  font-size: 40px;

}

.shortcutMenu {
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  padding: 0;

  &--aside {
    width: 220px;
    background-color: rgba(255, 255, 255, .5);
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    overflow: hidden;
    padding: 16px 8px;

    &__item {
      padding: 24px 16px;
      color: #999999;
      text-align: center;
      border-radius: 16px;

      &.active {
        color: #333333;
        background-color: rgba(153, 153, 153, .1);
      }
    }
  }

  &--main {
    flex: 1;
  }
}
</style>
