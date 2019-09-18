import Vue from "vue";
import Router from "vue-router";
import UIShowDataCards from "./components/UIShowDataCards.vue";
import UIAddDataCard from "./components/UIAddDataCard.vue";
import UIAddDataCard1 from "./components/UIAddDataCard/UIAddDataCard1";

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
      path: "UIAddDataCard1",
      name: "UIAddDataCard1",
      component: UIAddDataCard1
    }
  ]
});
