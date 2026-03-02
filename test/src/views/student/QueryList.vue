<template>
  <h2>查询所有学生</h2>

  <button @click="getAllStudents">加载全部学生</button>

  <hr />

  <div v-if="students.length">
    <div v-for="s in students" :key="s.ID">
      <p>学号：{{ s.Number }}</p>
      <p>姓名：{{ s.Name }}</p>
      <p>性别：{{ s.Gender == '1' ? '男' : '女' }}</p>
      <p>国籍：{{ s.Nationality }}</p>
      <hr />
    </div>
  </div>

  <p style="color:red">{{ message }}</p>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const students = ref([])
const message = ref('')

const getAllStudents = async () => {
  try {
    const res = await axios.post(
      'http://127.0.0.1:8080/student/queryList'
    )

    const data = res.data.data

    if (!data || data.length === 0) {
      message.value = '暂无学生数据'
      students.value = []
      return
    }

    students.value = data
    message.value = '查询成功'

  } catch (err) {
    console.error(err)
    message.value = '查询失败'
  }
}
</script>