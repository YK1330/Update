@echo off
REM College App - Complete Startup Script
REM This batch file starts both server and client in separate windows

title College App Launcher
echo ========================================
echo College Application Management System
echo ========================================
echo.
echo Starting both server and client...
echo.
echo Server: http://localhost:4000
echo Client: http://localhost:8081
echo.
echo Two windows will open in a moment...
echo.
timeout /t 2

REM Start server in a new window
start cmd /k "cd /d C:\Users\WELCOME\priya\collegeProject\collegeProject\server && npm install && npm run dev"

REM Wait a moment before starting client
timeout /t 3

REM Start client in a new window
start cmd /k "cd /d C:\Users\WELCOME\priya\collegeProject\collegeProject && npm install && npm run dev"

echo.
echo Server and Client windows have been opened!
echo.
pause
