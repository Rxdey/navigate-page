export const LAYOUT_SETTING = 'LAYOUT_SETTING';
export const SHORTCUT_LIST = 'SHORTCUT_LIST';
/**
 * 初始化数据配置
 */

export const DEFAULT_LAYOUT_SETTING = {
  displayMode: 'background-size:cover',
  networkUrl: '',
  bg: '',
  color: '',
};
/**
 * indexedDB配置
 */
export const DATABASE_NAME = 'NAVIGATE';
export const DATABASE_VERSION = 1;
export const DATABASE_STORE = {
  layout: {
    keyPath: 'id', // 主键
    index: [] as string[], // 索引
  },
  shortcut: {
    keyPath: 'id', // 主键
    index: [] as string[], // 索引
  },
};
