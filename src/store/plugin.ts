import { Store } from 'vuex';
import localforage from 'localforage';
import { StateData } from './types';
import * as setting from './conf';

export const keepStateDataPlugin = (store: Store<StateData>) => {
  store.subscribe(({ type, payload }, state) => {
    const typeList = Object.keys(setting);
    if (typeList.includes(type)) {
      // 处理proxy代理的数据
      if (Array.isArray(payload) || Object.prototype.toString.call(payload) === '[object Object]') {
        payload = JSON.parse(JSON.stringify(payload));
      }
      localforage.setItem(type, payload).catch((error) => {
        console.error(`${type}更新失败.`);
        console.error(error);
      });
    }
  });
};

export default keepStateDataPlugin;
