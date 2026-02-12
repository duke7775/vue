import Home from '../views/Home.vue'
import StudentManage from '../views/StudentManage.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {path : '/', component : Home},
  {path : '/student', component : StudentManage}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router