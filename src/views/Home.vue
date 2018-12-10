<template>
  <div class="home">
    <Index :menus="menus" />
  </div>
</template>

<script>
// @ is an alias to /src
import Index from "@/components/Index.vue";

export default {
  name: "home",
  components: {
    Index
  },
  data() {
    return {
      menus: [
        {text:"入网开户",color:"#26f",link:'#/openaccount'},
        {text:"商品订购",color:"#c4f",link:'#/goodsorder'},
        {text:"主商品变更",color:"#f00",link:'#/mainchange'},
        {text:"订购商品查询",color:"#0f0",link:'#/'},
        {text:"客户资料查询",color:"#0ff",link:'#/'},
        {text:"客户资料查询",color:"#fff",link:'#/'}
      ]
    };
  }
};
</script>
