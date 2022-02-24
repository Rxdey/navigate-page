import { InjectionKey } from 'vue';
import { createStore, useStore as vuexStore, Store } from 'vuex';
import { ShortcutData, LayoutSettingData } from '@/common/types';
import { DEFAULT_LAYOUT_SETTING, DATABASE_NAME } from '@/conf/conf';

import { StateData } from './types';
import { keepStateDataPlugin } from './plugin';

const store = createStore<StateData>({
  state: {
    shortcutList: [],
    layoutSetting: DEFAULT_LAYOUT_SETTING, // 默认值
  },
  mutations: {
    UPDATE_LAYOUT_SETTING(state, data: LayoutSettingData) {
      state.layoutSetting = data;
    },
    UPDATE_SHORTCUT_LIST(state, data: ShortcutData[]) {
      state.shortcutList = data;
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
