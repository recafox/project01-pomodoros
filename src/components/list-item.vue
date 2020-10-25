<template>
  <li class="list__item">
    <slot name="button"></slot>
    <slot name="assign"></slot>
    <slot name="content"></slot>
    <button 
      class="list__del"
      @click="deleteItem">
      DEL
    </button>
  </li>
</template>

<script>
export default {
  name: "DoList",
  props: [
    "item"
  ],
  methods: {
    deleteItem () {
      const vm = this;
      let allList = vm.getListFromStorage();
      allList.forEach(function(elem, id) {
        if (elem.timestamp === vm.item.timestamp) {
          allList.splice(id, 1);
        }
      });
      vm.updateStorageForList(allList);
      vm.callForUpdate();
    },
    callForUpdate () {
      const vm = this;
      vm.$emit("callForUpdate");
    }
  }

};
</script>

<style lang="scss">
</style>