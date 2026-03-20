<template>
  <div style="width: 85%; margin: auto; font-family: Arial;">

    <!-- 查询区域 -->
    <div style="margin-bottom: 30px;">
      <h2>科目查询</h2>

      <p style="color:red; margin-top: 10px;">{{ message }}</p>
    </div>

    <hr />

    <!-- 加载状态 -->
    <div v-if="loading" style="text-align: center; margin-top: 20px;">
      加载中...
    </div>

    <!-- 科目列表 -->
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
              style="border-top: 1px solid #eee;"
            >
              <td style="padding: 10px;">{{ s.ID }}</td>
              <td style="padding: 10px;">{{ s.Name }}</td>
              <td style="padding: 10px;">
                <button
                  @click="deleteSubject(s.ID)"
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
import { subjectApi } from '@/api'

// 列表
const subjects = ref([])
const loading = ref(false)
const message = ref('')

// 分页
const currentPage = ref(1)
const pageSize = 10

const totalPages = computed(() => {
  return Math.ceil(subjects.value.length / pageSize)
})

const paginatedSubjects = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return subjects.value.slice(start, start + pageSize)
})

// 获取数据
const getAllSubjects = async () => {
  loading.value = true
  message.value = ''
  try {
    const res = await subjectApi.queryList()
    const data = res.data.data

    if (!data || data.length === 0) {
      message.value = '暂无科目数据'
      subjects.value = []
      return
    }

    subjects.value = data
    currentPage.value = 1
    message.value = '查询成功'
  } catch (err) {
    console.error(err)
    message.value = '查询失败'
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

// 删除
const deleteSubject = async (id) => {
  if (!confirm('确定删除该科目吗？')) return

  try {
    await subjectApi.delete(id)
    getAllSubjects()

    // 防止删完最后一页空白
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value || 1
    }
  } catch (err) {
    console.error(err)
    message.value = '删除失败'
  }
}

onMounted(() => {
  getAllSubjects()
})
</script>