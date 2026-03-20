<template>
  <div style="width: 85%; margin: auto; font-family: Arial;">

    <!-- 表单区域 -->
    <div style="margin-bottom: 30px;">
      <h2>成绩管理</h2>

      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
        <input v-model="studentNumber" type="number" placeholder="学生学号" />
        <input v-model="subjectName" placeholder="科目名称" />
        <input v-model="score" type="number" placeholder="成绩" />
        <button @click="submit">添加</button>
        <button @click="goBack">返回</button>
      </div>

      <p style="color: red; margin-top: 10px;">{{ message }}</p>
    </div>

    <hr />

    <!-- 加载状态 -->
    <div v-if="loading" style="text-align: center; margin-top: 20px;">
      加载中...
    </div>

    <!-- 成绩列表 -->
    <div v-else>
      <h3>成绩列表</h3>

      <div
        v-if="scores.length"
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
              <th style="padding: 10px;">学生学号</th>
              <th style="padding: 10px;">科目名称</th>
              <th style="padding: 10px;">成绩</th>
              <th style="padding: 10px;">操作</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="s in paginatedScores"
              :key="s.ID"
              style="border-top: 1px solid #eee;"
            >
              <td style="padding: 10px;">{{ s.ID }}</td>
              <td style="padding: 10px;">{{ s.StudentNumber }}</td>
              <td style="padding: 10px;">{{ s.SubjectName }}</td>
              <td style="padding: 10px;">{{ s.Score }}</td>
              <td style="padding: 10px;">
                <button
                  @click="deleteScore(s.ID)"
                  style="color: red;"
                >
                  删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-else style="color: gray; margin-top: 10px;">
        暂无成绩数据
      </p>

      <!-- 分页 -->
      <div
        v-if="scores.length"
        style="text-align: center; margin-top: 15px;"
      >
        <button @click="previousPage" :disabled="currentPage === 1">
          上一页
        </button>

        <span style="margin: 0 15px;">
          第 {{ currentPage }} / {{ totalPages }} 页（共 {{ scores.length }} 条）
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
import { useRouter } from 'vue-router'
import { scoreApi } from '@/api'

const router = useRouter()

// 表单
const studentNumber = ref('')
const subjectName = ref('')
const score = ref('')
const message = ref('')

// 列表
const scores = ref([])
const loading = ref(false)

// 分页
const currentPage = ref(1)
const pageSize = 10

const totalPages = computed(() => {
  return Math.ceil(scores.value.length / pageSize)
})

const paginatedScores = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return scores.value.slice(start, start + pageSize)
})

// 获取数据
const getAllScores = async () => {
  loading.value = true
  try {
    const res = await scoreApi.queryList()
    scores.value = res.data.data || []
    currentPage.value = 1
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

// 分页控制
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// 添加
const submit = async () => {
  try {
    const res = await scoreApi.add({
      student_number: studentNumber.value,
      subject_name: subjectName.value,
      score: score.value
    })

    message.value = res.data.message

    if (res.data.code === 200 || res.data.code === 0) {
      setTimeout(() => {
        getAllScores()
        studentNumber.value = ''
        subjectName.value = ''
        score.value = ''
      }, 300)
    }
  } catch (err) {
    message.value = err.response?.data?.message || '请求失败'
  }
}

// 删除
const deleteScore = async (id) => {
  if (!confirm('确定删除该成绩吗？')) return

  try {
    await scoreApi.delete(id)
    getAllScores()

    // 防止删完最后一页空白
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value || 1
    }
  } catch (err) {
    console.error(err)
  }
}

// 返回
const goBack = () => {
  router.push('/score')
}

onMounted(() => {
  getAllScores()
})
</script>
