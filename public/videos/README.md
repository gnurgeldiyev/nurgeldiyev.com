# Social Events Videos

Place your vertical (portrait) videos in this directory.

## Video Requirements

- **Format**: MP4 (H.264 codec recommended for best browser compatibility)
- **Orientation**: Vertical/Portrait (9:16 aspect ratio recommended, like Instagram Stories/TikTok)
- **File naming**: `event-1.mp4`, `event-2.mp4`, etc.
- **Size**: Keep files under 10MB for fast loading
- **Duration**: 5-30 seconds recommended

## Video Behavior

Videos will:
- ✅ Autoplay automatically
- ✅ Loop continuously
- ✅ Be muted (no audio)
- ✅ Play inline on mobile devices
- ✅ Show title overlay on hover

## How to Add Videos

1. Export your video from your phone or editing software
2. Make sure it's in vertical/portrait orientation
3. Convert to MP4 if needed (use tools like HandBrake or online converters)
4. Rename to match your config (e.g., `event-1.mp4`)
5. Copy to this directory
6. Update `/config/content.ts` with the video paths

## Example

```typescript
// In config/content.ts
export const socialEvents = [
  {
    title: "Birthday Party 2024",
    videoUrl: "/videos/event-1.mp4",
    date: "Dec 2024",
  },
];
```

## Optimization Tips

For best performance:
- Compress videos using tools like HandBrake
- Target bitrate: 2-4 Mbps for vertical videos
- Resolution: 1080x1920 or 720x1280
- Remove audio track if not needed (saves file size)

## Alternative: Use Images

If you prefer static images instead of videos:

```typescript
export const socialEvents = [
  {
    title: "Birthday Party 2024",
    image: "/images/event-1.jpg", // Use image instead of videoUrl
    date: "Dec 2024",
  },
];
```
