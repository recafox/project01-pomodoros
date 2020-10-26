<template>
  <div class="p-home p-wrapper">
    <timer :time="remainTime"></timer>
    <div class="l-list">
      <div class="c-list--main list__item" v-if="currentItem">
        <span class="list__mark" v-if="currentItem">></span>{{ currentItem.content }}<span></span>
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
      currentWorkRound: 0,
      currentRestRound: 0,
    }
  },
  computed: {

  },
  methods: {

  },
  mounted () {
    const vm = this;
    vm.currentItem = vm.getCurrentItemFromStorage();
    vm.setting = vm.getSettingFromStorage();
    vm.remainTime = vm.currentItem.remainingTime;
    vm.currentStatus = vm.currentItem.currentStatus;

  }
  
}
</script>

<style lang="scss">

</style>