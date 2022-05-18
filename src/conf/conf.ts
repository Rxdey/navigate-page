import { LayoutSettingData, GlobalSettingData, SearchEngine } from '@/common/types';

/**
 * 初始化数据配置
 */
export const DEFAULT_LAYOUT_SETTING: LayoutSettingData = {
  displayMode: 'background-size:cover',
  bg: '',
  color: '',
  filter: 0,
  mask: 30,
};

export const DEFAULT_GLOBAL_SETTING: GlobalSettingData = {
  grid: {
    row: 2,
    column: 4,
    scale: 1,
    iconColor: '#fff',
    iconSize: 100, // 100 = 110
    iconRadius: 100,
    iconFontSize: 100, // 100 = 24
  },
  searchBar: {
    radius: 100,
    positionY: 20,
    width: 80,
    marginBottom: 50,
  },
  view: {
    scale: 1,
  },
  // 默认搜索引擎,
  defaultSearchEngine: 0,
};

export const DEFAULT_SEARCH_ENGINE_LIST: SearchEngine[] = [
  {
    label: '百度',
    logo: './icon/engine/baidu.ico',
    url: 'https://www.baidu.com/s?wd=',
    readonly: true,
  },
  {
    label: '谷歌',
    logo: './icon/engine/google.ico',
    url: 'https://www.google.com/search?q=',
    readonly: true,
  },
  {
    label: '必应',
    logo: './icon/engine/biying.ico',
    url: 'https://cn.bing.com/search?q=',
    readonly: true,
  },
];
export const DEFAULT_SETTING = {};
/**
 * indexedDB配置
 */
export const DATABASE_NAME = 'NAVIGATE';
