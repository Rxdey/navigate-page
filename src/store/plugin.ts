import { Store } from 'vuex';
import { LAYOUT_SETTING, SHORTCUT_LIST } from '@/common/conf';
import { rxLocalStorage } from '@/common/util';
import { StateData } from './types';

export const keepStateDataPlugin = (store: Store<StateData>) => {
  store.subscribe(({ type, payload }, state) => {
    const keepTypes = [`UPDATE_${LAYOUT_SETTING}`, `UPDATE_${SHORTCUT_LIST}`];
    if (keepTypes.includes(type)) {
      rxLocalStorage.setItem(type.replace('UPDATE_', ''), JSON.stringify(payload));
    }
  });
};

export default keepStateDataPlugin;
