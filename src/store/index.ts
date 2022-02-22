import { InjectionKey } from 'vue';
import { createStore, useStore as vuexStore, Store } from 'vuex';
import { ShortcutData, LayoutSettingData } from '@/common/types';
import { rxLocalStorage } from '@/common/util';
import { LAYOUT_SETTING, SHORTCUT_LIST } from '@/common/conf';
import { StateData } from './types';
import { keepStateDataPlugin } from './plugin';

const initState = () => {
  const sate: StateData = {
    shortcutList: [],
    layoutSetting: {},
  };

  const shortcutList = rxLocalStorage.getItem(SHORTCUT_LIST);
  sate.shortcutList = shortcutList ? JSON.parse(shortcutList) : [];
  const layoutSetting = rxLocalStorage.getItem(LAYOUT_SETTING);
  sate.layoutSetting = layoutSetting ? JSON.parse(layoutSetting) : {};
  return sate;
};
const store = createStore<StateData>({
  state: () => initState(),
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
