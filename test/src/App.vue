<script setup>
import { ref } from 'vue'
const result = ref('')
const sayHi = () => {
  result.value = 'hi'
  console.log('hi')
}
</script>

<template>
  <router-view />
  <h1>欢迎来到学生管理系统</h1>
  <button @click="sayHi">   点我</button>
  <p>{{ result }}</p>
  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
