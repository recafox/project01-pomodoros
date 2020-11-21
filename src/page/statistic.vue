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
        <bar-chart
          v-for="day in weekDay"
          :key="day.time"
          :date="day.dateStr"
          :total="day.total"
        ></bar-chart>
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
      weekDay: [],
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
      return vm.getWeekStart() <= timestamp && vm.getWeekEnd() > timestamp;
      
    },
    getWeekStart () {
      const vm = this;
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
      return mondayStamp;
    },
    getWeekEnd () {
      const vm = this;
      let weekStart = vm.getWeekStart();
      return weekStart + 86400000 * 7 - 1;
    },
    getTodayTimestamp (timestamp) {
      const vm = this;
      let time = timestamp ? new Date(timestamp) : new Date();
      let date = time.getDate();
      let month = time.getMonth() + 1;
      let year = time.getFullYear();
      let str = `${year}-${vm.padZero(month)}-${vm.padZero(date)}`;

      return Date.parse(str);
    },
    getThisWeek () {
      const vm = this;
      let weekStart = vm.getWeekStart();
      let weekDay = [];
      for (let i = 0; i < 7; i ++) {
        weekDay.push(weekStart + i*86400000);
      }
      return weekDay;
    },
    formatDay (timestamp) {
      const vm = this;
      let time = new Date(timestamp);
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return `${vm.padZero(parseInt(month))}/${vm.padZero(parseInt(day))}`;
    },
    padZero (number) {
      return parseInt(number) >= 10 ? parseInt(number) : `0${number}`;
    },
    ifThatDay(target, startStamp, endStamp) {
      return startStamp < target && endStamp > target;

    },
  },
  mounted () {
    const vm = this;
    vm.data = vm.getListFromStorage() ? vm.getListFromStorage() : [];
    let map = {};
    let arr = vm.getThisWeek();
    arr.forEach(function (item) {
      let time = new Date(item);
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let str = `${year}-${month}-${day}T00:00:00`;
      map[Date.parse(str)] = {
        total: 0
      }
    })
    vm.data.forEach(function (data) {
      for (let key in map) {
        if (parseInt(data.finish.timestamp) > parseInt(key) && parseInt(data.finish.timestamp) <= parseInt(key) + 86400000) {
          map[key].total ++;
        }
      }
    })
    for (let key in map) {
      map[key].dateStr = vm.formatDay(parseInt(key));
      vm.weekDay.push(map[key]);
    }
  }
  
}
</script>

<style lang="scss">

</style>