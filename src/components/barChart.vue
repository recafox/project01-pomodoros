<template>
  <div class="c-statistic__bar">
    <span class="c-statistic__text">{{ date }}</span>
    <div class="c-bar" :style="{'width': length + '%'}">
      <span class="c-bar__num">{{ total }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BarChart",
  components: {
    
  },
  props: [
    "total",
    "date",
  ],
  data: function() {
    return {

    }
  },
  computed: {
    length () {
      const vm = this;
      return vm.total * 2.5;
    }
  },
  watch: {

  },
  methods: {


  },




};
</script>

<style lang="scss">
</style>