<template>
  <h2>成绩管理</h2>
  <p>请选择操作</p>
  <button @click="addScore">添加成绩</button>
  <button @click="updateScore">更新成绩</button>
  <button @click="queryAllScores">查询所有成绩</button>

</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const addScore = () => {
  router.push('/score/add')
}
const updateScore = () => {
  router.push('/score/update')
}
const queryAllScores =() => {
  router.push('/score/queryAll')
}
</script>