# 🎫 Concert Ticket Scanner

A modern web application for scanning concert tickets with duplicate detection and real-time barcode scanning capabilities.

## ✨ Features

- **📷 Real-time Barcode Scanning**: Use your device's camera to scan concert tickets instantly
- **✅ Duplicate Detection**: Prevents scanning the same ticket twice
- **🎨 Modern UI**: Beautiful, responsive web interface with professional scanner modal
- **📊 Real-time Statistics**: Track valid tickets and duplicate attempts
- **📝 Scan History**: View and search through all previous ticket scans with timestamps
- **💾 Data Persistence**: Automatically saves scan data in browser memory
- **🔍 Search Functionality**: Filter scan history by ticket code
- **📱 Mobile Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **⌨️ Keyboard Shortcuts**: Quick access to scanner (Ctrl+S)
- **🎯 Multiple Barcode Formats**: Supports Code 128, EAN, UPC, Code 39, and more

## 🚀 Quick Start

### Option 1: Direct Browser Usage
1. Open `index.html` in your web browser
2. Start scanning serial numbers immediately!

### Option 2: Local Server (Recommended)
1. Serve the files using a local web server
2. For best results, use HTTPS (required for camera access)

## 📖 How to Use

### 1. Scan Concert Tickets
1. Click the **"Scan Concert Ticket"** button (large green button)
2. Grant camera permissions when prompted
3. Position the ticket barcode within the scanning frame
4. The scanner will automatically detect and verify the ticket
5. Results are added to the scan history automatically

### 2. View History
- All ticket scans are displayed in the history section
- Use the search box to filter by ticket code
- Click "Clear History" to reset all data

## 🎯 Supported Barcode Formats

The scanner supports multiple barcode formats:
- **Code 128** (most common for concert tickets)
- **EAN-13, EAN-8**
- **Code 39, Code 39 VIN**
- **UPC-A, UPC-E**
- **Codabar**
- **Interleaved 2 of 5**

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + S` - Open barcode scanner
- `Escape` - Close scanner

## 🔧 Technical Details

### Libraries Used
- **QuaggaJS**: For real-time barcode scanning functionality
- **Font Awesome**: For beautiful icons
- **Vanilla JavaScript**: For application logic
- **Modern CSS**: For responsive design and animations

### Browser Requirements
- Modern browser with camera support (Chrome, Firefox, Safari, Edge)
- HTTPS connection (required for camera access in most browsers)
- JavaScript enabled

### File Structure
```
barcode-scanner-app/
├── index.html          # Main HTML file
├── styles.css          # CSS styling with scanner modal
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎨 UI Features

### Scanner Modal
- **Professional Interface**: Clean, modern scanner modal
- **Visual Feedback**: Real-time status messages and instructions
- **Responsive Design**: Adapts to different screen sizes
- **Easy Controls**: Start/stop scanning with clear buttons

### Statistics Dashboard
- **Live Counters**: Valid, invalid, and duplicate scan counts
- **Visual Cards**: Color-coded statistics with icons
- **Real-time Updates**: Statistics update instantly with each scan

### History Management
- **Chronological List**: All scans displayed with timestamps
- **Search Functionality**: Filter history by serial number
- **Visual Indicators**: Color-coded entries (green for valid, red for invalid)
- **Clear All**: Reset all data with confirmation

## 🛠️ Troubleshooting

### Camera Not Working
- Ensure you're using HTTPS (required for camera access)
- Check that camera permissions are granted
- Try refreshing the page and allowing permissions again
- Make sure no other applications are using the camera

### Barcode Not Detecting
- Ensure good lighting conditions
- Hold the barcode steady and at an appropriate distance
- Make sure the barcode is clearly visible and not damaged
- Try different angles or distances
- Ensure the barcode is within the scanning frame

### Mobile Issues
- Use a modern mobile browser (Chrome, Safari, Firefox)
- Ensure the website is served over HTTPS
- Try rotating your device for better camera positioning
- Grant camera permissions when prompted

## 🔄 Data Management

### Browser Storage
- Data is stored in browser memory (localStorage)
- Data persists between browser sessions
- Use "Clear History" to reset all data
- Data is lost if browser cache is cleared

### Valid Ticket Codes
- The system accepts exactly 5-digit numbers (00000-99999)
- Only numbers are allowed (no letters or special characters)
- All 5-digit codes are considered valid tickets
- Duplicate tickets are detected and rejected

## 🎯 Use Cases

- **Concert Entry**: Scan tickets at venue entrances
- **Event Management**: Track ticket usage and prevent duplicates
- **Security**: Ensure only valid tickets gain entry
- **Analytics**: Monitor attendance and scan patterns
- **Mobile Check-in**: Use on phones/tablets for quick scanning

## 🚀 Development

To modify or extend this application:

1. **Add new barcode formats**: Modify the `readers` array in the Quagga configuration
2. **Customize styling**: Edit `styles.css` for different visual themes
3. **Add features**: Extend the `SerialVerifier` class in `script.js`
4. **Modify validation**: Update the `generateSerialNumbers()` function
5. **Add data persistence**: Implement backend API integration

## 📱 Mobile Optimization

- **Responsive Design**: Adapts to all screen sizes
- **Touch-Friendly**: Large buttons and touch targets
- **Camera Integration**: Uses back camera on mobile devices
- **Performance**: Optimized for mobile browsers
- **Offline Support**: Works without internet connection

## 🔒 Privacy & Security

- **No Data Collection**: All data stays in your browser
- **No Server Communication**: Fully client-side application
- **Camera Access**: Only used for barcode scanning
- **Local Storage**: Data never leaves your device

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure your browser supports camera access
3. Verify you're using HTTPS
4. Check browser console for error messages

---

**Made with ❤️ for efficient serial number verification and barcode scanning**
