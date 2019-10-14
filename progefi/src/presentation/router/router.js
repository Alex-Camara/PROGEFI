import Vue from "vue";
import Router from "vue-router";
import UIShowDataCards from "../components/UIShowDataCards.vue";
import UIAddDataCard from "../components/UIAddDataCard.vue";
import UIUploadImage from "../components/UIAddDataCard/UIUploadImage";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "UIShowDataCards",
      name: "UIShowDataCards",
      component: UIShowDataCards
    },
    {
      path: "UIAddDataCard",
      name: "UIAddDataCard",
      component: UIAddDataCard
    },
    {
      path: "UIUploadImage",
      name: "UIUploadImage",
      component: UIUploadImage
    }
  ]
});
