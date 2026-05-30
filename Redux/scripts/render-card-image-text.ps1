param(
  [int[]]$OfficialIds = @(
    72989439, 69243953, 4031928, 69015963, 3897065, 76263644, 53129443,
    23557835, 40044918, 40044919, 93369354, 27970830, 85602018, 34206604,
    74191942, 82732705, 84749824, 52687916, 3078576, 12580477,
    83764718, 83764719, 79571449, 9126351
  ),
  [int[]]$UnofficialIds = @(
    511002993, 511000819, 511001039, 511000229, 511003116, 511002996,
    511003019, 511002992, 511000824, 511000825, 511002631,
    511000818, 511003012
  )
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$repoRoot = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..\..")
$assetsDir = Join-Path $repoRoot "Redux\assets\pics"
$cacheDir = Join-Path $repoRoot "pics"

New-Item -ItemType Directory -Force -Path $assetsDir | Out-Null

$officialIdsJson = $OfficialIds -join ","
$unofficialIdsJson = $UnofficialIds -join ","
$metadataScript = @"
const { DatabaseSync } = require("node:sqlite");
const officialIds = [$officialIdsJson];
const unofficialIds = [$unofficialIdsJson];
const jobs = [
  ["Redux/modded/cards.cdb", officialIds],
  ["Redux/modded/cards-unofficial.cdb", unofficialIds],
];
const rows = [];
for (const [dbPath, ids] of jobs) {
  const db = new DatabaseSync(dbPath);
  const stmt = db.prepare("SELECT texts.id, texts.name, texts.desc, datas.type FROM texts JOIN datas ON datas.id = texts.id WHERE texts.id = ?");
  for (const id of ids) {
    const row = stmt.get(id);
    if (!row) throw new Error("Missing card metadata for " + id);
    rows.push(row);
  }
  db.close();
}
console.log(JSON.stringify(rows));
"@

$metadataPath = Join-Path ([System.IO.Path]::GetTempPath()) "redux-card-image-metadata.cjs"
[System.IO.File]::WriteAllText($metadataPath, $metadataScript)
$metadataJson = node $metadataPath
Remove-Item -LiteralPath $metadataPath -Force
$cards = $metadataJson | ConvertFrom-Json

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality,
  [int64]96
)

function Get-SourcePath([int]$id) {
  $candidates = @(
    (Join-Path $assetsDir "$id.jpg"),
    (Join-Path $cacheDir "$id.jpg")
  )

  foreach ($candidate in $candidates) {
    if (Test-Path -LiteralPath $candidate) {
      return (Resolve-Path -LiteralPath $candidate).Path
    }
  }

  return $null
}

function Get-WrappedLines(
  [System.Drawing.Graphics]$graphics,
  [string]$text,
  [System.Drawing.Font]$font,
  [int]$maxWidth
) {
  $output = New-Object System.Collections.Generic.List[string]
  $paragraphs = ($text -replace "`r`n", "`n" -replace "`r", "`n") -split "`n"

  foreach ($paragraph in $paragraphs) {
    if ([string]::IsNullOrWhiteSpace($paragraph)) {
      $output.Add("")
      continue
    }

    $line = ""
    foreach ($word in ($paragraph -split " ")) {
      $candidate = if ($line.Length -eq 0) { $word } else { "$line $word" }
      if ($graphics.MeasureString($candidate, $font).Width -le $maxWidth -or $line.Length -eq 0) {
        $line = $candidate
      } else {
        $output.Add($line)
        $line = $word
      }
    }

    if ($line.Length -gt 0) {
      $output.Add($line)
    }
  }

  return $output
}

function Get-LightAverageBrush(
  [System.Drawing.Bitmap]$bitmap,
  [System.Drawing.Rectangle]$rect
) {
  [int64]$r = 0
  [int64]$g = 0
  [int64]$b = 0
  [int64]$count = 0
  $stepX = [Math]::Max(1, [int]($rect.Width / 90))
  $stepY = [Math]::Max(1, [int]($rect.Height / 45))

  for ($y = $rect.Top; $y -lt $rect.Bottom; $y += $stepY) {
    for ($x = $rect.Left; $x -lt $rect.Right; $x += $stepX) {
      $pixel = $bitmap.GetPixel($x, $y)
      $brightness = ([int]$pixel.R + [int]$pixel.G + [int]$pixel.B) / 3
      if ($brightness -gt 135) {
        $r += $pixel.R
        $g += $pixel.G
        $b += $pixel.B
        $count++
      }
    }
  }

  if ($count -eq 0) {
    return New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(224, 238, 226))
  }

  $color = [System.Drawing.Color]::FromArgb(
    [Math]::Min(255, [int]($r / $count) + 3),
    [Math]::Min(255, [int]($g / $count) + 3),
    [Math]::Min(255, [int]($b / $count) + 3)
  )
  return New-Object System.Drawing.SolidBrush($color)
}

