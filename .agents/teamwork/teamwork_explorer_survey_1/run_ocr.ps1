Add-Type -AssemblyName System.Drawing
[Windows.Globalization.Language, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null

$null = [System.Reflection.Assembly]::LoadWithPartialName("System.Runtime.WindowsRuntime")

$asTaskMethods = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 }
$asTaskIAsyncOp = $asTaskMethods | Where-Object { $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' }

function Await-WinRT($asyncOp, [Type]$type) {
    $specificMethod = $asTaskIAsyncOp.MakeGenericMethod($type)
    $task = $specificMethod.Invoke($null, @($asyncOp))
    $task.Wait()
    return $task.Result
}

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
if ($null -eq $engine) {
    $lang = New-Object Windows.Globalization.Language('en-US')
    $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($lang)
}
Write-Host "Engine: $($engine.RecognizerLanguage.LanguageTag)"

$dir = "C:\Users\SRI CHARAN\Documents\pic for talenflow design"
$outDir = "c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\teamwork_explorer_survey_1\ocr_results"
if (!(Test-Path -Path $outDir)) {
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null
}

$files = Get-ChildItem -Path $dir -Filter "*.png" | Sort-Object Name
foreach ($f in $files) {
    try {
        $file = Await-WinRT ([Windows.Storage.StorageFile]::GetFileFromPathAsync($f.FullName)) ([Windows.Storage.StorageFile])
        $stream = Await-WinRT ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
        $decoder = Await-WinRT ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
        $bitmap = Await-WinRT ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
        $result = Await-WinRT ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])

        $txtPath = Join-Path $outDir ($f.BaseName + ".txt")
        $lines = @()
        foreach ($l in $result.Lines) {
            $lines += $l.Text
        }
        [System.IO.File]::WriteAllLines($txtPath, $lines, [System.Text.Encoding]::UTF8)
        Write-Host "Processed $($f.Name): $($lines.Count) lines"
    } catch {
        Write-Host "Error on $($f.Name): $($_.Exception.Message)"
    }
}
Write-Host "All done!"
