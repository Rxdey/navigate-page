export interface PropType {
  [key: number | string]: any
}

export interface ShortcutData {
  logoBg?: string;
  logoBgColor?: string;
  logoColor: string;
  logoLabel?: string;
  logoLabelSize: number;
  sitName?: string;
  sitUrl?: string;
}

export interface LayoutSettingData {
  bg?: string,
  networkUrl?: string,
  displayMode?: string
}
