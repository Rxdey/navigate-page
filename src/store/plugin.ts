import { Store } from 'vuex';
import localforage from 'localforage';
import { StateData } from './types';
import * as setting from './conf';

export const keepStateDataPlugin = (store: Store<StateData>) => {
  store.subscribe(({ type, payload }, state) => {
    const typeList = Object.keys(setting);
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
