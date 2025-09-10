from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

class SerialVerifierBackend:
    def __init__(self):
        self.serial_numbers = [str(i).zfill(5) for i in range(1, 20001)]
        self.scanned_barcodes = []
        self.valid_count = 0
        self.invalid_count = 0
        self.duplicate_count = 0
        self.scan_history = []
        
        # Load data from file if exists
        self.load_data()

    def verify_serial(self, serial_number):
        """Verify a serial number and return result"""
        result = {
            'serial_number': serial_number,
            'timestamp': datetime.now().isoformat(),
            'status': 'unknown',
            'message': '',
            'is_duplicate': False
        }

        # Check if already scanned
        if serial_number in self.scanned_barcodes:
            result['status'] = 'duplicate'
            result['message'] = 'Serial number has already been scanned'
            result['is_duplicate'] = True
            self.duplicate_count += 1
        else:
            # Add to scanned list
            self.scanned_barcodes.append(serial_number)
            
            # Check if valid
            if serial_number in self.serial_numbers:
                self.serial_numbers.remove(serial_number)
                result['status'] = 'valid'
                result['message'] = 'Serial number is valid'
                self.valid_count += 1
            else:
                result['status'] = 'invalid'
                result['message'] = 'Serial number is invalid'
                self.invalid_count += 1

        # Add to history
        self.scan_history.append(result)
        
        # Save data
        self.save_data()
        
        return result

    def get_stats(self):
        """Get current statistics"""
        return {
            'valid_count': self.valid_count,
            'invalid_count': self.invalid_count,
            'duplicate_count': self.duplicate_count,
            'total_scanned': len(self.scanned_barcodes),
            'remaining_valid': len(self.serial_numbers)
        }

    def get_history(self, limit=100):
        """Get scan history"""
        return self.scan_history[-limit:]

    def clear_history(self):
        """Clear all scan history and reset counters"""
        self.scanned_barcodes = []
        self.scan_history = []
        self.valid_count = 0
        self.invalid_count = 0
        self.duplicate_count = 0
        self.serial_numbers = [str(i).zfill(5) for i in range(1, 20001)]
        self.save_data()
        return {'message': 'History cleared successfully'}

    def save_data(self):
        """Save data to JSON file"""
        data = {
            'scanned_barcodes': self.scanned_barcodes,
            'valid_count': self.valid_count,
            'invalid_count': self.invalid_count,
            'duplicate_count': self.duplicate_count,
            'scan_history': self.scan_history,
            'serial_numbers': self.serial_numbers
        }
        
        try:
            with open('data.json', 'w') as f:
                json.dump(data, f, indent=2)
        except Exception as e:
            print(f"Error saving data: {e}")

    def load_data(self):
        """Load data from JSON file"""
        try:
            if os.path.exists('data.json'):
                with open('data.json', 'r') as f:
                    data = json.load(f)
                    self.scanned_barcodes = data.get('scanned_barcodes', [])
                    self.valid_count = data.get('valid_count', 0)
                    self.invalid_count = data.get('invalid_count', 0)
                    self.duplicate_count = data.get('duplicate_count', 0)
                    self.scan_history = data.get('scan_history', [])
                    self.serial_numbers = data.get('serial_numbers', [str(i).zfill(5) for i in range(1, 20001)])
        except Exception as e:
            print(f"Error loading data: {e}")

# Initialize the verifier
verifier = SerialVerifierBackend()

@app.route('/')
def serve_frontend():
    """Serve the frontend"""
    return send_from_directory('../frontend', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files"""
    return send_from_directory('../frontend', path)

@app.route('/api/verify', methods=['POST'])
def verify_serial():
    """Verify a serial number"""
    try:
        data = request.get_json()
        serial_number = data.get('serial_number', '').strip()
        
        if not serial_number:
            return jsonify({'error': 'Serial number is required'}), 400
        
        result = verifier.verify_serial(serial_number)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get current statistics"""
    try:
        stats = verifier.get_stats()
        return jsonify(stats)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/history', methods=['GET'])
def get_history():
    """Get scan history"""
    try:
        limit = request.args.get('limit', 100, type=int)
        history = verifier.get_history(limit)
        return jsonify(history)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/clear', methods=['POST'])
def clear_history():
    """Clear scan history"""
    try:
        result = verifier.clear_history()
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

if __name__ == '__main__':
    print("Starting Serial Number Verifier API...")
    print("Frontend available at: http://localhost:5000")
    print("API documentation:")
    print("  POST /api/verify - Verify a serial number")
    print("  GET  /api/stats - Get statistics")
    print("  GET  /api/history - Get scan history")
    print("  POST /api/clear - Clear history")
    print("  GET  /api/health - Health check")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
