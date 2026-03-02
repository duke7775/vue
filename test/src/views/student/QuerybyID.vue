<template>
  <h2>按ID查询学生</h2>

  <div>
    <label>请输入ID:</label>
    <input v-model="searchId" type="text" />
    <button @click="getStudentByID">查询</button>
  </div>

  <hr />

  <div v-if="found">
    <p>学号：{{ number }}</p>
    <p>姓名：{{ name }}</p>
    <p>性别：{{ gender == '1' ? '男' : '女' }}</p>
    <p>国籍：{{ nationality }}</p>
  </div>

  <p style="color:red">{{ message }}</p>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const searchId = ref('')
const number = ref('')
const name = ref('')
const gender = ref('')
const nationality = ref('')
const message = ref('')
const found = ref(false)

const getStudentByID = async () => {
  try {
    const res = await axios.post(
      'http://127.0.0.1:8080/student/queryByID',null,{
        params: {
          id: searchId.value
        }
        }
      
    )

    const data = res.data.data

    if (!data) {
      message.value = '未找到该学生'
      found.value = false
      return
    }

    number.value = data.Number
    name.value = data.Name
    gender.value = String(data.Gender)
    nationality.value = data.Nationality

    found.value = true
    message.value = '查询成功'

  } catch (err) {
    console.error(err)
    message.value = '查询失败'
    found.value = false
  }
}
</script>