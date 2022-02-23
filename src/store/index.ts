import { InjectionKey } from 'vue';
import { createStore, useStore as vuexStore, Store } from 'vuex';
import { ShortcutData, LayoutSettingData } from '@/common/types';
import { rxLocalStorage } from '@/common/util';
import { LAYOUT_SETTING, SHORTCUT_LIST, DEFAULT_LAYOUT_SETTING } from '@/common/conf';
import { StateData } from './types';
import { keepStateDataPlugin } from './plugin';

const store = createStore<StateData>({
  state: {
    shortcutList: [],
    layoutSetting: DEFAULT_LAYOUT_SETTING, // 默认值
  },
  mutations: {
    // 初始化数据不经过持久化
    SAVE_LAYOUT_SETTING(state, data: LayoutSettingData) {
      state.layoutSetting = data;
    },
    UPDATE_LAYOUT_SETTING(state, data: LayoutSettingData) {
      state.layoutSetting = data;
    },
    SAVE_SHORTCUT_LIST(state, data: ShortcutData) {
      state.shortcutList.push(data);
    },
    UPDATE_SHORTCUT_LIST(state, data: ShortcutData) {
      state.shortcutList.push(data);
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [keepStateDataPlugin],
});

export const key: InjectionKey<Store<StateData>> = Symbol('');

export const useStore = () => vuexStore(key);

export default store;
