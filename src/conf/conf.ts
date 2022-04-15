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
    row: 5,
    column: 3,
    scale: 1,
  },
  searchBar: {
    radius: 100,
    positionY: 20,
    width: 80,
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
    logo: 'https://www.baidu.com/favicon.ico',
    url: 'https://www.baidu.com/s?wd=',
    readonly: true,
  },
];
/**
 * indexedDB配置
 */
export const DATABASE_NAME = 'NAVIGATE';
