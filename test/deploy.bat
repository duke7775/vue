@echo off
REM 快速部署脚本 - Windows版本
REM 支持测试环境和发布环境

setlocal enabledelayedexpansion

REM 配置变量
set SERVER_USER=user
set SERVER_IP_TEST=127.0.0.1
set SERVER_IP_PROD=118.139.165.189
set REMOTE_PATH=/var/www/html/student-system
set LOCAL_PATH=dist

echo.
echo ========================================
echo 学生管理系统前端部署工具
echo ========================================
echo.
echo 请选择部署环境：
echo 1) 测试环境（127.0.0.1:8080）
echo 2) 发布环境（118.139.165.189:8080）
echo.

set /p CHOICE="请输入选项 (1或2): "

if "%CHOICE%"=="1" (
  set ENV=test
  set SERVER_IP=!SERVER_IP_TEST!
  echo.
  echo 选择：测试环境
) else if "%CHOICE%"=="2" (
  set ENV=prod
  set SERVER_IP=!SERVER_IP_PROD!
  echo.
  echo 选择：发布环境
) else (
  echo 无效选择
  pause
  exit /b 1
)

REM 打包
echo.
echo ========================================
echo 打包前端（%ENV% 环境）...
echo ========================================
if "%ENV%"=="test" (
  call npm run build:test
) else (
  call npm run build:prod
)

if errorlevel 1 (
  echo 打包失败
  pause
  exit /b 1
)

echo ✓ 打包成功

REM 显示上传信息
echo.
echo ========================================
echo 上传信息
echo ========================================
echo 源：%LOCAL_PATH%
echo 目标服务器：%SERVER_IP%
echo 目标路径：%REMOTE_PATH%
echo.

set /p CONFIRM="确认上传？(Y/N): "

if /i not "%CONFIRM%"=="Y" (
  echo 已取消上传
  pause
  exit /b 0
)

REM 使用scp上传（需要在Windows上安装Git Bash或SSH客户端）
echo.
echo 正在上传...
scp -r %LOCAL_PATH% %SERVER_USER%@%SERVER_IP%:%REMOTE_PATH%

if errorlevel 1 (
  echo 上传失败
  pause
  exit /b 1
)

echo.
echo ========================================
echo ✓ 部署成功!
echo ✓ 访问地址: http://%SERVER_IP%
echo ========================================
pause

