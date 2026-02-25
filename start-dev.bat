@echo off
REM Temple Online Firebase - Development Startup Script for Windows

echo Starting Temple Online Firebase System...
echo.

REM Start backend server
echo Starting Firebase Backend API Server...
cd backend

REM Check if .env exists
if not exist .env (
    echo .env file not found. Creating from .env.example...
    copy .env.example .env
    echo .env file created. Please update it with your Firebase credentials.
    echo.
)

REM Check if node_modules exists
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
    echo.
)

start "Firebase Backend API" cmd /k npm run dev

REM Wait for backend to start
timeout /t 3 /nobreak > nul

REM Start frontend
echo Starting React Frontend...
cd ..\frontend

REM Check if .env exists
if not exist .env (
    echo .env file not found. Creating from .env.example...
    copy .env.example .env
    echo .env file created. Please update it with your Firebase credentials.
    echo.
)

REM Check if node_modules exists
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
    echo.
)

call npm start
