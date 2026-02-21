@echo off
REM College App - Server Startup Script
REM This batch file starts the backend Express server

title College App Server
echo ========================================
echo Starting College App - Backend Server
echo ========================================
echo.
echo Server will run on: http://localhost:4000
echo.
pause

cd /d C:\Users\WELCOME\priya\collegeProject\collegeProject\server
npm install
npm run dev

pause
