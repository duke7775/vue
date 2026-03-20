#!/bin/bash
# 快速部署脚本 - Linux/Mac版本
# 支持测试环境和发布环境

# 配置变量
SERVER_USER="user"
SERVER_IP_TEST="127.0.0.1"
SERVER_IP_PROD="118.139.165.189"
REMOTE_PATH="/var/www/html/student-system"
LOCAL_PATH="./dist"

echo ""
echo "========================================"
echo "学生管理系统前端部署工具"
echo "========================================"
echo ""
echo "请选择部署环境："
echo "1) 测试环境（127.0.0.1:8080）"
echo "2) 发布环境（118.139.165.189:8080）"
echo ""

read -p "请输入选项 (1或2): " CHOICE

if [ "$CHOICE" = "1" ]; then
  ENV="test"
  SERVER_IP="$SERVER_IP_TEST"
  echo ""
  echo "选择：测试环境"
elif [ "$CHOICE" = "2" ]; then
  ENV="prod"
  SERVER_IP="$SERVER_IP_PROD"
  echo ""
  echo "选择：发布环境"
else
  echo "无效选择"
  exit 1
fi

# 打包
echo ""
echo "========================================"
echo "打包前端（$ENV 环境）..."
echo "========================================"

if [ "$ENV" = "test" ]; then
  npm run build:test
else
  npm run build:prod
fi

if [ $? -ne 0 ]; then
  echo "❌ 打包失败"
  exit 1
fi

echo "✓ 打包成功"

# 显示上传信息
echo ""
echo "========================================"
echo "上传信息"
echo "========================================"
echo "源：$LOCAL_PATH"
echo "目标服务器：$SERVER_IP"
echo "目标路径：$REMOTE_PATH"
echo ""

read -p "确认上传？(Y/N): " CONFIRM

if [ "$CONFIRM" != "Y" ] && [ "$CONFIRM" != "y" ]; then
  echo "已取消上传"
  exit 0
fi

# 使用scp上传
echo ""
echo "正在上传..."
scp -r $LOCAL_PATH $SERVER_USER@$SERVER_IP:$REMOTE_PATH

if [ $? -eq 0 ]; then
  echo ""
  echo "========================================"
  echo "✓ 部署成功!"
  echo "✓ 访问地址: http://$SERVER_IP"
  echo "========================================"
else
  echo "❌ 上传失败"
  exit 1
fi

