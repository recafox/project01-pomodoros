<template>
  <div class="controller__progress">
    <div class="progress__bar" :style='{width: length + "%"}'></div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  components: {
    
  },
  props: [
    "total",
    "current",
  ],
  data: function() {
    return {

    }
  },
  computed: {
    length () {
      const vm = this;
      return vm.current * 100 / vm.total;
    },
  },
  watch: {

  },
  methods: {


  },




};
</script>

<style lang="scss">
</style>