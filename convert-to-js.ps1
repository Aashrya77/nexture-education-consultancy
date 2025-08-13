# PowerShell script to convert TSX/TS files to JSX/JS
param(
    [string]$ProjectPath = "c:\Users\ashry\Desktop\nexture-education"
)

Write-Host "Starting conversion from TypeScript to JavaScript..." -ForegroundColor Green

# Get all TSX and TS files (excluding node_modules and specific files)
$filesToConvert = Get-ChildItem -Path $ProjectPath -Recurse -Include "*.tsx", "*.ts" | 
    Where-Object { 
        $_.FullName -notlike "*node_modules*" -and 
        $_.Name -ne "next-env.d.ts" -and
        $_.Name -ne "tsconfig.json"
    }

Write-Host "Found $($filesToConvert.Count) files to convert" -ForegroundColor Yellow

foreach ($file in $filesToConvert) {
    $content = Get-Content $file.FullName -Raw
    
    # Remove TypeScript-specific imports and type annotations
    $content = $content -replace 'import type \{[^}]*\} from [^;]+;?\s*', ''
    $content = $content -replace 'import type [^;]+;?\s*', ''
    $content = $content -replace ': React\.ReactNode', ''
    $content = $content -replace ': ReactNode', ''
    $content = $content -replace ': React\.FC<[^>]*>', ''
    $content = $content -replace ': FC<[^>]*>', ''
    $content = $content -replace ': NextRequest', ''
    $content = $content -replace ': NextResponse', ''
    $content = $content -replace ': Metadata', ''
    $content = $content -replace 'export const metadata: Metadata', 'export const metadata'
    $content = $content -replace '\s*:\s*[A-Za-z_][A-Za-z0-9_<>\[\]|&\s]*(?=\s*[=,\)\{])', ''
    
    # Determine new file extension
    $newExtension = if ($file.Extension -eq ".tsx") { ".js" } else { ".js" }
    $newFileName = [System.IO.Path]::ChangeExtension($file.FullName, $newExtension)
    
    # Write converted content to new file
    Set-Content -Path $newFileName -Value $content -Encoding UTF8
    
    Write-Host "Converted: $($file.Name) -> $([System.IO.Path]::GetFileName($newFileName))" -ForegroundColor Cyan
}

Write-Host "Conversion completed!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Remove TypeScript configuration files" -ForegroundColor White
Write-Host "2. Update package.json dependencies" -ForegroundColor White
Write-Host "3. Test the application" -ForegroundColor White
