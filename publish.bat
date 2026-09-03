@echo off
cd /d "%~dp0"
echo Publishing anvayyahealth-site to GitHub...
git push origin main
if %errorlevel% neq 0 (
  echo.
  echo Push failed - see the error above. If it mentions a sign-in window, complete that and run this again.
) else (
  echo.
  echo Done. Netlify will auto-deploy within a minute or two.
)
pause
