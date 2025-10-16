import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Configure default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface JobMapProps {
  location: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  jobTitle?: string;
}

export default function JobMap({ location, jobTitle }: JobMapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Default to Accra, Ghana if no coordinates provided
    const defaultLat = 5.6037;
    const defaultLng = -0.1870;
    
    const lat = location.coordinates?.lat || defaultLat;
    const lng = location.coordinates?.lng || defaultLng;
    
    // Ensure coordinates are valid numbers
    const validLat = isNaN(lat) || lat === 0 ? defaultLat : lat;
    const validLng = isNaN(lng) || lng === 0 ? defaultLng : lng;

    // Initialize map
    const map = L.map(mapRef.current).setView([validLat, validLng], 13);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add marker
    const marker = L.marker([validLat, validLng]).addTo(map);
    
    // Add popup
    marker.bindPopup(`
      <div style="text-align: center; padding: 4px;">
        <p style="font-weight: 600; margin-bottom: 4px;">${jobTitle || 'Job Location'}</p>
        <p style="font-size: 0.875rem; color: #6b7280;">${location.address}</p>
      </div>
    `);

    mapInstanceRef.current = map;

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [location.address, location.coordinates?.lat, location.coordinates?.lng, jobTitle]);

  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border shadow-sm">
      <div ref={mapRef} className="h-full w-full" />
      
      {/* Location label overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white pointer-events-none">
        <p className="text-sm font-medium flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {location.address}
        </p>
      </div>
    </div>
  );
}
