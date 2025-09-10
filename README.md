# Serial Number Verifier

A modern web application for scanning and verifying serial numbers with duplicate detection.

## Features

- ✅ **Duplicate Detection**: Prevents scanning the same serial number twice
- 🎨 **Modern UI**: Beautiful, responsive web interface
- 📊 **Real-time Statistics**: Track valid, invalid, and duplicate scans
- 📝 **Scan History**: View and search through all previous scans
- 💾 **Data Persistence**: Automatically saves scan data
- 🔍 **Search Functionality**: Filter scan history
- 📱 **Mobile Responsive**: Works on desktop and mobile devices
- 📷 **Barcode Scanner**: Real-time barcode scanning with camera support
- ⌨️ **Keyboard Shortcuts**: Quick access to common functions

## Quick Start

### Option 1: Web Frontend Only (No Backend Required)

1. Open `frontend/index.html` in your web browser
2. Start scanning serial numbers!

### Option 2: Full Application with Backend API

1. **Install Dependencies**:
   ```bash
   cd serial-verifier-app/backend
   pip install -r ../requirements.txt
   ```

2. **Run the Application**:
   ```bash
   python app.py
   ```

3. **Open in Browser**:
   Navigate to `http://localhost:5000`

## Project Structure

```
serial-verifier-app/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── css/
│   │   └── style.css       # Modern CSS styling
│   └── js/
│       └── app.js          # Frontend JavaScript logic
├── backend/
│   ├── app.py              # Flask API server
│   └── data.json           # Persistent data storage (auto-created)
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## API Endpoints

- `POST /api/verify` - Verify a serial number
- `GET /api/stats` - Get current statistics
- `GET /api/history` - Get scan history
- `POST /api/clear` - Clear all history
- `GET /api/health` - Health check

## Usage

1. **Enter Serial Number**: Type or scan a 5-digit serial number (00001-20000)
2. **Verify**: Click "Verify" or press Enter
3. **Barcode Scanning**: Click "Scan" button to open camera scanner
4. **View Results**: See immediate feedback and updated statistics
5. **Check History**: View all previous scans with timestamps
6. **Search**: Use the search box to filter history

### Barcode Scanning

- Click the **"Scan"** button to open the barcode scanner
- Grant camera permissions when prompted
- Position the barcode within the scanning frame
- The scanner supports multiple barcode formats:
  - Code 128 (most common for serial numbers)
  - EAN-13, EAN-8
  - Code 39
  - UPC-A, UPC-E
  - Codabar
  - Interleaved 2 of 5
- Scanned codes are automatically verified and added to history

## Valid Serial Numbers

The system accepts serial numbers from `00001` to `20000` (5-digit format with leading zeros).

## Keyboard Shortcuts

- `Enter` - Verify current serial number
- `Ctrl/Cmd + K` - Focus on input field
- `Ctrl/Cmd + S` - Open barcode scanner
- `Escape` - Clear input field or close scanner

## Data Persistence

- Frontend-only version: Data is stored in browser memory (lost on refresh)
- Backend version: Data is automatically saved to `data.json` file

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Responsive design

## Development

To modify the application:

1. **Frontend**: Edit files in `frontend/` directory
2. **Backend**: Edit `backend/app.py` for API changes
3. **Styling**: Modify `frontend/css/style.css`
4. **Logic**: Update `frontend/js/app.js`

## License

This project is open source and available under the MIT License.
# serial-verifier-app
