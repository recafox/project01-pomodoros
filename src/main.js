import Vue from 'vue';
import App from './App.vue';
import router from './router/index';

Vue.config.productionTip = false

// event bus
Vue.prototype.$bus = new Vue();
const listStorage = "pomodorosList";
const currentItemStorage = "pomodorosCurrentItem";
const settingStorage = "pomodorosSetting";
// const settingStorage = "pomodorosSetting";
// 全域方法
// listItem:
// listItem: {
//   timestamp: 0,
//   content: "",
//   current: {
//      isCurrent: false,
//      remainTime: 0,
//      isCounting: false,
//    }
//   finish: {
//     status: false,
//     timestamp: 0,
//     workedTime: 0,
//   },

// }
Vue.prototype.getListFromStorage = function () {
  return JSON.parse(localStorage.getItem(listStorage));
}

Vue.prototype.setListStorage = function(arr) {
  localStorage.setItem(listStorage, JSON.stringify(arr));
}

Vue.prototype.getCurrentItemFromStorage = function () {
  return JSON.parse(localStorage.getItem(currentItemStorage));
}

Vue.prototype.setCurrentItemStorage = function (item) {
  localStorage.setItem(currentItemStorage, JSON.stringify(item));
}

Vue.prototype.removeCurrentItemFromStorage = function () {
  localStorage.removeItem(currentItemStorage);
}

Vue.prototype.isTheSame = function(item1, item2) {
  return item1.timestamp === item2.timestamp;
}

Vue.prototype.getSettingFromStorage = function () {
  return JSON.parse(localStorage.getItem(settingStorage));
}

Vue.prototype.setSettingStorage = function (setting) {
  localStorage.setItem(settingStorage, JSON.stringify(setting));
}




new Vue({
  router,
  render: h => h(App),
}).$mount('#app');



// setting (work time, rest time, alarm)
