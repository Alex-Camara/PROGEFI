import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import '@mdi/font/css/materialdesignicons.css';
import "../sass/mystyles.scss"; //Estilos personalizados

Vue.use(Buefy, {
  defaultIconPack: 'mdi'
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");