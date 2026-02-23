import Home from '../views/Home.vue'
import Student from '../views/Student.vue'
import Score from '../views/Score.vue'
import Subject from '../views/Subject.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {path : '/', component : Home},
  {path : '/student', component : Student},
  {path : '/score', component : Score},
  {path : '/subject', component : Subject}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router