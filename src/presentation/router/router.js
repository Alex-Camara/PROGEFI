import Vue from "vue";
import Router from "vue-router";
import UIShowDataCards from "../views/UIShowDataCards.vue";
import UIShowDatacard from "../views/UIShowDatacard.vue";
import UICreateDataCard from "../views/UICreateDataCard.vue";
import UIUploadImage from "../views/UICreateDataCard/UIUploadImage";
import UIShowCatalogues from "../views/UIShowCatalogues";
import UIShowCatalogue from "../views/UIShowCatalogue";
import UICreateCatalogue from "../views/UICreateCatalogue";
import UIShowCollections from "../views/UIShowCollection";
import UIShowTemplates from "../views/UIShowTemplates";
import UICreateTemplate from "../views/UICreateTemplate";
import UIShowTemplate from "../views/UIShowTemplate";
import UITrackDatacard from "../views/UITrackDatacard";
import UICreateCollection from "../views/UICreateCollection";
import UIUserAccount from "../views/UIUserAccount";
import App from "../App";
Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/App",
      name: "App",
      component: App
    },
    {
      path: "/UIShowDataCards",
      name: "UIShowDataCards",
      component: UIShowDataCards,
      props: true
    },
    {
      path: "/UIShowDatacard",
      name: "UIShowDatacard",
      component: UIShowDatacard,
      props: true
    },
    {
      path: "/UIShowCollections",
      name: "UIShowCollections",
      component: UIShowCollections,
      props: true
    },
    {
      path: "/UICreateCollection",
      name: "UICreateCollection",
      component: UICreateCollection,
      props: true
    },
    {
      path: "/UICreateDataCard",
      name: "UICreateDataCard",
      component: UICreateDataCard,
      props: true
    },
    {
      path: "/UIShowCatalogues",
      name: "UIShowCatalogues",
      component: UIShowCatalogues,
      props: true
    },
    {
      path: "/UIShowCatalogue/:selectedCollection",
      name: "UIShowCatalogue",
      component: UIShowCatalogue,
      props: true
    },
    {
      path: "/UICreateCatalogue",
      name: "UICreateCatalogue",
      component: UICreateCatalogue,
      props: true
    },
    {
      path: "/UIShowTemplates",
      name: "UIShowTemplates",
      component: UIShowTemplates,
      props: true
    },
    {
      path: "/UIShowTemplate",
      name: "UIShowTemplate",
      component: UIShowTemplate,
      props: true
    },
    {
      path: "/UICreateTemplate",
      name: "UICreateTemplate",
      component: UICreateTemplate,
      props: true
    },
    {
      path: "/UIUploadImage",
      name: "UIUploadImage",
      component: UIUploadImage
    },
    {
      path: "/UITrackDatacard",
      name: "UITrackDatacard",
      component: UITrackDatacard
    },
    {
      path: "/UIUserAccount",
      name: "UIUserAccount",
      component: UIUserAccount
    }
  ]
});
