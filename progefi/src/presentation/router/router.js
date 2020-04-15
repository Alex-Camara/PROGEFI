import Vue from 'vue'
import Router from 'vue-router'
import UIShowDataCards from '../views/UIShowDataCards.vue'
import UIShowDatacard from '../views/UIShowDatacard.vue'
import UICreateDataCard from '../views/UICreateDataCard.vue'
import UIUploadImage from '../views/UICreateDataCard/UIUploadImage'
import UIShowCatalogues from '../views/UIShowCatalogues'
import UIShowCatalogue from '../views/UIShowCatalogue'
import UICreateCatalogue from '../views/UICreateCatalogue'
import UIShowCollections from '../views/UIShowCollections'
import UIShowTemplates from '../views/UIShowTemplates'
import UICreateTemplate from '../views/UICreateTemplate'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/UIShowDataCards',
    name: 'UIShowDataCards',
    component: UIShowDataCards,
    props: true
  },
  {
    path: '/UIShowDatacard',
    name: 'UIShowDatacard',
    component: UIShowDatacard,
    props: true
  },
  {
    path: '/UIShowCollections',
    name: 'UIShowCollections',
    component: UIShowCollections,
    props: true
  },
  {
    path: '/UICreateDataCard',
    name: 'UICreateDataCard',
    component: UICreateDataCard,
    props: true
  },
  {
    path: '/UIShowCatalogues',
    name: 'UIShowCatalogues',
    component: UIShowCatalogues,
    props: true
  },
  {
    path: '/UIShowCatalogue/:selectedCollection',
    name: 'UIShowCatalogue',
    component: UIShowCatalogue,
    props: true
  },
  {
    path: '/UICreateCatalogue',
    name: 'UICreateCatalogue',
    component: UICreateCatalogue,
    props: true
  },
  {
    path: '/UIShowTemplates',
    name: 'UIShowTemplates',
    component: UIShowTemplates,
    props: true
  },
  {
    path: '/UICreateTemplate',
    name: 'UICreateTemplate',
    component: UICreateTemplate,
    props: true
  },
  {
    path: '/UIUploadImage',
    name: 'UIUploadImage',
    component: UIUploadImage
  }
  ]
})