<template>
  <div class="p-statistic p-wrapper">
    <div class="l-left l-container">
      <div class="l-area">
        <h3>Today</h3>
        <div class="l-wrapper l-counter">
          <div class="c-count s--todo">
            <h4>To Do</h4>
            <number-counter :number="10"></number-counter>
          </div>
          <div class="c-count s--done">
            <h4>Done</h4>
            <number-counter :number="5"></number-counter>
          </div>
        </div>
      </div>
      <div class="l-area">
        <h3>Week</h3>
        <div class="l-wrapper l-counter">
          <div class="c-count s--todo">
            <h4>To Do</h4>
            <number-counter :number="20"></number-counter>
          </div>
          <div class="c-count s--done">
            <h4>Done</h4>
            <number-counter :number="10"></number-counter>
          </div>
        </div>
      </div>
    </div>
    <div class="l-right l-container">
      <h3>Done</h3>
      <div class="l-wrapper">
        <bar-chart :date="'11/01'" :total="5" />
        <bar-chart :date="'11/02'" :total="3" />
        <bar-chart :date="'11/03'" :total="2" />
        <bar-chart :date="'11/04'" :total="1" />
        <bar-chart :date="'11/05'" :total="6" />
        <bar-chart :date="'11/06'" :total="7" />
        <bar-chart :date="'11/07'" :total="20" />
      </div>
    </div>   
  </div>
</template>

<script>
import NumberCounter from "../components/numberCounter.vue";
import BarChart from "../components/barChart.vue";

export default {
  name: 'Statisticpage',
  components: {
    NumberCounter,
    BarChart,
  },
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {
  }
  
}
</script>

<style lang="scss">

</style>