import { Store } from 'vuex';
import localforage from 'localforage';
import { StateData } from './types';
import { UPDATE_LAYOUT_SETTING, UPDATE_SHORTCUT_LIST, UPDATE_GLOBAL_SETTING } from './conf';

export const keepStateDataPlugin = (store: Store<StateData>) => {
  store.subscribe(({ type, payload }, state) => {
    const typeList = [UPDATE_LAYOUT_SETTING, UPDATE_SHORTCUT_LIST, UPDATE_GLOBAL_SETTING];
    if (typeList.includes(type)) {
      console.log('触发更新');
      localforage.setItem(type, payload).catch((error) => {
        console.error(`${type}更新失败.`);
        console.error(error);
      });
    }
  });
};

export default keepStateDataPlugin;
