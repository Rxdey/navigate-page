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
          <div class="shortcutMenu--main">
            <ul>
              <li class="shortcutMenu--main__item" v-for="(item, i) in currentList" :key="i">
                <div class="shortcutMenu--card">
                  <img class="card-logo" :src="item.logoUrl" :alt="item.sitName">
                  <p class="van-multi-ellipsis--l2">{{ item.sitName }}</p>
                  <div class="card-add-button van-hairline--surround" @click="onSubmit(item)">添加</div>
                </div>
              </li>
            </ul>
          </div>
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
import { Search as VanSearch, Toast } from 'vant';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '@/store';
import { shortcutMenuNavList, shortcutMenuList } from '@/conf/shortcutMenu';
import { UPDATE_SHORTCUT_LIST } from '@/store/conf';
import { ShortcutData } from '@/common/types';
import AddPaneVue from './AddPane.vue';

const store = useStore();
const searchValue = ref('');
const active = ref(1);
const switchPage = ref(false);
const currentList = computed(() => shortcutMenuList.filter((item) => item.tag?.includes(active.value)));
const onMenuChange = (data: typeof shortcutMenuNavList[number]) => {
  const { tag } = data;
  active.value = tag;
};

const onSwitchPage = () => {
  switchPage.value = !switchPage.value;
};
const onSearch = () => {

};
const onSubmit = async (item: ShortcutData) => {
  const res = await store.dispatch('SAVE_SHORTCUT', item);
  console.log(res);
  if (!res) {
    Toast.fail('添加失败，请重试');
  }
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
    &__item {
      padding: 8px 16px;
    }
  }

  &--card {
    padding: 16px;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, .5);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    p {
      margin-left: 16px;
      flex: 1;
    }

    .card-logo {
      width: 60px;
      height: 60px;
      border-radius: 100%;
    }

    .card-add-button {
      padding: 12px 24px;
      background-color: #fff;
      border-radius: 8px;
      font-size: var(--font-xs);
    }
  }
}
</style>
