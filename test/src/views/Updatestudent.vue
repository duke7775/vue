<template>
  <h2>修改学生</h2>

  <div>
    <label>请输入学号：</label>
    <input v-model="searchNumber" type="number" />
    <button @click="getStudent">查询</button>
  </div>

  <hr />

  <div v-if="found">
    <div>
      <label>学号：</label>
      <input v-model="number" type="number" />
    </div>

    <div>
      <label>姓名：</label>
      <input v-model="name" />
    </div>

    <div>
      <label>性别：</label>
      <select v-model="gender">
        <option value="0">女</option>
        <option value="1">男</option>
      </select>
    </div>

    <div>
      <label>国籍：</label>
      <input v-model="nationality" />
    </div>

    <br />

    <button @click="updateStudent">修改</button>
  </div>

  <br />
  <button @click="goBack">返回</button>

  <p style="color:red">{{ message }}</p>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const searchNumber = ref('')
const number = ref('')
const name = ref('')
const gender = ref('0')
const nationality = ref('')
const message = ref('')
const found = ref(false)

const getStudent = async () => {
  try {
    const res = await axios.post(
      'http://127.0.0.1:8080/student/queryByNumber',
      null,
      { params: { number: searchNumber.value } }
    )

    console.log("返回结构:", res.data)

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

const updateStudent = async () => {
  try {
    const res = await axios.post(
      'http://127.0.0.1:8080/student/update',
      null,
      {
        params: {
          number: number.value,
          name: name.value,
          gender: gender.value,
          nationality: nationality.value
        }
      }
    )

    message.value = res.data.message

  } catch (err) {
    message.value = '修改失败'
  }
}

const goBack = () => {
  router.push('/student')
}
</script>