@echo off
echo Starting the Auth App Server...
echo Please make sure you have Python installed on your system.
echo.
echo The application will open in your default browser...
timeout /t 3 >nul
start http://localhost:8000/login.html
python -m http.server 8000 --directory src/pages
