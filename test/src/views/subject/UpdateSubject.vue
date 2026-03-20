<template>
  <div style="width: 85%; margin: auto; font-family: Arial;">

    <!-- 编辑区域 -->
    <div style="margin-bottom: 30px;">
      <h2>修改科目</h2>

      <!-- 查询 -->
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <input v-model="searchName" placeholder="输入科目名称" />
        <button @click="getSubject">查询</button>
      </div>

      <!-- 编辑表单 -->
      <div
        v-if="found"
        style="margin-top: 15px; background: #f9f9f9; padding: 15px; border-radius: 6px;"
      >
        <div style="display: flex; gap: 10px;">
          <input v-model="name" placeholder="科目名称" />
          <button @click="updateSubject">保存修改</button>
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
      <h3>科目列表</h3>

      <div
        v-if="subjects.length"
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
              <th style="padding: 10px;">科目名称</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="s in paginatedSubjects"
              :key="s.ID"
              style="border-top: 1px solid #eee; cursor: pointer;"
              @click="selectSubject(s)"
            >
              <td style="padding: 10px;">{{ s.ID }}</td>
              <td style="padding: 10px;">{{ s.Name }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-else style="color: gray; margin-top: 10px;">
        暂无科目数据
      </p>

      <!-- 分页 -->
      <div
        v-if="subjects.length"
        style="text-align: center; margin-top: 15px;"
      >
        <button @click="previousPage" :disabled="currentPage === 1">
          上一页
        </button>

        <span style="margin: 0 15px;">
          第 {{ currentPage }} / {{ totalPages }} 页（共 {{ subjects.length }} 条）
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
import { subjectApi } from '@/api'

const router = useRouter()

// ⭐ 用ID更新
const id = ref('')

const searchName = ref('')
const name = ref('')
const message = ref('')
const found = ref(false)

const subjects = ref([])
const loading = ref(false)

const currentPage = ref(1)
const pageSize = 10

const totalPages = computed(() => {
  return Math.ceil(subjects.value.length / pageSize)
})

const paginatedSubjects = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return subjects.value.slice(start, start + pageSize)
})

// 获取列表
const getAllSubjects = async () => {
  loading.value = true
  try {
    const res = await subjectApi.queryList()
    subjects.value = res.data.data || []
    currentPage.value = 1
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

// ⭐ 点击表格直接选中
const selectSubject = (s) => {
  id.value = s.ID
  name.value = s.Name
  found.value = true
  message.value = '已选中，可直接修改'
}

// 查询
const getSubject = async () => {
  if (!searchName.value) {
    message.value = '请输入科目名称'
    return
  }

  try {
    const res = await subjectApi.queryList()
    const data = res.data.data

    const subject = data.find(
      s => s.Name === searchName.value
    )

    if (!subject) {
      message.value = '未找到该科目'
      found.value = false

      name.value = ''
      return
    }

    id.value = subject.ID
    name.value = subject.Name

    found.value = true
    message.value = '查询成功'
  } catch (err) {
    message.value = '查询失败'
    found.value = false
  }
}

// 修改
const updateSubject = async () => {
  try {
    const res = await subjectApi.update({
      id: id.value,
      name: name.value
    })

    message.value = res.data.message

    if (res.data.code === 200 || res.data.code === 0) {
      setTimeout(() => {
        getAllSubjects()
        found.value = false
        searchName.value = ''
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
  router.push('/subject')
}

onMounted(() => {
  getAllSubjects()
})
</script>