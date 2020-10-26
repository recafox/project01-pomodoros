<template>
  <div class="l-timer">
    <div class="c-timer__pannel">
      <span>{{ minute }}</span>
      <span>:</span>
      <span>{{ second }}</span>
    </div>
    <div class="c-timer__controller">
      <button class="controller__btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M8 5v14l11-7z"/></svg>
      </button>
      <div class="controller__progress">
        <div class="progress__bar"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timer",
  components: {
    
  },
  props: [
    "time",
  ],
  data: function() {
    return {

    }
  },
  methods: {
    padZeroString (num) {
      return num < 10 ? `0${num}` : `${num}`;
    },
    start () {

    },
    pause () {

    },
    onOver () {

    },
  },
  computed: {
    minute () {
      const vm = this;
      let min = Math.floor(vm.time / 60);
      return vm.padZeroString(min);
    },
    second () {
      const vm = this;
      let sec = vm.time - (Math.floor((vm.time / 60)) * 60);
      return vm.padZeroString(sec);
    }
  },
  mounted() {
    
  }


};
</script>

<style lang="scss">
</style>