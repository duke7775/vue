<template>
  <h2>按姓名查询学生</h2>

  <div>
    <label>请输入姓名:</label>
    <input v-model="searchName" type="text" />
    <button @click="getStudentByName">查询</button>
  </div>

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

const searchName = ref('')
const students = ref([])
const message = ref('')

const getStudentByName = async () => {
  try {
    const res = await axios.post(
      'http://127.0.0.1:8080/student/queryByName',null,{
        params: {
          name: searchName.value
        }
        }
    )

    const data = res.data.data

    if (!data ) {
      message.value = '未找到学生'
      students.value = []
      return
    }

    students.value = [data]
    message.value = '查询成功'

  } catch (err) {
    console.error(err)
    message.value = '查询失败'
  }
}
</script>