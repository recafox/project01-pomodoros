<template>
  <div class="p-setting p-wrapper">
    <div class="l-left l-container">
      <div class="l-area">
        <h3>Alarm</h3>
        <div class="l-wrapper l-alarm-setting">
          <label class="c-setting__input checked">
            <input type="radio" name="alarm">
            <div class="c-setting__check">
            </div>
            On
          </label>
          <label class="c-setting__input">
            <input type="radio" name="alarm">
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
      <h3 @click="playRingtone">Ringtone</h3>
      <ul class="l-wrapper l-ringtone-list">
        <ringtone 
          v-for="(item, index) in ringtoneMap" 
          :key="item.path"
          :ringtoneObj="item">
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
        path: '/ringtone/tinkle.wav',
      }
    ]
    }
  },
  computed : {

  },
  methods: {
    playRingtone () {

    }
  },
  mounted () {
    // let music = this.music;
    // music = new Audio();
    // console.dir(music);
    // music.src = '/ringtone/crowd-applause.wav';
    // music.play();
  }
  
}
</script>

<style lang="scss">

</style>