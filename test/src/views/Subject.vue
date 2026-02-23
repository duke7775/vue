<template>
  <h2>科目管理</h2>
  <p>请选择操作</p>
  <button @click="addSubject">添加科目</button>
  <button @click="updateSubject">更新科目</button>
  <button @click="queryAllSubjects">查询所有科目</button>

</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const addSubject = () => {
  router.push('/subject/add')
}
const updateSubject = () => {
  router.push('/subject/update')
}
const queryAllSubjects =() => {
  router.push('/subject/queryAll')
}
</script>