function Get-TextLayout([int]$width, [int]$height, [int64]$type) {
  $isSpellOrTrap = (($type -band 0x2) -ne 0) -or (($type -band 0x4) -ne 0)

  if ($isSpellOrTrap) {
    return @{
      Patch = New-Object System.Drawing.Rectangle(
        [int]($width * 0.073),
        [int]($height * 0.744),
        [int]($width * 0.854),
        [int]($height * 0.196)
      )
      TextX = [int]($width * 0.079)
      TextY = [int]($height * 0.756)
      TextW = [int]($width * 0.825)
      TextH = [int]($height * 0.170)
      StartFont = [float]($height * 0.020)
      MinFont = [float]($height * 0.011)
      IsMonster = $false
    }
  }

  return @{
    Patch = New-Object System.Drawing.Rectangle(
      [int]($width * 0.074),
      [int]($height * 0.775),
      [int]($width * 0.850),
      [int]($height * 0.138)
    )
    TextX = [int]($width * 0.080)
    TextY = [int]($height * 0.780)
    TextW = [int]($width * 0.825)
    TextH = [int]($height * 0.112)
    StartFont = [float]($height * 0.018)
    MinFont = [float]($height * 0.009)
    IsMonster = $true
  }
}

$missing = New-Object System.Collections.Generic.List[int]
$rendered = New-Object System.Collections.Generic.List[object]

foreach ($card in $cards) {
  $source = Get-SourcePath ([int]$card.id)
  if ($null -eq $source) {
    $missing.Add([int]$card.id)
    continue
  }

  $output = Join-Path $assetsDir "$($card.id).jpg"
  $bytes = [System.IO.File]::ReadAllBytes($source)
  $inputStream = New-Object System.IO.MemoryStream @(,$bytes)
  $src = [System.Drawing.Image]::FromStream($inputStream)
  $bitmap = New-Object System.Drawing.Bitmap($src.Width, $src.Height, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $graphics.DrawImage($src, 0, 0, $src.Width, $src.Height)

  $layout = Get-TextLayout $src.Width $src.Height ([int64]$card.type)
  $background = Get-LightAverageBrush $bitmap $layout.Patch
  $graphics.FillRectangle($background, $layout.Patch)
  $background.Dispose()

  $fontSize = [float]$layout.StartFont
  $font = $null
  do {
    if ($font) { $font.Dispose() }
    $font = New-Object System.Drawing.Font("Times New Roman", $fontSize, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
    $lines = Get-WrappedLines $graphics ([string]$card.desc) $font ([int]$layout.TextW)
    $lineHeight = [int][Math]::Ceiling($font.GetHeight($graphics) * 1.02)
    $totalHeight = $lines.Count * $lineHeight
    if ($totalHeight -le $layout.TextH) { break }
    $fontSize -= [float]0.75
  } while ($fontSize -ge $layout.MinFont)

  $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::Black)
  $y = [int]$layout.TextY
  foreach ($line in $lines) {
    $graphics.DrawString($line, $font, $brush, [float]$layout.TextX, [float]$y)
    $y += $lineHeight
  }

  if ($layout.IsMonster) {
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::Black, [Math]::Max(1.0, $src.Height * 0.002))
    $lineY = [int]($src.Height * 0.912)
    $graphics.DrawLine(
      $pen,
      [int]($src.Width * 0.074),
      $lineY,
      [int]($src.Width * 0.920),
      $lineY
    )
    $pen.Dispose()
  }

  $out = New-Object System.IO.MemoryStream
  $bitmap.Save($out, $jpegCodec, $encoderParams)
  $brush.Dispose()
  $font.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
  $src.Dispose()
  $inputStream.Dispose()
  [System.IO.File]::WriteAllBytes($output, $out.ToArray())
  $out.Dispose()

  $rendered.Add([PSCustomObject]@{
    Id = [int]$card.id
    Name = [string]$card.name
    Bytes = [int](Get-Item -LiteralPath $output).Length
    FontSize = [Math]::Round($fontSize, 2)
    Lines = $lines.Count
  })
}

$rendered | Format-Table -AutoSize
if ($missing.Count -gt 0) {
  throw "Missing source image(s): $($missing -join ', ')"
}
