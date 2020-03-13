<template>
  <div class="progress">
    <div class="progress__value" :style="containerStyle"></div>
  </div>
</template>

<script>
export default {
  name: "progress-bar",
  props:{
    value: {
      type: String,
      default: '0%'
    },
    height: {
      type: String,
      default: '4px'
    },
    color: {
      type: String,
      default: 'rgba(221, 221, 221, 1)'
    }
  },
  data(){
    return {
      progress: null
    }
  },
  mounted(){
    this.progress = document.querySelector('.progress');
  },
  computed:{
    containerStyle(){
      let that = this;
      return {
        height: that.height,
        backgroundColor: that.color,
        width: that.value,
        display: that.value == '100%' ? 'none' : ''
      }
    }
  },
  watch:{
    value(val){
      this.value = val;
    }
  }
};
</script>

<style scoped>
.progress{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
}
</style>
