@echo off
title Push Nirvana Hospital Updates to GitHub
color 0A
echo ==============================================================
echo       NIRVANA HOSPITAL - 1-CLICK GITHUB SYNC
echo ==============================================================
echo.
echo Current Directory: %~dp0
echo Pushing 11+ commits with all mobile fixes and images to GitHub...
echo.

cd /d "%~dp0"
if exist "..\.gemini\antigravity\scratch\nirvanahospital1-repo" (
  cd /d "%~dp0..\..\.gemini\antigravity\scratch\nirvanahospital1-repo"
)

"C:\Users\fareed\AppData\Local\Programs\Git\cmd\git.exe" push origin main

echo.
if %ERRORLEVEL% EQU 0 (
  echo [SUCCESS] All updates, images, and mobile fixes have been pushed to GitHub!
  echo Your live website is now fully updated.
) else (
  echo [NOTE] If GitHub asked for login, please complete the sign-in prompt above.
)
echo.
pause
