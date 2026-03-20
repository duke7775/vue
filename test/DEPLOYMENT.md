# 前端部署指南

## 📦 打包信息

已成功生成生产兼容的前端打包文件。

### 打包结果
```
dist/
├── index.html                    # 主HTML入口文件
├── assets/
│   ├── index-D9dH7WOy.css       # 样式文件（已压缩）
│   └── index-C7uQCWfH.js        # JavaScript文件（已压缩）
└── vite.svg                      # 静态资源
```

### 文件大小
| 文件 | 原始大小 | Gzip大小 |
|------|---------|----------|
| index.html | 0.45 kB | 0.29 kB |
| CSS | 1.70 kB | 0.78 kB |
| JS | 144.97 kB | 53.22 kB |

## 🚀 部署方案

### 方案1：Nginx部署（推荐）

#### 1. 上传文件到服务器
```bash
# 将dist文件夹上传到服务器
scp -r dist/ user@your-server:/var/www/html/student-system/
```

#### 2. Nginx配置
编辑 `/etc/nginx/sites-available/default` 或创建新的配置文件：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 改为你的域名或IP
    
    # 支持HTTPS（可选）
    # listen 443 ssl;
    # ssl_certificate /path/to/cert.pem;
    # ssl_certificate_key /path/to/key.pem;
    
    root /var/www/html/student-system;
    index index.html;
    
    # 配置用于Vue Router的SPA路由
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 配置API代理（可选）
    location /api/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # 缓存设置
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 3. 重启Nginx
```bash
sudo nginx -t                    # 测试配置
sudo systemctl restart nginx     # 重启服务
```

### 方案2：Apache部署

#### 1. 启用mod_rewrite
```bash
sudo a2enmod rewrite
```

#### 2. .htaccess配置
在dist目录中创建 `.htaccess` 文件：

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### 3. 配置VirtualHost
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/html/student-system
    
    <Directory /var/www/html/student-system>
        Options -MultiViews
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### 方案3：Node.js + Express部署

创建 `server.js`：
```javascript
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// 静态文件服务
app.use(express.static(path.join(__dirname, 'dist')))

// SPA路由处理
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(3000, () => {
  console.log('Frontend running on http://localhost:3000')
})
```

运行：
```bash
node server.js
```

### 方案4：Docker部署

创建 `Dockerfile`：
```dockerfile
# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 运行阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

创建 `nginx.conf`：
```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
}
```

构建和运行：
```bash
docker build -t student-system .
docker run -p 80:80 student-system
```

## ⚙️ API地址配置

部署前须修改 API 服务器地址：

编辑 `dist` 中的 JavaScript 文件（推荐在打包前修改源码）：

1. 修改 `src/config/server.config.js`：
```javascript
production: {
  host: 'your-server-ip',    // 改为生产服务器IP
  port: 8080,
  protocol: 'http'           // 或 'https'
}
```

2. 重新打包：
```bash
npm run build
```

## 🔒 安全建议

- ✅ 启用HTTPS/SSL证书
- ✅ 配置CORS头部
- ✅ 实施API速率限制
- ✅ 验证用户输入
- ✅ 隐藏敏感的错误信息
- ✅ 定期更新依赖包

## 📋 检查清单

部署前请确认：

- [ ] 已执行 `npm run build` 生成dist文件
- [ ] API服务器地址已正确配置
- [ ] 计划部署的服务器已准备好
- [ ] 选择合适的部署方案
- [ ] 已备份原始源代码
- [ ] SSL证书已准备（如需要）
- [ ] 数据库连接已配置
- [ ] 测试API连接是否正常

## 🐛 常见问题

### Q: 路由刷新后页面404
**A:** 确保在web服务器中配置了重写规则，使所有请求都指向 `index.html`

### Q: CSS/JS 文件未加载
**A:** 检查打包时的资源路径配置，确保 `public/` 路径正确

### Q: API请求失败
**A:** 验证API服务器地址是否正确，检查跨域CORS设置

### Q: 页面加载缓慢
**A:** 启用gzip压缩，配置CDN加速，使用浏览器缓存

## 📞 部署支持

对于具体的部署问题，请根据你的服务器环境选择相应的部署方案。
