import Vue from 'vue';
import VueRouter from 'vue-router';

import Homepage from "../page/home.vue";
import Listpage from "../page/list.vue";
import Settingpage from "../page/setting.vue";
import Statisticpage from "../page/statistic.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/homepage',
  },
  {
    path: '/homepage',
    component: Homepage,
  },
  {
    path: '/list',
    component: Listpage,
  },
  {
    path: '/statistic',
    component: Statisticpage,
  },
  {
    path: '/setting',
    component: Settingpage,
  }
];

const router = new VueRouter({
  routes,
});

export default router;

