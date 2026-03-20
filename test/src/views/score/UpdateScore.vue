<template>
  <div style="width: 85%; margin: auto; font-family: Arial;">

    <!-- 编辑区域 -->
    <div style="margin-bottom: 30px;">
      <h2>修改成绩</h2>

      <!-- 查询 -->
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <input v-model="searchStudentNumber" placeholder="输入学生学号" />
        <input v-model="searchSubjectName" placeholder="输入科目名称" />
        <button @click="getScore">查询</button>
      </div>

      <!-- 编辑表单 -->
      <div
        v-if="found"
        style="margin-top: 15px; background: #f9f9f9; padding: 15px; border-radius: 6px;"
      >
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <input v-model="studentNumber" disabled />
          <input v-model="subjectName" disabled />
          <input v-model="score" type="text" placeholder="新成绩（A/B/C/D）" />
          <button @click="updateScore">保存修改</button>
        </div>
      </div>

      <button @click="goBack" style="margin-top: 10px;">返回</button>

      <p style="color:red; margin-top: 10px;">{{ message }}</p>
    </div>

    <hr />

    <!-- 加载 -->
    <div v-if="loading" style="text-align: center; margin-top: 20px;">
      加载中...
    </div>

    <!-- 列表 -->
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
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="s in paginatedScores"
              :key="s.ID"
              style="border-top: 1px solid #eee; cursor: pointer;"
              @click="selectScore(s)"
            >
              <td style="padding: 10px;">{{ s.ID }}</td>
              <td style="padding: 10px;">{{ s.StudentNumber }}</td>
              <td style="padding: 10px;">{{ s.SubjectName }}</td>
              <td style="padding: 10px;">{{ s.Score }}</td>
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

// ⭐ 用ID更新
const id = ref('')

const searchStudentNumber = ref('')
const searchSubjectName = ref('')
const studentNumber = ref('')
const subjectName = ref('')
const score = ref('')
const message = ref('')
const found = ref(false)

const scores = ref([])
const loading = ref(false)

const currentPage = ref(1)
const pageSize = 10

const totalPages = computed(() => {
  return Math.ceil(scores.value.length / pageSize)
})

const paginatedScores = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return scores.value.slice(start, start + pageSize)
})

// 获取列表
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

// ⭐ 点击表格直接编辑（高级玩法）
const selectScore = (s) => {
  id.value = s.ID
  studentNumber.value = s.StudentNumber
  subjectName.value = s.SubjectName
  score.value = s.Score

  found.value = true
  message.value = '已选中，可直接修改'
}

// 查询（修复版）
const getScore = async () => {
  if (!searchStudentNumber.value || !searchSubjectName.value) {
    message.value = '请输入学生学号和科目名称'
    return
  }

  try {
    const res = await scoreApi.queryList()
    const data = res.data.data

    const scoreData = data.find(
      s =>
        String(s.StudentNumber) === String(searchStudentNumber.value) &&
        s.SubjectName === searchSubjectName.value
    )

    if (!scoreData) {
      message.value = '未找到该成绩'
      found.value = false

      studentNumber.value = ''
      subjectName.value = ''
      score.value = ''
      return
    }

    id.value = scoreData.ID
    studentNumber.value = scoreData.StudentNumber
    subjectName.value = scoreData.SubjectName
    score.value = scoreData.Score

    found.value = true
    message.value = '查询成功'
  } catch (err) {
    message.value = '查询失败'
    found.value = false
  }
}

// 修改
const updateScore = async () => {
  const grade = String(score.value || '').trim().toUpperCase()
  if (!/^[ABCD]$/.test(grade)) {
    message.value = '成绩只支持 A/B/C/D'
    return
  }

  try {
    const res = await scoreApi.update({
      id: id.value,
      student_number: studentNumber.value,
      subject_name: subjectName.value,
      score: grade
    })

    message.value = res.data.message

    if (res.data.code === 200 || res.data.code === 0) {
      setTimeout(() => {
        getAllScores()
        found.value = false
        searchStudentNumber.value = ''
        searchSubjectName.value = ''
      }, 300)
    }
  } catch (err) {
    message.value = '修改失败'
  }
}

// 分页
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const goBack = () => {
  router.push('/score')
}

onMounted(() => {
  getAllScores()
})
</script>