#!/bin/bash

# Temple Online Firebase - Development Startup Script

echo "🚀 Starting Temple Online Firebase System..."
echo ""

# Start frontend only (Firebase handles backend)
echo "⚛️  Starting React Frontend with Firebase..."
cd frontend

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "✅ .env file created."
    echo ""
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
    echo ""
fi

echo "🔥 Firebase configuration is set up directly in the app"
echo "📱 Starting React development server..."
npm start
