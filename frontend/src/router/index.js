import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import TesterView from '../views/TesterView.vue'

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
    }
  ]
})

export default router
