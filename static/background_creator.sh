START_TIME=00:00:30
DURATION=00:00:54
INPUT=input.mp4

ffmpeg -i "$INPUT" -ss $START_TIME -t $DURATION \
  -c:v libx264 -crf 35 -preset veryslow -b:v 0 -an -vf "scale=960x540" -r 24 \
  background_h264.mp4
ffmpeg -i "$INPUT" -ss $START_TIME -t $DURATION \
  -c:v libvpx-vp9 -crf 55 -preset 5 -b:v 0 -deadline good -an -vf "scale=960x540" -r 24 -cpu-used 0 \
  background_vp9.webm
ffmpeg -i "$INPUT" -ss $START_TIME -t $DURATION \
  -c:v libsvtav1 -crf 55 -preset 5 -b:v 0 -an -vf "scale=960x540" -r 24 \
  background_av1.webm