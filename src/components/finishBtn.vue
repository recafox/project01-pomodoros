<template>
  <button @click="toggleFinishStatus"></button>
</template>

<script>
export default {
  name: "finishBtn",
  components: {
  },
  props: [
    "item"
  ],
  data() {
    return {
      tempItem: {},
    }
  },
  watch: {

  },
  methods: {
    toggleFinishStatus() {

    },
  },
  mounted() {

  }

}
</script>

<style lang="scss">
</style>