import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import Buefy from "buefy";
import '@mdi/font/css/materialdesignicons.css';
import "./style/style.scss"; //Estilos personalizados

Vue.use(Buefy, {
  defaultIconPack: 'mdi'
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");