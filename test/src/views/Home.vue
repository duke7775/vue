<template>
    <div>
        <h2>欢迎来到学生管理系统</h2>
        <p>请选择功能: </p>

        <button @click="router.push('/student')">学生管理</button>
        <button @click="router.push('/subject')">科目管理</button>
        <button @click="router.push('/score')">成绩管理</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>