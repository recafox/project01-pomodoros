<template>
<div>
  <h3>Done</h3>
  <ul class="list__wrapper">
    <list-item 
      class="list__item--info"
      v-for="item in doneList"
      :key="item.timestamp"
      :item="item"
      :list="list"
      >
      <template v-slot:button>
        <button 
          class="item__btn item__btn--checked"
          @click="markUnfinish(item)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path stroke="#fff" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
        </button>
      </template>
      <template v-slot:content>
        <span class="item__text">{{ item.content }}</span>
      </template>
    </list-item>
  </ul> 
</div>
</template>

<script>
import listItem from "./list-item.vue";

export default {
  name: "DoneList",
  components: {
    listItem,
  },
  props: [
    "list"
  ],
  data () {
    return {
    }
  },
  computed: {
    doneList: function () {
      const vm = this;
      if (vm.list) {
        return vm.list.filter(item => item.finish.status === true);
      }
      return [];
    }
  },
  methods: {
    markUnfinish (item) {
      const vm = this;
      let listClone = JSON.parse(JSON.stringify(vm.list));
      item.finish.status = false;
      item.finish.timestamp = 0;
      listClone.forEach(function(elem, id) {
        if (vm.isTheSame(elem, item)) {
          listClone[id] = item;
        }
      })
      vm.setListStorage(listClone);
      vm.$bus.$emit("list:update");      
    }
  },
  mounted() {
  }

};
</script>

<style lang="scss">
</style>