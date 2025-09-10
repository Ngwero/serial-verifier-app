#!/usr/bin/env python3
"""
Simple launcher script for the Serial Number Verifier
"""

import os
import sys
import webbrowser
import time
import threading
from pathlib import Path

def check_dependencies():
    """Check if required packages are installed"""
    try:
        import flask
        import flask_cors
        return True
    except ImportError:
        print("❌ Missing dependencies. Installing...")
        os.system("pip install -r requirements.txt")
        return True

def open_browser():
    """Open browser after a short delay"""
    time.sleep(2)
    webbrowser.open('http://localhost:5000')

def main():
    """Main launcher function"""
    print("🚀 Starting Serial Number Verifier...")
    print("=" * 50)
    
    # Change to backend directory
    backend_dir = Path(__file__).parent / "backend"
    os.chdir(backend_dir)
    
    # Check dependencies
    if not check_dependencies():
        print("❌ Failed to install dependencies")
        return
    
    # Start browser in background
    browser_thread = threading.Thread(target=open_browser)
    browser_thread.daemon = True
    browser_thread.start()
    
    print("✅ Dependencies OK")
    print("🌐 Opening browser at http://localhost:5000")
    print("📱 Frontend-only version available at: frontend/index.html")
    print("=" * 50)
    print("Press Ctrl+C to stop the server")
    print("=" * 50)
    
    # Start the Flask app
    try:
        from app import app
        app.run(debug=False, host='0.0.0.0', port=5000)
    except KeyboardInterrupt:
        print("\n👋 Server stopped. Goodbye!")
    except Exception as e:
        print(f"❌ Error starting server: {e}")

if __name__ == "__main__":
    main()
