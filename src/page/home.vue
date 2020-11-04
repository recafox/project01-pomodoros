<template>
  <div class="p-home p-wrapper">
    <timer 
      :time="remainTime"
      :currentStatus="currentStatus"
      @updateTime="updateCurrentTime"
      @countingOver="startNewRound"
      @countingStart="countingStart"
      ref="timer"></timer>
    <div class="l-list">
      <div class="c-list--main list__item" v-if="!isEmpty">
        <span class="list__mark">></span>{{ currentItem.content }}<span></span>
      </div>
      <div class="c-list--main list__item" v-else>
        <span class="list__mark">></span><span>Start your day!</span>
      </div>
    </div>   
  </div>
</template>

<script>
import timer from "../components/timer.vue";

export default {
  name: 'Homepage',
  components: {
    timer,
  },
  data () {
    return {
      currentItem: {},
      setting: {

      },
      remainTime: 0,
      currentStatus: "work",
      alarmPlaying: false,
      ringtone: new Audio(),
    }
  },
  computed: {
    isEmpty () {
      const vm = this;
      return Object.keys(vm.currentItem).length === 0 && vm.currentItem.constructor === Object;
    },
  },
  watch: {
    currentItem: {
      deep: true,
      handler: function(newVal) {
        const vm = this;
        vm.currentStatus = newVal.currentStatus;
        vm.remainTime = newVal.remainingTime;
      }
    },
  },
  methods: {
    updateCurrentTime (time) {
      const vm = this;
      console.log('update current time', time);
      let obj = JSON.parse(JSON.stringify(vm.currentItem));
      obj.currentStatus = vm.currentStatus;
      obj.remainingTime = time;
      vm.setCurrentItemStorage(obj);

      let list = vm.getListFromStorage();
      list.forEach (function(elem, id) {
        if (vm.isTheSame(elem, obj)) {
          list[id] = obj;
        }
      });
      vm.setListStorage(list);
      vm.currentItem = vm.getCurrentItemFromStorage();
    },
    startNewRound () {
      const vm = this;
      let setting = vm.getSettingFromStorage();

      if (setting.alarm === true) {
        vm.ringtone.src = setting.ringtone.path;
        vm.playRingtone();
        setTimeout(function () {
          vm.stopRingtone();
        }, 5000);
      }

      let nextStatus = vm.currentStatus === "work" ? "rest" : "work";
      let obj = JSON.parse(JSON.stringify(vm.currentItem));
      obj.currentStatus = nextStatus;
      obj.remainingTime = 60 * (vm.setting[nextStatus]);
      if (vm.currentStatus === "work") {
        obj.workedTime += 60 * vm.setting.work;
      } else {
        obj.restedTime += 60 * vm.setting.work;
      }
      vm.updateCurrentItem(obj);
      vm.currentItem = vm.getCurrentItemFromStorage();
    },
    playRingtone () {
      const vm = this;
      vm.alarmPlaying = true;
      vm.ringtone.play();
    },
    stopRingtone () {
      const vm = this;
      vm.alarmPlaying = false;
      vm.ringtone.pause();
      vm.ringtone.currentTime = 0;
    },
    updateCurrentItem (item) {
      const vm = this;
      let list = vm.getListFromStorage();
      list.forEach (function(elem, id) {
        if (vm.isTheSame(elem, item)) {
          list[id] = item;
        }
      });
      vm.setCurrentItemStorage(item);
      vm.setListStorage(list);
    },
    countingStart () {
      const vm = this;
      if (vm.alarmPlaying) {
        vm.stopRingtone();
      }
    }
  },
  mounted () {
    const vm = this;
    if (!vm.getListFromStorage() || !vm.getCurrentItemFromStorage()) {
      return;
    }
    vm.currentItem = vm.getCurrentItemFromStorage();
    vm.setting = vm.getSettingFromStorage();
    vm.remainTime = vm.currentItem.remainingTime;
    vm.currentStatus = vm.currentItem.currentStatus;

  },
  beforeRouteLeave (to, from, next) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
    const vm = this;
    vm.updateCurrentTime (vm.$refs.timer.countdownTime)
    next();
    // const vm = this;
    // vm.updateCurrentTime();
  }

  
}
</script>

<style lang="scss">

</style>