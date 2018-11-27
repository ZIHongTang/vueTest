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
        { text: "商品订购", color: "#00f"},{ text: "主商品变更", color: "#f00" },
        { text: "订购商品查询", color: "#0f0" },{ text: "客户资料查询", color: "#0ff" }
      ]
    };
  }
};
</script>
