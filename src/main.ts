import { createApp } from 'vue';
import 'lib-flexible';
import router from './router';
import App from './App.vue';
import './assets/css/reset.less';
import './assets/css/common.less';
import './assets/css/public.less';

const app = createApp(App);
// router.beforeEach((to) => {
// });

app.use(router);
app.mount('#app');
