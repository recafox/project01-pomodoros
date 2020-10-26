<template>
  <div id="app" class="container">
    <router-view/>
    <navbar></navbar>
  </div>
</template>

<script>
import Navbar from "./components/nav.vue";
export default {
  name: "Main",
  components: {
    Navbar,
  },
  created () {
    const vm = this;
    if (!vm.getSettingFromStorage()) {
      vm.setSettingStorage({
        work: 25,
        rest: 5,
      })
    }
  }
}


</script>

<style lang="scss">
@import "./assets/scss/all";


</style>
