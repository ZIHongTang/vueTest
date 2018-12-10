import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/goodsorder",
      name: "goodsorder",
      component: () =>
        import(/* webpackChunkName: "openaccount" */ "./views/GoodsOrder.vue")
    },
    {
      path: "/openaccount",
      name: "openaccount",
      // route level code-splitting
      // this generates a separate chunk (openaccount.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "openaccount" */ "./views/OpenAccount.vue")
    }
  ]
});
