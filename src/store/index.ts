import { InjectionKey, readonly } from 'vue';
import { createStore, useStore as vuexStore, Store } from 'vuex';
import { ShortcutData, LayoutSettingData, GlobalSettingData, PropType } from '@/common/types';
import { DEFAULT_LAYOUT_SETTING, DEFAULT_GLOBAL_SETTING } from '@/conf/conf';

import { dataURLtoBlob } from '@/common/util';
import { StateData } from './types';
import { keepStateDataPlugin } from './plugin';

const store = createStore<StateData>({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    shortcutList: [],
    layoutSetting: DEFAULT_LAYOUT_SETTING, // 默认值
    globalSetting: DEFAULT_GLOBAL_SETTING,
    backgroundImage: '', // 图片单独存放防止重新渲染
  },
  mutations: {
    // XXXX_TEMP 临时存储作为预览，避免频繁访问本地存储
    UPDATE_LAYOUT_SETTING_TEMP(state, data: LayoutSettingData) {
      state.layoutSetting = data;
    },
    UPDATE_SHORTCUT_LIST_TEMP(state, data: ShortcutData[]) {
      state.shortcutList = data;
    },
    UPDATE_GLOBAL_SETTING_TEMP(state, data: GlobalSettingData) {
      state.globalSetting = data;
    },
    // 本地存储数据
    UPDATE_LAYOUT_SETTING(state, data: LayoutSettingData) {
      state.layoutSetting = data;
    },
    UPDATE_SHORTCUT_LIST(state, data: ShortcutData[]) {
      state.shortcutList = data;
    },
    UPDATE_GLOBAL_SETTING(state, data: GlobalSettingData) {
      state.globalSetting = data;
    },
    UPDATE_BACKGROUND_IMAGE(state, data: string) {
      state.backgroundImage = data;
    },
  },
  getters: {
    getBgImage(state) {
      const { backgroundImage } = state;
      if (!backgroundImage) return '';
      console.log(/^(http|https)/.test(backgroundImage));
      return /^(http|https)/.test(backgroundImage) ? backgroundImage : window.URL.createObjectURL(dataURLtoBlob(backgroundImage) || new Blob());
    },
    getLayoutStyle(state) {
      const { color, displayMode, filter, mask } = state.layoutSetting;
      let style: PropType<string> = {};
      style['--background-color'] = color || '';
      // style['--background-bg'] = `url('${networkUrl || window.URL.createObjectURL(dataURLtoBlob(bg) || new Blob())}')`;
      style['--background-filter'] = `${(filter || 0) * 0.2}px`;
      style['--background-mask'] = `${(mask || 0) * 0.01}`;
      style['--background-repeat'] = 'no-repeat';
      style['--background-size'] = 'cover';
      if (displayMode) {
        const arr = displayMode.split(';');
        const obj = arr.reduce((prev: PropType<string>, next: string) => {
          const keyList = next.split(':');
          // eslint-disable-next-line prefer-destructuring
          prev[`--${keyList[0]}`] = keyList[1];
          return prev;
        }, {});
        style = {
          ...style,
          ...obj,
        };
      }

      if (filter) style.transform = 'scale(1.04)';

      return style;
    },
    getSearchStyle(state) {
      const { radius, positionY, width } = state.globalSetting.searchBar;
      const searchStyle: PropType<string> = {};
      searchStyle['--search-margin-top'] = `${positionY}%`;
      searchStyle['--search-radius'] = `${radius / 166.6}rem`;
      searchStyle['--search-width'] = `${width}%`;
      return searchStyle;
    },
    getShortcutList(state) {
      const { shortcutList } = state;
      return shortcutList.map((item) => {
        const { logoBg } = item;
        const tempBg = logoBg ? window.URL.createObjectURL(dataURLtoBlob(logoBg) || new Blob()) : '';
        return {
          ...item,
          backgroundImage: tempBg || item.logoUrl || '',
        };
      });
    },
  },
  plugins: [keepStateDataPlugin],
});

export const key: InjectionKey<Store<StateData>> = Symbol('');

export const useStore = () => vuexStore(key);

export default store;
