<template>
  <div class="toolbar">
    <h1 class="toolbar__title"></h1>
    <span class="toolbar__pagetip">{{currentPage}}/{{totalPage}}</span>
    <ul class="toolbar__tools">
      <li class="toolbar__tools--item">
        <i class="iconfont icon-suofangda" @click="zoom"></i>
      </li>
      <li class="toolbar__tools--item">
        <i class="iconfont icon-suofangxiao" @click="shrink"></i>
      </li>
      <li class="toolbar__tools--item">
        <a class="toolbar__tools--download" :href="href" download target="_blank">
          <i class="iconfont icon-xiazai"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "toolbar",
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Number,
      default: 1
    },
    href: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  methods: {
    zoom(){
      this.$emit('zoom');
    },
    shrink(){
      this.$emit('shrink');
    }
  },
  components: {}
};
</script>

<style scoped>
.toolbar{
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(50, 54, 57, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.toolbar__tools{
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  position: absolute;
  right: 0;
  margin-right: 10px;
}
.toolbar__tools--item{
  margin-left: 20px;
  display: flex;
  align-items: center;
}
.toolbar__pagetip{
  justify-self: center;
}
.iconfont{
  font-size: 30px;
}
.icon-xiazai{
  font-size: 22px;
}
.toolbar__tools--download{
  color: #fff;
  text-decoration: none;
}
</style>
