import { Store } from 'vuex';
import { LAYOUT_SETTING, SHORTCUT_LIST } from '@/common/conf';
import { rxLocalStorage } from '@/common/util';
import useIndexedDb, { CreateStore } from '@/common/indexedDB';
import { LayoutSettingData, ShortcutData } from '@/common/types';
import { StateData } from './types';

export const keepStateDataPlugin = (store: Store<StateData>) => {
  store.subscribe(({ type, payload }, state) => {
    if (type === `UPDATE_${LAYOUT_SETTING}`) {
      // layout只有一条
      const layout: CreateStore<LayoutSettingData> = useIndexedDb.useStore('layout');
      layout.findAll().then((res) => {
        if (!payload.id) payload.id = 1;
        if (!res) {
          layout.add(payload);
          return;
        }
        layout.update(payload);
      });
    }
    if (type === `UPDATE_${SHORTCUT_LIST}`) {
      const shortcut: CreateStore<ShortcutData> = useIndexedDb.useStore('shortcut');
      if (!payload.id) payload.id = 1;
      shortcut.add(payload);
    }
  });
};

export default keepStateDataPlugin;
