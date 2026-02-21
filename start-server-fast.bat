@echo off
REM College App - Fast Server Startup (assumes npm dependencies already installed)

title College App Server
echo ========================================
echo Starting College App - Backend Server
echo ========================================
echo Server will run on: http://localhost:4000
echo.

cd /d C:\Users\WELCOME\priya\collegeProject\collegeProject\server
npm run dev

pause
