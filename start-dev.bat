@echo off
REM Temple Online Firebase - Development Startup Script for Windows

echo Starting Temple Online Firebase System...
echo.

REM Start frontend only (Firebase handles backend)
echo Starting React Frontend with Firebase...
cd frontend

REM Check if .env exists
if not exist .env (
    echo .env file not found. Creating from .env.example...
    copy .env.example .env
    echo .env file created.
    echo.
)

REM Check if node_modules exists
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
    echo.
)

echo Firebase configuration is set up directly in the app
echo Starting React development server...
call npm start
