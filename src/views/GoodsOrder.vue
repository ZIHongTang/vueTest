<template>
  <div>
    <Header title="商品订购"></Header>
    <div>test</div>
    <div @click="query">query</div>
  </div>
</template>

<script>
  import Header from "@/components/Header.vue";
  import api from "@/api/api.js";
  
  export default {
    name: "goodsorder",
    components: { Header },
    data() {
      return {
      }
    },
    methods: {
      query:function(){
        api.qryMainOfferList({keyWord:'4G'},function(obj){
          console.log('fn2 console',obj);
        });
      }
    }
  }
</script>