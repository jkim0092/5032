// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Form from '../components/Form.vue'
const WeatherCheck = () => import('../components/WeatherCheck.vue')

const routes = [
  { path: '/', name: 'home', component: Form },
  { path: '/WeatherCheck', name: 'weather', component: WeatherCheck },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

