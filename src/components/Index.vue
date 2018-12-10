<template>
  <div class="menus">
    <a class="menu" v-for="(menu,idx) in menus" :href="menu.link" :key="idx"
        :style="{background:menu.color}">
        {{ menu.text }}
    </a>
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
  font-size: .5rem;
  .menu{
    color:#fff;
    text-decoration: none;
    flex: 0 0 44%;
    margin:.2rem 3%;
    height: 1rem;
    line-height: 1rem;
    border-radius: .1rem;
  }
}
</style>