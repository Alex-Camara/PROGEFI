import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import Buefy from "buefy";
import "@mdi/font/css/materialdesignicons.css";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import VueObserveVisibility from "vue-observe-visibility";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import modalHelper from "./helpers/modalHelper.vue";
import loadingHelper from "./helpers/loadingHelper.vue";

Vue.component("modal-helper", modalHelper);
Vue.component("loading-helper", loadingHelper);

library.add(faInfoCircle, faClock);

Vue.component("font-awesome-icon", FontAwesomeIcon);

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

Vue.use(VueObserveVisibility);

Vue.use(Buefy, {
  defaultIconPack: "mdi"
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
