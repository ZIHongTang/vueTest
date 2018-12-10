<template>
  <header class="header">
    <h1>{{title}}</h1>
    <i class="cubeic-back" @click="back?back():backTop()"></i>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String,
    back: Function
  },
  methods: {
    backTop() {
      typeof ysp == "object"//判定是studio中
        || typeof yspUser == "object" //判定是android客户端
        || navigator.userAgent.indexOf('EnterPlorer')>-1//判定是ios客户端
        ?window.parent.parent.ysp.hideApiIframe():(location.hash = '#/');
    }
  }
};
</script>

<style scoped lang="less">
.header {
    position: relative;
    height: 44px;
    line-height: 44px;
    font-size: 18px;
    text-align: center;
    background-color: #218BF5;
    box-shadow: 0 1px 6px #ccc;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 5;
    color:#fff;
}
.cubeic-back {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 15px;
    &:before {
        content: "\E608";
    }
}
</style>