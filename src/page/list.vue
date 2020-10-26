<template>
  <div class="p-list p-wrapper">
    <do-list 
      class="l-list"
      :list="list"
      :currentItem="currentItem"
      >
    </do-list>
    <done-list 
      class="l-list"
      :list="list"
      >
    </done-list>
  </div>
</template>

<script>

import doList from "../components/doList.vue";
import doneList from "../components/doneList.vue";
// listItem: {
//   timestamp: 0,
//   content: "",
//   current: {
//      isCurrent: false,
//      remainTime: 0,
//      isCounting: false,
//    },
//   finish: {
//     status: false,
//     timestamp: 0,
//     workeRound: 0,
//   },


// }
export default {
  name: 'Listpage',
  components: {
    doList,
    doneList,
  },
  data () {
    return {
      list: [],
      currentItem: {},
    }
  },
  computed: {
  },
  methods: {
    getList() {
      const vm = this;
      return vm.getListFromStorage();
    },
    getCurrentItem() {
      const vm = this;
      return vm.getCurrentItemFromStorage();
    },

  },
  mounted () {
    const vm = this;
    if (vm.getList()) {
      vm.list = vm.getList();
    }
    vm.currentItem = vm.getCurrentItem();
    vm.$bus.$on("list:update", function() {
      vm.list = vm.getListFromStorage();
    })
    vm.$bus.$on("currentItem:update", function() {
      vm.currentItem = vm.getCurrentItem();
      let listClone = JSON.parse(JSON.stringify(vm.list));
      listClone.forEach(function(elem, id) {
        elem.current = false;
        if (vm.isTheSame(elem, vm.currentItem)) {
          listClone.splice(id, 1);
        }
      });
      listClone.unshift(vm.currentItem);
      vm.setListStorage(listClone);
      vm.list = vm.getListFromStorage();
    })

  }
  
}
</script>

<style lang="scss">

</style>