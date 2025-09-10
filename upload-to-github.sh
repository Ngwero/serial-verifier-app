#!/bin/bash

echo "🚀 Starting GitHub upload process..."

# Navigate to Desktop
cd ~/Desktop

# Create project folder if it doesn't exist
mkdir -p serial-verifier-app
cd serial-verifier-app

# Initialize git
echo "📁 Initializing git repository..."
git init

# Create README
echo "📝 Creating README..."
echo "# serial-verifier-app" >> README.md

# Add README
git add README.md
git commit -m "first commit"

# Set main branch
git branch -M main

# Add remote origin
git remote add origin https://github.com/Ngwero/serial-verifier-app.git

# Push initial commit
echo "⬆️ Pushing initial commit..."
git push -u origin main

# Copy enhanced files
echo "📋 Copying enhanced files..."
cp /Users/user/serial-verifier-app/github-upload/* .

# Add all files
git add .

# Commit enhanced files
git commit -m "Enhanced Serial Number Verifier with Barcode Scanning"

# Push enhanced files
echo "⬆️ Pushing enhanced files..."
git push origin main

echo "✅ Upload complete! Visit: https://github.com/Ngwero/serial-verifier-app"
