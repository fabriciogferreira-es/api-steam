import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import TesterView from '../views/TesterView.vue'
import PurchasedView from '../views/PurchasedView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Game',
      name: 'game',
      component: GameView
    },
    {
      path: '/Tester',
      name: 'tester',
      component: TesterView
    },
    {
      path: '/Purchased',
      name: 'purchased',
      component: PurchasedView
    }
  ]
})

export default router
