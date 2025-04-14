# Electron Auth App

A cross-platform authentication and user management application with video recording capabilities.

## Features
- User Authentication (Login/Register)
- User Management Dashboard
- Record Management
- Video Recording and Playback
- User Activity Tracking

## Running the Application

### Windows Users
1. Double-click `start.bat`
2. The application will open in your default browser
3. If it doesn't open automatically, visit: http://localhost:8000/login.html

### Linux/Mac Users
```bash
# Start the server
python3 -m http.server 8000 --directory src/pages

# Then open in your browser
http://localhost:8000/login.html
```

## First Time Setup
1. Click "Create Account" on the login page
2. Use security code: 123456
3. Fill in your details
4. After registration, log in with your credentials

## System Requirements
- Python 3.x installed
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Camera and microphone access for video features

## Important Notes
- All data is stored locally in your browser
- Regular backups of browser data recommended
- Application works offline after initial load
- Default security code: 123456 (change in production)

## Features Available
1. User Management
   - Registration with security code
   - Login/Logout
   - User activity tracking
   - Account validity management

2. Dashboard
   - User statistics
   - Activity monitoring
   - System status

3. Records Management
   - Create and manage records
   - Categorize records
   - View record history

4. Video Features
   - Record video from camera
   - Playback recordings
   - Download recordings

## Troubleshooting
1. If the application doesn't start:
   - Make sure Python is installed
   - Check if port 8000 is available
   - Try running the server manually:
     ```bash
     python -m http.server 8000 --directory src/pages
     ```

2. If CSS is not loading:
   - Clear browser cache
   - Check internet connection (needed for initial load)
   - Refresh the page

3. If video features don't work:
   - Grant camera/microphone permissions
   - Use a modern browser
   - Check device drivers

## Security Notes
- Change the security code in production
- Data is stored in browser's localStorage
- Clear browser data to remove all application data
- No server-side storage is used
