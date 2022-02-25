export interface PropType {
  [key: number | string]: any
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
  networkUrl?: string,
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
    row: number,
    column: number,
    scale: number
  };
  searchBar: {
    radius: number,
    positionY: number
  };
  view: {
    scale: number
  }
}
