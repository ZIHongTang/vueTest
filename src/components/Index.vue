<template>
  <div class="menus">
    <div class="menu" v-for="(menu,idx) in menus" :key="idx" :style="{background:menu.color}">
      {{ menu.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  props: {
    menus: Array
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.menus{
  display: flex;
  flex-flow: row wrap;
  color:#fff;
  font-size: .5rem;
  .menu{
    flex: 0 0 44%;
    margin:.2rem 3%;
    height: 1rem;
    line-height: 1rem;
    border-radius: .1rem;
  }
}
</style>
