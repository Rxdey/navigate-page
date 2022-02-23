export interface PropType {
  [key: number | string]: any
}

export interface ShortcutData {
  id?: string| number;
  logoBg?: string;
  logoBgColor?: string;
  logoColor: string;
  logoLabel?: string;
  logoLabelSize: number;
  sitName?: string;
  sitUrl?: string;
}

export interface LayoutSettingData {
  id?: number | string,
  bg?: string,
  color?: string,
  networkUrl?: string,
  displayMode?: string
}
