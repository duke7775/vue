# 环境配置指南

## 📋 环境配置说明

项目现在支持两个不同的环境配置，用于测试和发布场景。

## 🔧 配置文件

### 1. 测试环境配置 - `.env.test`
```env
VITE_API_HOST=127.0.0.1
VITE_API_PORT=8080
VITE_API_PROTOCOL=http
```
**用途：** 本地开发和测试

### 2. 发布环境配置 - `.env.prod`
```env
VITE_API_HOST=118.139.165.189
VITE_API_PORT=8080
VITE_API_PROTOCOL=http
```
**用途：** 生产环境部署

## 🚀 使用方法

### 开发/测试

**启动开发服务器（使用测试环境127.0.0.1）：**
```bash
npm run dev
```

**打包测试版本：**
```bash
npm run build:test
```

### 发布

**启动开发服务器预览发布版本（使用生产IP）：**
```bash
npm run dev:prod
```

**打包发布版本（使用生产IP118.139.165.189）：**
```bash
npm run build:prod
```

或者默认的build命令也是发布版本：
```bash
npm run build
```

## 📝 npm scripts 说明

| 命令 | 环境 | 说明 |
|------|------|------|
| `npm run dev` | test | 启动开发服务器（127.0.0.1:8080） |
| `npm run dev:prod` | prod | 启动开发服务器（118.139.165.189:8080） |
| `npm run build` | prod | 打包生产版本（118.139.165.189:8080） |
| `npm run build:test` | test | 打包测试版本（127.0.0.1:8080） |
| `npm run build:prod` | prod | 打包发布版本（118.139.165.189:8080） |
| `npm run preview` | - | 预览打包结果 |

## 🔍 工作原理

### 配置加载流程
```
.env.test / .env.prod
    ↓
Vite 加载对应环境变量
    ↓
src/config/server.config.js 读取环境变量
    ↓
import.meta.env.VITE_API_* （获取当前环境值）
    ↓
API 代码使用正确的服务器地址
```

### 配置文件内容
```javascript
// src/config/server.config.js
const host = import.meta.env.VITE_API_HOST || '127.0.0.1'
const port = import.meta.env.VITE_API_PORT || 8080
const protocol = import.meta.env.VITE_API_PROTOCOL || 'http'

// 生成最终URL
// http://127.0.0.1:8080 (测试)
// http://118.139.165.189:8080 (发布)
```

## 📂 项目文件结构

```
project/
├── .env.test             # 测试环境配置（127.0.0.1）
├── .env.prod             # 发布环境配置（118.139.165.189）
├── package.json          # npm scripts配置
├── vite.config.js        # Vite配置
├── src/
│   ├── config/
│   │   └── server.config.js    # 服务器配置读取
│   ├── api/
│   │   ├── request.js          # Axios实例
│   │   └── index.js            # API接口集合
│   └── ...
└── dist/                 # 打包输出目录
```

## 💡 最佳实践

1. **开发阶段** - 使用 `npm run dev` 连接本地服务器 (127.0.0.1:8080)
2. **测试阶段** - 使用 `npm run build:test` 打包测试版本
3. **发布前** - 使用 `npm run dev:prod` 预览发布版本
4. **正式发布** - 使用 `npm run build:prod` 打包发布版本
5. **部署** - 运行 `deploy.bat` (Windows) 或 `deploy.sh` (Linux/Mac)

## 🔐 注意事项

- ✅ 不要提交敏感信息（如真实IP）到版本控制
- ✅ `.env.test` 和 `.env.prod` 应该在 `.gitignore` 中
- ✅ 确保目标服务器的防火墙允许访问 8080 端口

## 🚢 部署流程

### Windows 用户
```bash
deploy.bat
# 选择 1（测试）或 2（发布）
# 确认上传
```

### Linux/Mac 用户
```bash
bash deploy.sh
# 选择 1（测试）或 2（发布）
# 确认上传
```

部署脚本会自动：
1. 根据选择的环境打包代码
2. 生成对应环境的 dist 文件
3. 使用 scp 上传到服务器

## ✅ 检查清单

部署前验证：
- [ ] 选择了正确的环境（测试/发布）
- [ ] 对应的 .env 文件配置无误
- [ ] 后端服务器地址正确
- [ ] 防火墙已放行端口 8080
- [ ] 上传目标目录存在且有写权限
