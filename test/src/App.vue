<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const openMenu = ref<string | null>(null)

function toggle(menu: string) {
  openMenu.value = openMenu.value === menu ? null : menu
}
</script>

<template>
  <div class="layout">
    <div class="sidebar">
      <h2 class="logo">学生管理系统</h2>

      <div class="menu-group">
        <div class="menu-title" @click="toggle('student')">
          <span>学生管理</span>
          <span :class="{ rotate: openMenu === 'student' }">⌄</span>
        </div>

        <div v-show="openMenu === 'student'" class="submenu">
          <router-link to="/student/add">添加学生</router-link>
          <router-link to="/student/update">更新学生</router-link>
          <router-link to="/student/queryByID">按ID查询学生</router-link>
          <router-link to="/student/queryByNumber">按学号查询学生</router-link>
          <router-link to="/student/queryByName">按姓名查询学生</router-link>
          <router-link to="/student/queryList">查询所有学生</router-link>
        </div>
      </div>

      <div class="menu-group">
        <div class="menu-title" @click="toggle('subject')">
          <span>科目管理</span>
          <span :class="{ rotate: openMenu === 'subject' }">⌄</span>
        </div>

        <div v-show="openMenu === 'subject'" class="submenu">
          <router-link to="/subject/add">添加科目</router-link>
          <router-link to="/subject/update">更新科目</router-link>
          <router-link to="/subject/queryAll">查询所有科目</router-link>
        </div>
      </div>

      <div class="menu-group">
        <div class="menu-title" @click="toggle('score')">
          <span>成绩管理</span>
          <span :class="{ rotate: openMenu === 'score' }">⌄</span>
        </div>

        <div v-show="openMenu === 'score'" class="submenu">
          <router-link to="/score/add">添加成绩</router-link>
          <router-link to="/score/update">更新成绩</router-link>
          <router-link to="/score/queryAll">查询所有成绩</router-link>
        </div>
      </div>
    </div>

    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  background-color: #f5f6fa;
}

.layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 240px;
  background-color: #f3f4f6;
  padding: 20px;
  box-sizing: border-box;
  border-right: 1px solid #ddd;
}

.logo {
  margin-top: 0;
}

.menu-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  padding: 10px;
  margin-top: 15px;
  border-radius: 6px;
}

.menu-title:hover {
  background-color: #e5e7eb;
}

.submenu {
  padding-left: 10px;
}

.submenu a {
  display: block;
  padding: 8px 12px;
  margin: 4px 0;
  text-decoration: none;
  color: #2563eb;
  border-radius: 4px;
}

.submenu a:hover {
  background-color: #e0e7ff;
}

.router-link-active {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.rotate {
  transform: rotate(180deg);
  transition: 0.3s;
}

.content {
  flex: 1;
  padding: 30px;
  background-color: white;
}
</style>