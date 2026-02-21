# College App - Quick Start Scripts

## Batch Files for Easy Startup

You can now easily start the application using batch files (.bat) files without typing any commands!

### 📁 Available Scripts

#### 1. **start-both.bat** ⭐ (RECOMMENDED)
- **What it does**: Opens both server and client in separate command windows
- **Best for**: First time setup and normal development
- **Runtime**: ~30-60 seconds (includes npm install)
- **How to use**: Double-click on the desktop or folder
```
Visual: Opens 2 command windows
- Window 1: Backend server on http://localhost:4000
- Window 2: Frontend client on http://localhost:8081
```

#### 2. **start-server.bat**
- **What it does**: Starts only the backend Express server
- **Best for**: Running server separately or running client on different machine
- **Action**: 
  - cd to: `C:\Users\WELCOME\priya\collegeProject\collegeProject\server`
  - runs: `npm install && npm run dev`

#### 3. **start-client.bat**
- **What it does**: Starts only the frontend Vite development server
- **Best for**: Running client separately
- **Action**:
  - cd to: `C:\Users\WELCOME\priya\collegeProject\collegeProject`
  - runs: `npm install && npm run dev`

#### 4. **start-both-fast.bat** ⚡ (AFTER FIRST RUN)
- **What it does**: Opens both server and client (no npm install)
- **Best for**: Subsequent runs after initial setup
- **Runtime**: ~5-10 seconds (much faster!)
- **Note**: Use this ONLY after running start-both.bat once

#### 5. **start-server-fast.bat** ⚡
- **What it does**: Starts server quickly (no npm install)
- **Runtime**: ~2-3 seconds
- **Note**: Use only after dependencies installed

#### 6. **start-client-fast.bat** ⚡  
- **What it does**: Starts client quickly (no npm install)
- **Runtime**: ~2-3 seconds
- **Note**: Use only after dependencies installed

---

## 🚀 Quick Start Guide

### First Time Setup (with npm install)
1. **Double-click**: `start-both.bat`
2. **Wait**: ~30-60 seconds for npm install and startup
3. **Open browser**: 
   - Frontend: http://localhost:8081
   - Backend: http://localhost:4000/api/health

### Subsequent Runs (faster)
1. **Double-click**: `start-both-fast.bat`
2. **Wait**: ~5-10 seconds
3. **Open browser**: http://localhost:8081

---

## 📋 What Each Command Does

### start-both.bat (Full Setup)
```batch
cd /d C:\Users\WELCOME\priya\collegeProject\collegeProject\server
npm install
npm run dev
```
AND
```batch
cd /d C:\Users\WELCOME\priya\collegeProject\collegeProject
npm install
npm run dev
```

### start-both-fast.bat (Quick Restart)
```batch
cd /d C:\Users\WELCOME\priya\collegeProject\collegeProject\server
npm run dev
```
AND
```batch
cd /d C:\Users\WELCOME\priya\collegeProject\collegeProject
npm run dev
```

---

## ✅ Verification

Once both windows are running, you should see:

**Server Window:**
```
Server running on http://localhost:4000
```

**Client Window:**
```
Local:   http://localhost:8081/
Network: http://10.56.188.69:8081/
```

**In Browser:**
- Go to: http://localhost:8081
- You should see the College App home page

---

## 🔧 Troubleshooting

### Issue: Port 4000 or 8081 already in use
**Solution**: Kill existing process or use different port
```bash
# Find process on port 4000
netstat -ano | findstr :4000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Issue: npm command not found
**Solution**: Install Node.js from https://nodejs.org/

### Issue: "cd is not recognized"
**Solution**: These batch files MUST be run from Windows (not Git Bash)

### Issue: Permission denied
**Solution**: Right-click batch file → "Run as Administrator"

---

## 🎯 Recommended Workflow

1. **First time**: Double-click `start-both.bat`
2. **Restart server**: Keep using `start-both-fast.bat` (saves ~50 seconds)
3. **Only run server**: Use `start-server-fast.bat`
4. **Only run client**: Use `start-client-fast.bat`

---

## 📝 Created Date
February 21, 2026

## 📊 Performance
- Full setup (with npm install): ~40-60 seconds
- Quick restart (no npm install): ~5-10 seconds
- Server only (fast): ~2-3 seconds
- Client only (fast): ~2-3 seconds

---

## ❓ Need Help?

Check these files for more details:
- `FINAL_STATUS.md` - Complete project status
- `QUICK_TEST.md` - Testing guide
- `TEST_PLAN.md` - Test scenarios
- `BUG_REPORT.md` - Bug fixes applied

Happy coding! 🎉
