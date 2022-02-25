import { LayoutSettingData, GlobalSettingData } from '@/common/types';

/**
 * 初始化数据配置
 */
export const DEFAULT_LAYOUT_SETTING: LayoutSettingData = {
  displayMode: 'background-size:cover',
  networkUrl: '',
  bg: '',
  color: '',
  filter: 0,
  mask: 30,
};
export const GLOBAL_SETTING: GlobalSettingData = {
  grid: {
    row: 5,
    column: 3,
    scale: 1,
  },
  searchBar: {
    radius: 50,
    positionY: 20,
    width: 80,
  },
  view: {
    scale: 1,
  },
};

/**
 * indexedDB配置
 */
export const DATABASE_NAME = 'NAVIGATE';
