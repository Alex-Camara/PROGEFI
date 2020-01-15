import Vue from "vue";
import Router from "vue-router";
import UIShowDataCards from "../components/UIShowDataCards.vue";
import UICreateDataCard from "../components/UICreateDataCard.vue";
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
      path: "UICreateDataCard",
      name: "UICreateDataCard",
      component: UICreateDataCard
    },
    {
      path: "UIUploadImage",
      name: "UIUploadImage",
      component: UIUploadImage
    }
  ]
});
