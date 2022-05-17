import { createApp } from 'vue';
import { Cell, CellGroup, Icon, Button } from 'vant';
import localforage from 'localforage';
import '@vant/touch-emulator';
import 'lib-flexible';
import { vLongpress } from '@nanogiants/vue3-longpress';
import RxIcon from '@/components/RxIcon/RxIcon.vue';
import MySlider from '@/components/MySlider/MySlider.vue';
import { DATABASE_NAME } from '@/conf/conf';
import store, { key } from './store';
import App from './App.vue';
import './assets/css/reset.less';
import './assets/css/common.less';
import './assets/css/public.less';

localforage.config({
  name: DATABASE_NAME,
  driver: localforage.INDEXEDDB,
  storeName: 'page-config',
});

const app = createApp(App);
app.component('RxIcon', RxIcon);
app.component('MySlider', MySlider);
app.component(CellGroup.name, CellGroup);
app.component(Cell.name, Cell);
app.component(Icon.name, Icon);
app.component(Button.name, Button);
app.directive('longpress', vLongpress);
app.use(store, key);
app.mount('body');
