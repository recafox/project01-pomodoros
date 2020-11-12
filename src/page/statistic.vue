<template>
  <div class="p-statistic p-wrapper">
    <div class="l-left l-container">
      <div class="l-area">
        <h3>Today</h3>
        <div class="l-wrapper l-counter">
          <div class="c-count s--todo">
            <h4>To Do</h4>
            <number-counter :number="todayDoNumber"></number-counter>
          </div>
          <div class="c-count s--done">
            <h4>Done</h4>
            <number-counter :number="todayDoneNumber"></number-counter>
          </div>
        </div>
      </div>
      <div class="l-area">
        <h3>Week</h3>
        <div class="l-wrapper l-counter">
          <div class="c-count s--todo">
            <h4>To Do</h4>
            <number-counter :number="weeklyDoNumber"></number-counter>
          </div>
          <div class="c-count s--done">
            <h4>Done</h4>
            <number-counter :number="weeklyDoneNumber"></number-counter>
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
      data: {},
      today: [],
      weekly: [],
    }
  },
  computed: {
    todayDoneNumber () {
      const vm = this;
      return vm.today.filter(item => item.finish.status === true).length;
    },
    todayDoNumber () {
      const vm = this;
      return vm.today.filter(item => item.finish.status === false).length;
    },
    weeklyDoNumber () {
      const vm = this;
      return vm.weekly.filter(item => item.finish.status === false).length;
    },
    weeklyDoneNumber () {
      const vm = this;
      return vm.weekly.filter(item => item.finish.status === true).length;
    },
  },
  watch: {
    data: {
      deept: true,
      handler (newVal) {
        const vm = this;
        vm.today = newVal.filter(d => vm.ifIsToday(d.timestamp));
        vm.weekly =  newVal.filter(d => vm.ifThisWeek(d.timestamp));
      }
    }
  },
  methods: {
    ifIsToday (timestamp) {
      const vm = this;
      let todayStamp = vm.getTodayTimestamp();
      let tomorrowStamp = todayStamp + 86400000;
      return todayStamp <= timestamp && tomorrowStamp > timestamp;
    },
    ifThisWeek (timestamp) {
      const vm = this;
       // let todayStamp = vm.getTodayTimestamp();
      let time = new Date().toString();
      let todayWeek = time.split(' ')[0];
      let weekMap = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
      ]
      // get Monday
      let diff = 0;
      weekMap.forEach(function (item, index) {
        if (item === todayWeek) {
          diff = index;
        }
      })
      let mondayStamp = vm.getTodayTimestamp() - 86400000 * diff;
      // get Next monday
      let nextMonday = mondayStamp + 86400000 * 7 - 1;

      return mondayStamp <= timestamp && nextMonday > timestamp;
      
    },
    getTodayTimestamp () {
      let time = new Date();
      let date = time.getDate();
      let month = time.getMonth() + 1;
      let year = time.getFullYear();
      let str = `${year}-${padZero(month)}-${padZero(date)}`;

      function padZero (number) {
        return number < 10 ? number : `0${number}`;
      }

      return Date.parse(str);

    }
  },
  mounted () {
    const vm = this;
    vm.data = vm.getListFromStorage();

  }
  
}
</script>

<style lang="scss">

</style>