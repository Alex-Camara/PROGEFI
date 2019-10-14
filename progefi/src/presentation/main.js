import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import Buefy from "buefy";
import '@mdi/font/css/materialdesignicons.css';
import "./style/style.scss"; //Estilos personalizados
import VueHead from 'vue-head'
import { Icon }  from 'leaflet'
import 'leaflet/dist/leaflet.css'
import VueObserveVisibility from 'vue-observe-visibility'
import axios from 'axios'
import VueAxios from 'vue-axios'

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
 
Vue.use(VueAxios, axios)
Vue.use(VueHead);
Vue.use(VueObserveVisibility);

Vue.use(Buefy, {
  defaultIconPack: 'mdi'
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");