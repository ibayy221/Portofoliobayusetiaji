/**
 * Helper to extract YouTube Video ID from various YouTube URL formats
 * Supports standard watch URLs, short URLs, embeds, and YouTube Shorts.
 */
export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export function isYouTubeShorts(url: string): boolean {
  if (!url) return false;
  return url.toLowerCase().includes('/shorts/');
}

export function getYouTubeThumbnail(url: string): string | null {
  const videoId = getYouTubeId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
}

export function getAspectClass(url: string, manualAspect?: 'portrait' | 'landscape' | 'square'): string {
  if (manualAspect === 'portrait') return 'aspect-[9/16]';
  if (manualAspect === 'landscape') return 'aspect-video';
  if (manualAspect === 'square') return 'aspect-square';
  
  if (isYouTubeShorts(url)) return 'aspect-[9/16]';
  if (getYouTubeId(url)) return 'aspect-video';
  
  return 'aspect-[4/5]'; // Default portrait fit for portfolio images/videos
}
