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
          <div class="c-duration__input s--work">
            <h4>Work</h4>
            <input type="text" value="25">
          </div>  
          <div class="c-duration__input s--rest">
            <h4>Rest</h4>
            <input type="text" value="5">
          </div>   
        </div>
      </div>
    </div>
    <div class="l-right l-container">
      <h3>Ringtone</h3>
      <ul class="l-wrapper l-ringtone-list">
        <li class="list__item">Music 1</li>
        <li class="list__item active">Music 2</li>
        <li class="list__item">Music 3</li>
      </ul>
    </div>   
  </div>
</template>

<script>

export default {
  name: 'Settingpage',
  
}
</script>

<style lang="scss">

</style>