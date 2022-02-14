/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Window {
  jsonCallBack: any
}
declare module '@ckpack/vue-color' {
  import { Chrome } from '@ckpack/vue-color';
  export const Chrome: WithInstall<DefineComponent<{}>>;
}
