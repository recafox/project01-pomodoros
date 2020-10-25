<template>
  <div>
    <input v-model="tempInput" @keyup.enter="addInput">
    <button class="list__add" @click="addInput">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "Input",
  components: {
    
  },
  props: [
    "list",
  ],
  data: function() {
    return {
      tempInput: "",
      limit: 15,
      tempItem: {
        timestamp: 0,
        content: "",
        current: false,
        countingStatus: {
          remainingRest: 0,
          remainingWork: 0,
        },
        finish: {
          status: false,
          timestamp: 0,
          workedTime: 0,
        },

      }
    }
  },
  methods: {
    addInput () {
      let vm = this;
      vm.tempItem.content = vm.tempInput;
      vm.tempItem.timestamp = new Date().getTime();
      let list = JSON.parse(JSON.stringify(vm.list));
      list.push(vm.tempItem);
      vm.setListStorage(list);
      vm.$bus.$emit("list:update");
      vm.tempInput = "";
    },

    validate () {

    },
  },
  mounted() {

  }


};
</script>

<style lang="scss">
</style>