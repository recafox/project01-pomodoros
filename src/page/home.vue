<template>
  <div class="p-home p-wrapper">
    <timer 
      :time="remainTime"
      :currentStatus="currentStatus"
      @updateTime="updateCurrentTime"
      @countingOver="startNewRound"></timer>
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
      let remain = time;
      let obj = JSON.parse(JSON.stringify(vm.currentItem));
      obj.currentStatus = vm.currentStatus;
      obj.remainingTime = remain;
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
      console.log("start new round");
      const vm = this;
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

  }
  
}
</script>

<style lang="scss">

</style>