<template>
  <div class="p-home p-wrapper">
    <div class="l-timer">
      <div class="c-timer__pannel">
        <span>25</span>
        <span>:</span>
        <span>00</span>
      </div>
      <div class="c-timer__controller">
        <button class="controller__btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M8 5v14l11-7z"/></svg>
        </button>
        <div class="controller__progress">
          <div class="progress__bar"></div>
        </div>
      </div>
    </div>
    <div class="l-list">
      <div class="c-list--main list__item">
        <span class="list__mark">></span><span>The First Thing To DOThe First Thing To DO</span>
      </div>
    </div>   
  </div>
</template>

<script>

export default {
  name: 'Homepage',
  
}
</script>

<style lang="scss">

</style>