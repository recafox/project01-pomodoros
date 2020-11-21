<template>
  <div>
    <h3>To Do</h3>
    <div class="list__wrapper list--do">
      <ul>
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
              class="item__btn--play"
              @click="markCurrent(item)"
            >
              <svg class="icon--play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
              <svg class="icon--recording" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
            </button>
          </template>
          <template v-slot:content>
            <span class="item__text">{{ item.content }}</span>
          </template>
        </list-item>
      </ul> 
      <list-input 
        class="list__input"
        :list="list"
      >
      </list-input>
    </div>
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
      if (item.timestamp === vm.currentItem.timestamp) {
        vm.removeCurrentItemFromStorage();
      }

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
    markCurrent(item) {
      const vm = this;
      let clone = JSON.parse(JSON.stringify(item));
      clone.current = true;
      vm.setCurrentItemStorage(clone);
      vm.$bus.$emit("currentItem:update");
    },

  },
  mounted() {
    // let vm = this;
    // testing
   // localStorage.clear();
  }

}
</script>

<style lang="scss" scoped>

</style>