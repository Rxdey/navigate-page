export interface PropType<T> {
  [key: string]: T
}
/**
 * 快捷导航
 *
 * @export
 * @interface ShortcutData
 */
export interface ShortcutData {
  logoBg?: string;
  logoBgColor?: string;
  logoColor: string;
  logoLabel?: string;
  logoLabelSize: number;
  sitName?: string;
  sitUrl?: string;
  logoUrl?: string;
  tag?: Array<number|string>
}
/**
 * 背景设置
 *
 * @export
 * @interface LayoutSettingData
 */
export interface LayoutSettingData {
  bg?: string,
  color?: string,
  displayMode?: string,
  filter?: number;
  mask?: number;
}
/**
 * 全局设置
 *
 * @export
 * @interface GlobalSettingData
 */
export interface GlobalSettingData {
  grid: {
    row: number;
    column: number;
    scale: number;
    iconColor: string;
    iconSize: number;
    iconRadius: number;
    iconFontSize: number;
  };
  searchBar: {
    radius: number;
    positionY: number;
    width: number;
    marginBottom?: number;
  };
  view: {
    scale: number;
  },
  defaultSearchEngine?: number;
}
/**
 *
 * 搜索引擎配置
 * @export
 * @interface SearchEngine
 */
export interface SearchEngine {
  label: string;
  logo?: string;
  url: string;
  readonly?: boolean;
}
