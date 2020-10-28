<template>
  <li class="list__item">
    <slot name="button"></slot>
    <slot name="assign"></slot>
    <slot name="content"></slot>
    <button 
      class="list__del"
      @click="deleteItem(item)">
      DEL
    </button>
  </li>
</template>

<script>
export default {
  name: "DoList",
  props: [
    "item",
    "list",
  ],
  methods: {
    deleteItem (item) {
      const vm = this;
      let listClone = JSON.parse(JSON.stringify(vm.list));
      let currentItem = vm.getCurrentItemFromStorage();
      if (currentItem && item.timestamp === currentItem.timestamp) {
        vm.removeCurrentItemFromStorage();
      }
      listClone.forEach(function(elem, id) {
        if (vm.isTheSame(elem, item)) {
          listClone.splice(id, 1);
        }
      });
      vm.setListStorage(listClone);
      vm.$bus.$emit("list:update");
    },
  }

};
</script>

<style lang="scss">
</style>