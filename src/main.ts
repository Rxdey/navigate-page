import { createApp } from 'vue';
import { Cell, CellGroup, Icon, Button } from 'vant';
import 'lib-flexible';
import RxIcon from '@/components/RxIcon/RxIcon.vue';
// import router from './router';
import App from './App.vue';
import './assets/css/reset.less';
import './assets/css/common.less';
import './assets/css/public.less';

const app = createApp(App);
// router.beforeEach((to) => {
// });
app.component('RxIcon', RxIcon);
app.component(CellGroup.name, CellGroup);
app.component(Cell.name, Cell);
app.component(Icon.name, Icon);
app.component(Button.name, Button);
app.mount('#app');
