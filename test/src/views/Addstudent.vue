<template>
  <h2>添加学生</h2>

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

  <button @click="submit">提交</button>
  <button @click="goBack">返回</button>

  <p style="color: red;">{{ message }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const number = ref('')
const name = ref('')
const gender = ref('0')
const nationality = ref('')
const message = ref('')

const submit = async () => {
  try {
    const res = await axios.post(
      'http://127.0.0.1:8080/student/add',
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
    message.value =
      err.response?.data?.message || '请求失败'
  }
}

const goBack = () => {
  router.push('/student')
}
</script>