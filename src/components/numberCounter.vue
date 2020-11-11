<template>
  <p>
    {{ base }}
  </p>
</template>

<script>
export default {
  name: "NumberCounter",
  components: {
    
  },
  props: [
    "number",
  ],
  data: function() {
    return {
      step: 1,
      gapTime: 50,
      base: 0,
    }
  },
  computed: {
    // displayNum () {
    //   const vm = this;
    //   return vm.number ? vm.number : 0;
    // }
  },
  watch: {
    number : {
      handler (newVal) {
        const vm = this;
        if (newVal !== 0 && newVal !== undefined) {
          vm.counting()
        }
      }
    }
  },
  methods: {
    counting () {
      const vm = this;
      // let id = setInterval(function () {
      //   vm.base += vm.step;
      //   if (vm.base === vm.number) {
      //     window.clearInterval(id);
      //   }
      // }, vm.gapTime);

      let interval = 30;
      // 會減慢速度的累加
      function timer () {
        vm.base += vm.step;
        if (vm.base >= vm.number / 5 && vm.base < vm.number / 5 * 2) {
          interval = interval * 1.1;
        }
        if (vm.base >= vm.number / 5 * 2) {
          interval = interval * 1.13;
        }
        if (vm.base >= vm.number) {
          return;          
        }
        if (interval <= 50000 ) {
          setTimeout(timer, interval);
        }
      }
      timer();
    }

  },
  mounted () {
    // const vm = this;
    // if (vm.number !== 0 && vm.number !== undefined){
    //   vm.counting();
    // }

  }




};
</script>

<style lang="scss">
</style>