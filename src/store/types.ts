import { ShortcutData, LayoutSettingData, GlobalSettingData } from '@/common/types';

export interface StateData {
  shortcutList: ShortcutData[],
  layoutSetting: LayoutSettingData,
  globalSetting: GlobalSettingData
}
