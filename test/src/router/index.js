import Home from '../views/Home.vue'
import Student from '../views/student/Student.vue'
import Score from '../views/score/Score.vue'
import Subject from '../views/subject/Subject.vue'
import Addstudent from '../views/student/Addstudent.vue'
import Updatestudent from '../views/student/Updatestudent.vue'
import QuerystudentbyID from '../views/student/QuerybyID.vue'  
import QuerystudentbyNumber from '../views/student/QuerybyNumber.vue'
import QuerystudentbyName from '../views/student/QuerybyName.vue'
import QueryList from '../views/student/QueryList.vue'

import AddScore from '../views/score/AddScore.vue'
import UpdateScore from '../views/score/UpdateScore.vue'
import QueryAllScores from '../views/score/QueryAllScores.vue'

import AddSubject from '../views/subject/AddSubject.vue'
import UpdateSubject from '../views/subject/UpdateSubject.vue'
import QueryAllSubjects from '../views/subject/QueryAllSubjects.vue'

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
  {path : '/score', component : Score},  {path : '/score/add', component : AddScore},
  {path : '/score/update', component : UpdateScore},
  {path : '/score/queryList', component : QueryAllScores},
  {path : '/subject', component : Subject},
  {path : '/subject/add', component : AddSubject},
  {path : '/subject/update', component : UpdateSubject},
  {path : '/subject/queryList', component : QueryAllSubjects}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router