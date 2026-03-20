/**
 * API接口集合
 * 管理所有API端点
 */

import request from './request.js'

// 学生相关API
export const studentApi = {
  // 查询所有学生
  queryList: () => request.post('/student/queryList'),
  
  // 根据ID查询学生
  queryByID: (id) => request.post('/student/queryByID', null, { params: { id } }),
  
  // 根据姓名查询学生
  queryByName: (name) => request.post('/student/queryByName', null, { params: { name } }),
  
  // 根据学号查询学生
  queryByNumber: (number) => request.post('/student/queryByNumber', null, { params: { number } }),
  
  // 添加学生
  add: (data) => request.post('/student/add', null, { params: data }),
  
  // 更新学生
  update: (data) => request.post('/student/update', null, { params: data }),

  // 删除学生
  delete: (id) => request.post('/student/delete', null, { params: { id } })
}

// 科目相关API
export const subjectApi = {
  // 查询所有科目
  queryList: () => request.post('/subject/queryList'),
  
  // 添加科目
  add: (name) => request.post('/subject/add', null, { params: { name } }),
  
  // 更新科目
  update: (data) => request.post('/subject/update', null, { params: data }),

  // 删除科目
  delete: (id) => request.post('/subject/delete', null, { params: { id } })
}

// 成绩相关API
export const scoreApi = {
  // 查询所有成绩
  queryList: () => request.post('/score/queryList'),
  
  // 添加成绩
  add: (data) => request.post('/score/add', null, { params: data }),
  
  // 更新成绩
  update: (data) => request.post('/score/update', null, { params: data }),

  // 删除成绩
  delete: (id) => request.post('/score/delete', null, { params: { id } })
}

export default {
  studentApi,
  subjectApi,
  scoreApi
}
