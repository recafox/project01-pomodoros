<template>
  <div>
    <h3>To Do</h3>
    <ul class="list__wrapper">
      <list-item 
        class="list__item--success"
        v-for="item in doList"
        :key="item.timestamp"
        :class="{'--active':item.current}"
        :item="item"
        :list="list"
        >
        <template v-slot:button>
          <button 
            class="item__btn"
            @click="markFinish(item)"></button>
        </template>
        <template v-slot:assign>
          <button 
            class="item__btn item__btn--play"
            @click="markCurrent()"
          >
            <i class="fas fa-play"></i>
            <i class="fas fa-pause"></i>
          </button>
        </template>
        <template v-slot:content>
          <span class="item__text">{{ item.content }}</span>
        </template>
      </list-item>
      <list-input 
        class="list__input"
        :list="list"
      >
      </list-input>
    </ul> 
  </div>
</template>

<script>
import listItem from "./list-item.vue";
import listInput from "./input.vue";
export default {
  name: "DoList",
  components: {
    listItem,
    listInput,
  },
  props: [
    "list",
    "currentItem",
  ],
  data() {
    return {
      newCurrentItem: {},
    }
  },
  watch: {
  },
  computed: {
    doList: function() {
      const vm = this;
      if (vm.list) {
        return vm.list.filter(item => item.finish.status === false);
      }
      return [];
    }
  },
  methods: {
    markFinish(item) {
      const vm = this;
      let listClone = JSON.parse(JSON.stringify(vm.list));
      item.finish.status = true;
      let time = new Date();
      item.finish.timestamp = time.getTime();
      item.current = false;
      listClone.forEach(function(elem, id) {
        if (vm.isTheSame(elem, item)) {
          listClone[id] = item;
        }
      })
      vm.setListStorage(listClone);
      vm.$bus.$emit("list:update");
    },
    markCurrent() {

    },

  },
  mounted() {
    // let vm = this;
    // testing
   // localStorage.clear();
  }

}
</script>

<style lang="scss">
</style>