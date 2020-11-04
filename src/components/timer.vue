<template>
  <div class="l-timer">
    <div class="c-timer__pannel">
      <span>{{ minute }}</span>
      <span>:</span>
      <span>{{ second }}</span>
    </div>
    <div class="c-timer__controller">
      <button class="controller__btn start" @click="start" v-if="!isCounting">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M8 5v14l11-7z"/></svg>
      </button>
      <button class="controller__btn pause" @click="pause" v-else>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
      </button>
      <progress-bar 
        :total="totalTime" 
        :current="remainingTime"
        :currentStatus="currentStatus"
        :isCounting="isCounting"></progress-bar>
    </div>
  </div>
</template>

<script>
import ProgressBar from "./progressBar.vue";

export default {
  name: "Timer",
  components: {
    ProgressBar,
  },
  props: [
    "time",
    "currentStatus",
  ],
  data: function() {
    return {
      timerID: undefined,
      countdownTime: 0,
      isCounting: false,
    }
  },
  watch: {
    time : {
      handler: function (newVal) {
        const vm = this;
        vm.countdownTime = newVal;
      }
    }
  },
  methods: {
    padZeroString (num) {
      return num < 10 ? `0${num}` : `${num}`;
    },
    start () {
      const vm = this;
      vm.isCounting = true;
      vm.$emit('countingStart');
      vm.timerID = setInterval(function () {
        vm.countdownTime -= 1;

        if (vm.countdownTime <= 0) {
          vm.onOver();
        }
      }, 1000);
    },
    pause () {
      const vm = this;
      vm.isCounting = false;
      window.clearInterval(vm.timerID);
      vm.updateRemainingTime();
    },
    updateRemainingTime () {
      const vm = this;
      vm.$emit("updateTime", vm.countdownTime);
    },
    onOver () {
      const vm = this;
      vm.isCounting = false;
      window.clearInterval(vm.timerID);
      vm.$emit('countingOver');
    },
  },
  computed: {
    minute () {
      const vm = this;
      let min = Math.floor(vm.countdownTime / 60);
      return vm.padZeroString(min);
    },
    second () {
      const vm = this;
      let sec = vm.countdownTime - (Math.floor((vm.countdownTime / 60)) * 60);
      return vm.padZeroString(sec);
    },
    remainingTime () {
      const vm = this;
      return vm.totalTime - vm.countdownTime;
    },
    totalTime () {
      const vm = this;
      let setting = vm.getSettingFromStorage();
      return 60 * (vm.currentStatus === 'work' ? setting.work : setting.rest);
    }
  },
  mounted() {
    const vm = this;
    vm.countdownTime = vm.time;
    
  }


};
</script>

<style lang="scss">
</style>