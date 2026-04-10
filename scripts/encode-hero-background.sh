#!/usr/bin/env bash
# Regénère public/hero-background.mp4 (diaporama ~4 s par image, boucle hero).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/public/db-photos"
ffmpeg -y \
  -loop 1 -t 4 -i image00028.webp \
  -loop 1 -t 4 -i image00014.webp \
  -loop 1 -t 4 -i image00011.webp \
  -loop 1 -t 4 -i image00018.webp \
  -loop 1 -t 4 -i image00015.webp \
  -filter_complex "[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080:(iw-1920)/2:(ih-1080)/2,format=yuv420p[v0];[1:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080:(iw-1920)/2:(ih-1080)/2,format=yuv420p[v1];[2:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080:(iw-1920)/2:(ih-1080)/2,format=yuv420p[v2];[3:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080:(iw-1920)/2:(ih-1080)/2,format=yuv420p[v3];[4:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080:(iw-1920)/2:(ih-1080)/2,format=yuv420p[v4];[v0][v1][v2][v3][v4]concat=n=5:v=1:a=0[out]" \
  -map "[out]" -c:v libx264 -preset medium -crf 22 -movflags +faststart -r 30 -an \
  "$ROOT/public/hero-background.mp4"
