<template>
  <li class="list__item" @click="togglePlayStatus">
    <button class="item__btn">
      <svg class="icon--play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="30px" height="30px"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
    </button>
    <slot name="title"></slot>
  </li>
</template>

<script>


export default {
  name: "Ringtone",
  components: {

  },
  props: [
    'ringtoneObj',
  ],
  data: function() {
    return {
      music: new Audio(),
      isPlaying: false,
    }
  },
  watch: {

  },
  methods: {
    togglePlayStatus () {
      const vm = this;
      if (vm.isPlaying) {
        vm.pause();
      } else {
        vm.play();
      }
    },
    play () {
      const vm = this;
      vm.isPlaying = true;
      vm.music.play();
    },
    pause () {
      const vm = this;
      vm.isPlaying = false;
      vm.music.pause();
    }
  },
  computed: {

  },
  mounted() {
    const vm = this;
    vm.music.src = vm.ringtoneObj.path;
    vm.music.name = vm.ringtoneObj.name;    
    
  }


};
</script>

<style lang="scss">
</style>