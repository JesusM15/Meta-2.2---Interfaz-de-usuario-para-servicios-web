import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '../pages/index.vue'
import AboutPage from '../pages/about.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: IndexPage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
