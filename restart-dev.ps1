Write-Host ""
Write-Host "[1/4] Identificando procesos node.exe del dev server de web-sara..." -ForegroundColor Yellow

$devProcesses = Get-CimInstance Win32_Process -Filter "name='node.exe'" | Where-Object {
    $_.CommandLine -match "web-sara|next dev|start-server\.js|npm-cli\.js run dev"
}

if ($devProcesses) {
    foreach ($p in $devProcesses) {
        Write-Host "      Matando PID $($p.ProcessId)" -ForegroundColor Gray
        taskkill /F /PID $p.ProcessId 2>&1 | Out-Null
    }
    Write-Host "      $($devProcesses.Count) procesos terminados." -ForegroundColor Green
} else {
    Write-Host "      No hay procesos node del dev server activos." -ForegroundColor Green
}

Write-Host ""
Write-Host "[2/4] Borrando cache .next..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "      .next eliminado." -ForegroundColor Green
} else {
    Write-Host "      .next no existe, nada que borrar." -ForegroundColor Green
}

Write-Host ""
Write-Host "[3/4] Verificando que no quedan procesos node de web-sara..." -ForegroundColor Yellow
Start-Sleep -Seconds 1
$remaining = Get-CimInstance Win32_Process -Filter "name='node.exe'" | Where-Object {
    $_.CommandLine -match "web-sara|next dev|start-server\.js"
}
if ($remaining) {
    Write-Host "      Aviso: aún quedan procesos. Matalos manualmente:" -ForegroundColor Red
    $remaining | ForEach-Object { Write-Host "         PID $($_.ProcessId)" -ForegroundColor Red }
} else {
    Write-Host "      Limpio." -ForegroundColor Green
}

Write-Host ""
Write-Host "[4/4] Arrancando dev server limpio..." -ForegroundColor Yellow
Write-Host "      Primera compilación puede tardar 30-90s. Espera el '✓ Ready'." -ForegroundColor Gray
Write-Host ""

npm run dev
