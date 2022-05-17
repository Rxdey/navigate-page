import { InjectionKey, readonly } from 'vue';
import { createStore, useStore as vuexStore, Store } from 'vuex';
import { ShortcutData, LayoutSettingData, GlobalSettingData, PropType } from '@/common/types';
import { DEFAULT_LAYOUT_SETTING, DEFAULT_GLOBAL_SETTING, DEFAULT_SEARCH_ENGINE_LIST } from '@/conf/conf';

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
    searchEngineLsit: DEFAULT_SEARCH_ENGINE_LIST,
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
  actions: {
    // 设置默认搜索引擎
    SAVE_DEFAULT_SEARCH_ENGINE({ commit, state }, data = 0) {
      const { globalSetting } = state;
      const { defaultSearchEngine } = globalSetting;
      if (data === defaultSearchEngine) return;
      // globalSetting.defaultSearchEngine = data;
      const tempData = {
        ...globalSetting,
        defaultSearchEngine: data,
      };
      commit('UPDATE_GLOBAL_SETTING', tempData);
    },
    // 单个添加
    SAVE_SHORTCUT({ commit, state }, data: ShortcutData) {
      const shortcutList = JSON.parse(JSON.stringify(state.shortcutList));
      shortcutList.push(data);
      commit('UPDATE_SHORTCUT_LIST', shortcutList);
      return shortcutList;
    },
    // 单个删除
    DELETE_SHORTCUT_BY_INDEX({ commit, state }, index = -1) {
      if (index < 0) return false;
      const shortcutList = JSON.parse(JSON.stringify(state.shortcutList));
      shortcutList.splice(index, 1);
      commit('UPDATE_SHORTCUT_LIST', shortcutList);
      return shortcutList;
    },
  },
  getters: {
    getBgImage(state) {
      const { backgroundImage } = state;
      if (!backgroundImage) return '';
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
    getGlobalStyle(state) {
      // const { radius, positionY, width, marginBottom } = state.globalSetting.searchBar;
      const { searchBar, grid } = state.globalSetting;
      const { radius, positionY, width, marginBottom } = searchBar;
      const { row, column, scale, iconColor, iconRadius, iconSize, iconFontSize } = grid;
      const globalStyle: PropType<string> = {};
      // 搜索框
      globalStyle['--search-margin-top'] = `${positionY}%`;
      globalStyle['--search-radius'] = `${radius / 166.6}rem`;
      globalStyle['--search-width'] = `${width}%`;
      globalStyle['--search-bar-margin-bottom'] = `${marginBottom}px`;
      // 快捷导航
      globalStyle['--icon-label-color'] = iconColor;
      globalStyle['--icon-row'] = `${row}`;
      globalStyle['--icon-colum'] = `${column}`;
      globalStyle['--icon-radius'] = `${iconRadius / 2}%`;

      globalStyle['--icon-size'] = `${iconSize * 0.01467}rem`;
      globalStyle['--icon-font-size'] = `${(iconFontSize || 100) * 0.00347}rem`;
      return globalStyle;
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
    getSearchEngineList(state) {
      return state.searchEngineLsit;
    },
    getDefaultSearchEngine(state) {
      return state.searchEngineLsit[state.globalSetting.defaultSearchEngine || 0];
    },
  },
  plugins: [keepStateDataPlugin],
});

export const key: InjectionKey<Store<StateData>> = Symbol('');

export const useStore = () => vuexStore(key);

export default store;
