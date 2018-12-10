import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'amfe-flexible'
import Cube from 'cube-ui'
import VueResource from 'vue-resource';
Vue.config.productionTip = false;

Vue.use(Cube)
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
