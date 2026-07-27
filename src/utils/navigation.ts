/**
 * Automatic Device Detection & External Native Maps Deep Linking (Google Maps / Apple Maps)
 */
export function openExternalMapDirections(
  destLat: number,
  destLng: number,
  originLat?: number,
  originLng?: number
) {
  if (typeof window === 'undefined') return;

  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (isIOS) {
    let url = '';
    if (originLat !== undefined && originLng !== undefined) {
      url = `https://maps.apple.com/?saddr=${originLat},${originLng}&daddr=${destLat},${destLng}&dirflg=d`;
    } else {
      url = `https://maps.apple.com/?daddr=${destLat},${destLng}&dirflg=d`;
    }
    window.location.href = url;
  } else {
    let url = '';
    if (originLat !== undefined && originLng !== undefined) {
      url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=driving`;
    } else {
      url = `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}&travelmode=driving`;
    }
    window.open(url, '_blank');
  }
}
