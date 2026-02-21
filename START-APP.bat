@echo off
REM College App - Complete Startup Script (Fast Version)
REM This batch file starts both server and client without npm install

title College App Launcher
color 0A
mode con: cols=100 lines=30

cls
echo.
echo.
echo    ╔═══════════════════════════════════════════════════════════════════════╗
echo    ║                                                                       ║
echo    ║         COLLEGE APPLICATION MANAGEMENT SYSTEM - LAUNCHER             ║
echo    ║                                                                       ║
echo    ╚═══════════════════════════════════════════════════════════════════════╝
echo.
echo    Starting Backend Server...
echo    URL: http://localhost:4000
echo.
echo    Starting Frontend Client...
echo    URL: http://localhost:8081
echo.
echo    ────────────────────────────────────────────────────────────────────────
echo.

REM Start server in a new window
start /high cmd /k "cd /d C:\Users\WELCOME\priya\collegeProject\collegeProject\server && title College App - Server (Port 4000) && npm run dev"

REM Wait for server to initialize
timeout /t 2 /nobreak

REM Start client in a new window
start /high cmd /k "cd /d C:\Users\WELCOME\priya\collegeProject\collegeProject && title College App - Client (Port 8081) && npm run dev"

timeout /t 2 /nobreak

echo.
echo    ✅ Both server and client have been started!
echo.
echo    Frontend:  http://localhost:8081
echo    Backend:   http://localhost:4000
echo.
echo    ────────────────────────────────────────────────────────────────────────
echo.
echo    Demo Credentials:
echo    Admin:    admin@college.edu / admin123
echo    Student:  ankit@student.com / student123
echo.
echo    ────────────────────────────────────────────────────────────────────────
echo.
pause
