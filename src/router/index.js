import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Projects from '../views/Projects.vue'
import TestLogin from '../views/TestLogin.vue'
import Team from '../views/Team.vue'
import VueFormulate from '../views/VueFormulate.vue'
import Planning from '../views/Planning.vue'
import Booking from '../views/Booking.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: TestLogin
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/planning',
    name: 'planning',
    component: Planning
  },
  {
    path: '/booking',
    name: 'booking',
    component: Booking
  },
  {
    path: '/formulaire',
    name: 'formulaire',
    component: VueFormulate
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/team',
    name: 'team',
    component: Team
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
