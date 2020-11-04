<template>
  <div class="p-setting p-wrapper">
    <div class="l-left l-container">
      <div class="l-area">
        <h3>Alarm</h3>
        <div class="l-wrapper l-alarm-setting">
          <label 
            class="c-setting__input" 
            @click="toggleAlarmStatus(true)"
            :class="{'checked':currentSetting.alarm}">
            <div class="c-setting__check">
            </div>
            On
          </label>
          <label 
            class="c-setting__input" 
            @click="toggleAlarmStatus(false)"
            :class="{'checked':!currentSetting.alarm}">
            <div class="c-setting__check">
            </div>
            Off
          </label>
        </div>
        
      </div>
      <div class="l-area">
        <h3>Duration</h3>
        <div class="l-wrapper l-duration-setting">
          <div class="c-duration__text s--work">
            <h4>Work</h4>
            <span>25</span>
          </div>  
          <div class="c-duration__text s--rest">
            <h4>Rest</h4>
            <span>5</span>
          </div>   
        </div>
      </div>
    </div>
    <div class="l-right l-container">
      <h3>Ringtone</h3>
      <ul class="l-wrapper l-ringtone-list">
        <ringtone 
          v-for="(item, index) in ringtoneMap" 
          :key="item.path"
          :ringtoneObj="item"
          @click.native="select(item)"
          :ref="'ringtones' + index"
        >
          <template v-slot:title>
            <span>Music {{ index + 1 }}</span>
          </template>
        </ringtone>
      </ul>
    </div>   
  </div>
</template>

<script>
import ringtone from "../components/ringtone.vue";

export default {
  name: 'Settingpage',
  components: {
    ringtone,
  },
  data () {
    return {
      ringtoneMap: [
        {
          name: 'crowd-applause',
          path: '/ringtone/crowd-applause.wav',
        },
        {
          name: 'door-bell',
          path: '/ringtone/door-bell.mp3',
        },
        {
          name: 'retro-game-alarm',
          path: '/ringtone/retro-game-alarm.wav',
        }, {
          name: 'tinkle',
          path: '/ringtone/tinkle.mp3',
        },
      ],
      ringtones: [],
      currentSetting: {},
    }
  },
  computed : {

  },
  methods: {
    select (item) {
      const vm = this;
      vm.ringtones.forEach(function (tone) {
        let toneObj = tone.ringtoneObj;
        if (toneObj.path === item.path) {
          if (tone.isPlaying) {
            tone.reset();
            tone.pause();
          } else {
            tone.isCurrent = true;
            vm.currentSetting.ringtone = toneObj;
            tone.play();
          }
        }
        else {
          tone.isCurrent = false;
          tone.reset();
          tone.pause();
        }
        vm.setSettingStorage(vm.currentSetting);
      })
    },
    getActiveTone () {
      const vm = this;
      vm.ringtones.forEach(function (tone) {
        let toneObj = tone.ringtoneObj;
        if (toneObj.name === vm.currentSetting.ringtone) {
          tone.isCurrent = true;
        }
      })
    },
    toggleAlarmStatus (bool) {
      const vm = this;
      vm.setSettingStorage({
        work: vm.currentSetting.work,
        rest: vm.currentSetting.rest,
        alarm: bool,
        ringtone: vm.currentSetting.ringtone,
      });
      vm.currentSetting = vm.getSettingFromStorage();
    },
    playRingtone () {

    },
    getRingtones () {
      let arr = [];
      let obj = this.$refs;
      for(let key in obj) {
        arr.push(obj[key][0]);
      }
      return arr;
    }
  },
  mounted () {
    const vm = this;
    vm.ringtones = vm.getRingtones();
    vm.currentSetting = vm.getSettingFromStorage();
    vm.getActiveTone();
  },

}
</script>

<style lang="scss">

</style>