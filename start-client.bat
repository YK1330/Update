@echo off
REM College App - Client Startup Script
REM This batch file starts the frontend Vite development server

title College App Client
echo ========================================
echo Starting College App - Frontend Client
echo ========================================
echo.
echo Client will run on: http://localhost:8081
echo.
pause

cd /d C:\Users\WELCOME\priya\collegeProject\collegeProject
npm install
npm run dev

pause
