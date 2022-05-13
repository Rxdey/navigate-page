import { ShortcutData, LayoutSettingData, GlobalSettingData, SearchEngine } from '@/common/types';

export interface StateData {
  shortcutList: ShortcutData[],
  layoutSetting: LayoutSettingData,
  globalSetting: GlobalSettingData,
  searchEngineLsit: SearchEngine[],
  backgroundImage: string
}
