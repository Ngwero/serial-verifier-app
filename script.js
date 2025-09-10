class SerialVerifier {
    constructor() {
        this.serialNumbers = this.generateSerialNumbers();
        this.scannedBarcodes = [];
        this.validCount = 0;
        this.invalidCount = 0;
        this.duplicateCount = 0;
        this.isScanning = false;
        
        this.initializeElements();
        this.bindEvents();
        this.updateStats();
    }

    generateSerialNumbers() {
        return Array.from({length: 20000}, (_, i) => String(i + 1).padStart(5, '0'));
    }

    initializeElements() {
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
        this.searchInput = document.getElementById('searchInput');
        this.statusMessage = document.getElementById('statusMessage');
        this.historyList = document.getElementById('historyList');
        this.toast = document.getElementById('toast');
        
        // Scanner elements
        this.scanBtn = document.getElementById('scanBtn');
        this.scannerModal = document.getElementById('scannerModal');
        this.closeScannerBtn = document.getElementById('closeScannerBtn');
        this.startScanBtn = document.getElementById('startScanBtn');
        this.stopScanBtn = document.getElementById('stopScanBtn');
        this.scannerContainer = document.getElementById('scanner-container');
        
        this.validCountEl = document.getElementById('validCount');
        this.invalidCountEl = document.getElementById('invalidCount');
        this.duplicateCountEl = document.getElementById('duplicateCount');
    }

    bindEvents() {
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
        
        // Scanner events
        this.scanBtn.addEventListener('click', () => this.openScanner());
        this.closeScannerBtn.addEventListener('click', () => this.closeScanner());
        this.startScanBtn.addEventListener('click', () => this.startScanning());
        this.stopScanBtn.addEventListener('click', () => this.stopScanning());
        
        // Close scanner when clicking outside
        this.scannerModal.addEventListener('click', (e) => {
            if (e.target === this.scannerModal) {
                this.closeScanner();
            }
        });

        this.searchInput.addEventListener('input', (e) => {
            this.filterHistory(e.target.value);
        });
    }

    verifyTicket(ticketCode) {
        // Validate: Only 5 digits, numbers only
        if (!/^\d{5}$/.test(ticketCode)) {
            this.showStatus('Invalid ticket! Must be 5 digits', 'error');
            this.showToast('error', 'Ticket code must be exactly 5 digits');
            return;
        }

        // Check if already scanned
        if (this.scannedBarcodes.includes(ticketCode)) {
            this.duplicateCount++;
            this.showStatus('DUPLICATE TICKET!', 'error');
            this.showToast('error', `Ticket ${ticketCode} has already been scanned!`);
            this.updateStats();
            return;
        }

        // Add to scanned list
        this.scannedBarcodes.push(ticketCode);
        
        // All 5-digit codes are valid tickets
        this.validCount++;
        this.showStatus('Valid Ticket', 'success');
        this.showToast('success', `Ticket ${ticketCode} is valid! Entry granted.`);

        this.addToHistory(ticketCode, true);
        this.updateStats();
    }

    addToHistory(ticketCode, isValid) {
        const historyItem = document.createElement('div');
        historyItem.className = `history-item ${isValid ? 'valid' : 'invalid'}`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        
        historyItem.innerHTML = `
            <div class="history-serial">Ticket: ${ticketCode}</div>
            <div class="history-time">${timeString}</div>
        `;
        
        // Remove empty state if it exists
        const emptyState = this.historyList.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }
        
        this.historyList.insertBefore(historyItem, this.historyList.firstChild);
    }

    showStatus(message, type) {
        this.statusMessage.className = `status-message ${type}`;
        this.statusMessage.innerHTML = `
            <i class="fas fa-${this.getStatusIcon(type)}"></i>
            ${message}
        `;
    }

    getStatusIcon(type) {
        const icons = {
            'info': 'info-circle',
            'success': 'check-circle',
            'error': 'times-circle',
            'warning': 'exclamation-triangle'
        };
        return icons[type] || 'info-circle';
    }

    showToast(type, message) {
        const toastIcon = this.toast.querySelector('.toast-icon');
        const toastMessage = this.toast.querySelector('.toast-message');
        
        toastIcon.className = `toast-icon fas fa-${this.getStatusIcon(type)}`;
        toastMessage.textContent = message;
        
        this.toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 3000);
    }

    updateStats() {
        this.validCountEl.textContent = this.validCount;
        this.invalidCountEl.textContent = this.invalidCount;
        this.duplicateCountEl.textContent = this.duplicateCount;
    }

    // Removed clearEntry method - no manual input needed

    clearHistory() {
        if (confirm('Are you sure you want to clear all scan history?')) {
            this.historyList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <p>No scans yet. Start scanning to see history here.</p>
                </div>
            `;
            this.scannedBarcodes = [];
            this.validCount = 0;
            this.invalidCount = 0;
            this.duplicateCount = 0;
            this.updateStats();
            this.showStatus('History cleared', 'info');
        }
    }

    filterHistory(searchTerm) {
        const items = this.historyList.querySelectorAll('.history-item');
        const emptyState = this.historyList.querySelector('.empty-state');
        
        if (emptyState) return;
        
        items.forEach(item => {
            const serial = item.querySelector('.history-serial').textContent;
            if (serial.toLowerCase().includes(searchTerm.toLowerCase())) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Barcode Scanner Methods
    openScanner() {
        this.scannerModal.classList.add('show');
        this.showScannerStatus('Click "Start Scanning" to begin', 'info');
    }

    closeScanner() {
        this.stopScanning();
        this.scannerModal.classList.remove('show');
    }

    showScannerStatus(message, type) {
        // Remove existing status
        const existingStatus = this.scannerContainer.querySelector('.scanner-status');
        if (existingStatus) {
            existingStatus.remove();
        }

        // Add new status
        const statusDiv = document.createElement('div');
        statusDiv.className = `scanner-status ${type}`;
        statusDiv.textContent = message;
        this.scannerContainer.appendChild(statusDiv);
    }

    async startScanning() {
        if (this.isScanning) return;

        try {
            this.showScannerStatus('Initializing camera...', 'info');
            
            // Check if QuaggaJS is available
            if (typeof Quagga === 'undefined') {
                throw new Error('QuaggaJS library not loaded');
            }

            // Initialize QuaggaJS
            await new Promise((resolve, reject) => {
                Quagga.init({
                    inputStream: {
                        name: "Live",
                        type: "LiveStream",
                        target: this.scannerContainer,
                        constraints: {
                            width: 640,
                            height: 480,
                            facingMode: "environment" // Use back camera on mobile
                        }
                    },
                    decoder: {
                        readers: [
                            "code_128_reader",
                            "ean_reader",
                            "ean_8_reader",
                            "code_39_reader",
                            "code_39_vin_reader",
                            "codabar_reader",
                            "upc_reader",
                            "upc_e_reader",
                            "i2of5_reader"
                        ]
                    },
                    locate: true,
                    locator: {
                        patchSize: "medium",
                        halfSample: true
                    }
                }, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });

            // Start scanning
            Quagga.start();
            this.isScanning = true;
            
            // Update UI
            this.startScanBtn.style.display = 'none';
            this.stopScanBtn.style.display = 'inline-flex';
            this.showScannerStatus('Scanning... Position barcode within the frame', 'info');

            // Handle successful barcode detection
            Quagga.onDetected((data) => {
                const code = data.codeResult.code;
                this.handleScannedCode(code);
            });

        } catch (error) {
            console.error('Scanner initialization error:', error);
            this.showScannerStatus(`Error: ${error.message}`, 'error');
        }
    }

    stopScanning() {
        if (!this.isScanning) return;

        try {
            Quagga.stop();
            this.isScanning = false;
            
            // Update UI
            this.startScanBtn.style.display = 'inline-flex';
            this.stopScanBtn.style.display = 'none';
            this.showScannerStatus('Scanning stopped', 'info');
        } catch (error) {
            console.error('Error stopping scanner:', error);
        }
    }

    handleScannedCode(code) {
        // Clean up the scanned code
        const cleanCode = code.trim();
        
        // Validate: Only 5 digits, numbers only
        if (!/^\d{5}$/.test(cleanCode)) {
            this.showScannerStatus(`Invalid: ${cleanCode} (Must be 5 digits)`, 'error');
            return;
        }
        
        // Show success message
        this.showScannerStatus(`Scanned: ${cleanCode}`, 'success');
        
        // Auto-verify the scanned ticket
        setTimeout(() => {
            this.verifyTicket(cleanCode);
            this.closeScanner();
        }, 1000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SerialVerifier();
});

// Add some keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S to open scanner
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        const scanBtn = document.getElementById('scanBtn');
        if (scanBtn) scanBtn.click();
    }
    
    // Escape to close scanner
    if (e.key === 'Escape') {
        const scannerModal = document.getElementById('scannerModal');
        if (scannerModal && scannerModal.classList.contains('show')) {
            const closeBtn = document.getElementById('closeScannerBtn');
            if (closeBtn) closeBtn.click();
        }
    }
});
