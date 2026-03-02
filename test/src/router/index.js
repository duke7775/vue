import Home from '../views/Home.vue'
import Student from '../views/student/Student.vue'
import Score from '../views/Score.vue'
import Subject from '../views/Subject.vue'
import Addstudent from '../views/student/Addstudent.vue'
import Updatestudent from '../views/student/Updatestudent.vue'
import QuerystudentbyID from '../views/student/QuerybyID.vue'  
import QuerystudentbyNumber from '../views/student/QuerybyNumber.vue'
import QuerystudentbyName from '../views/student/QuerybyName.vue'
import QueryList from '../views/student/QueryList.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {path : '/', component : Home},
  {path : '/student', component : Student},
  {path : '/student/add', component : Addstudent},
  {path : '/student/update', component : Updatestudent},
  {path : '/student/queryByID', component : QuerystudentbyID},
  {path : '/student/queryByNumber', component : QuerystudentbyNumber},
  {path : '/student/queryByName', component : QuerystudentbyName},
  {path : '/student/queryList', component : QueryList},
  {path : '/score', component : Score},
  {path : '/subject', component : Subject}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router