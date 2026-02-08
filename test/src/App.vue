<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
const result = ref('')
const sayHi = () => {
  result.value = 'hi'
  console.log('hi')
}
</script>

<template>
  <h1>Test</h1>
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
