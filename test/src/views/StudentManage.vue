<template>
  <h2>学生管理</h2>
  <p>请选择操作</p>
  <button @click="addStudent">添加学生</button>
  <button @click="updateStudent">修改学生信息</button>
  <button @click="queryById">按ID查询学生</button>
  <button @click="queryByNumber">按学号查询学生</button>
  <button @click="queryByName">按姓名查询学生</button>
  <button @click="queryAllStudents">查询所有学生</button>

</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const addStudent = () => {
  router.push('/student/add')
}
const updateStudent = () => {
  router.push('/student/update')
}

const queryById =() => {
  router.push('/student/queryById')
}
const queryByNumber =() => {
  router.push('/student/queryByNumber')
}
const queryByName =() => {
  router.push('/student/queryByName')
}
const queryAllStudents =() => {
  router.push('/student/queryAll')
}
</script>
