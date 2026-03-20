<template>
  <div style="width: 85%; margin: auto; font-family: Arial;">

    <!-- 查询区域 -->
    <div style="margin-bottom: 30px;">
      <h2>按姓名查询学生</h2>

      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
        <input v-model="searchName" placeholder="输入姓名" />

        <button @click="getStudentByName">查询</button>
      </div>

      <!-- 查询结果 -->
      <div v-if="searchResults.length"
           style="margin-top: 15px; border: 1px solid #ddd; border-radius: 6px;">
        
        <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 14px;">
          <thead style="background: #f5f5f5;">
            <tr>
              <th style="padding: 10px;">ID</th>
              <th style="padding: 10px;">学号</th>
              <th style="padding: 10px;">姓名</th>
              <th style="padding: 10px;">性别</th>
              <th style="padding: 10px;">国籍</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="s in searchResults" :key="s.ID" style="border-top: 1px solid #eee;">
              <td style="padding: 10px;">{{ s.ID }}</td>
              <td style="padding: 10px;">{{ s.Number }}</td>
              <td style="padding: 10px;">{{ s.Name }}</td>
              <td style="padding: 10px;">
                {{ s.Gender == '1' ? '男' : '女' }}
              </td>
              <td style="padding: 10px;">{{ s.Nationality }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style="color:red; margin-top: 10px;">{{ message }}</p>
    </div>

    <hr />

    <!-- 加载状态 -->
    <div v-if="loading" style="text-align: center; margin-top: 20px;">
      加载中...
    </div>

    <!-- 学生列表 -->
    <div v-else>
      <h3>学生列表</h3>

      <div
        v-if="students.length"
        style="
          max-height: 70vh;
          overflow-y: auto;
          border: 1px solid #ddd;
          border-radius: 6px;
          margin-top: 10px;
        "
      >
        <table
          style="
            width: 100%;
            border-collapse: collapse;
            text-align: center;
            font-size: 14px;
          "
        >
          <thead style="background: #f5f5f5;">
            <tr>
              <th style="padding: 10px;">ID</th>
              <th style="padding: 10px;">学号</th>
              <th style="padding: 10px;">姓名</th>
              <th style="padding: 10px;">性别</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="s in paginatedStudents"
              :key="s.ID"
              style="border-top: 1px solid #eee;"
            >
              <td style="padding: 10px;">{{ s.ID }}</td>
              <td style="padding: 10px;">{{ s.Number }}</td>
              <td style="padding: 10px;">{{ s.Name }}</td>
              <td style="padding: 10px;">
                {{ s.Gender == '1' ? '男' : '女' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-else style="color: gray; margin-top: 10px;">
        暂无学生数据
      </p>

      <!-- 分页 -->
      <div
        v-if="students.length"
        style="text-align: center; margin-top: 15px;"
      >
        <button @click="previousPage" :disabled="currentPage === 1">
          上一页
        </button>

        <span style="margin: 0 15px;">
          第 {{ currentPage }} / {{ totalPages }} 页（共 {{ students.length }} 条）
        </span>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { studentApi } from '@/api'

const searchName = ref('')
const students = ref([])
const searchResults = ref([])
const message = ref('')
const loading = ref(false)

const currentPage = ref(1)
const pageSize = 10

const totalPages = computed(() => {
  return Math.ceil(students.value.length / pageSize)
})

const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return students.value.slice(start, start + pageSize)
})

// 获取全部
const getAllStudents = async () => {
  loading.value = true
  try {
    const res = await studentApi.queryList()
    students.value = res.data.data || []
    currentPage.value = 1
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

// 分页
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

// 查询（重点修复）
const getStudentByName = async () => {
  if (!searchName.value) {
    message.value = '请输入姓名'
    return
  }

  try {
    const res = await studentApi.queryByName(searchName.value)
    const data = res.data.data

    if (!data || data.length === 0) {
      message.value = '未找到学生'
      searchResults.value = []
      return
    }

    // ✅ 正确：支持多个结果
    searchResults.value = data
    message.value = '查询成功'
  } catch (err) {
    message.value = err.response?.data?.message || '查询失败'
  }
}

onMounted(() => {
  getAllStudents()
})
</script>