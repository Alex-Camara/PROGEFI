import Vue from 'vue'
import Router from 'vue-router'
import UIShowDataCards from '../views/UIShowDataCards.vue'
import UICreateDataCard from '../views/UICreateDataCard.vue'
import UIUploadImage from '../views/UICreateDataCard/UIUploadImage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: 'UIShowDataCards',
      name: 'UIShowDataCards',
      component: UIShowDataCards
    },
    {
      path: 'UICreateDataCard',
      name: 'UICreateDataCard',
      component: UICreateDataCard
    },
    {
      path: 'UIUploadImage',
      name: 'UIUploadImage',
      component: UIUploadImage
    }
  ]
})
