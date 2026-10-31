'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Listing } from '../types';
import { formatPrice } from '@/lib/format';
import { ListingMiniCard } from './ListingMiniCard';

interface LeafletMapInnerProps {
  listings: Listing[];
  center: [number, number];
  zoom?: number;
  selectedId?: string | null;
  onSelectListing?: (listing: Listing) => void;
}

// Controller to smoothly fly to center when city changes
function ChangeView({ center, zoom = 12 }: { center: [number, number]; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
}

export default function LeafletMapInner({
  listings,
  center,
  zoom = 11,
  selectedId,
  onSelectListing,
}: LeafletMapInnerProps) {
  // Create custom Price-Label HTML Marker Pin
  const createPriceMarkerIcon = (price: number, isSelected: boolean) => {
    const formatted = formatPrice(price, true);
    return L.divIcon({
      className: 'custom-leaflet-marker-wrapper',
      html: `<div class="custom-price-pin ${isSelected ? 'active' : ''}">
               <span>${formatted}</span>
             </div>`,
      iconSize: [80, 32],
      iconAnchor: [40, 32],
      popupAnchor: [0, -32],
    });
  };

  return (
    <div className="relative w-full h-[520px] rounded-sm overflow-hidden border border-sand shadow-inner z-0">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <ChangeView center={center} zoom={zoom} />

        {/* Clean OpenStreetMap CartoDB Positron / OSM tiles for warm, elegant real estate look */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {listings.map((item) => {
          if (!item.coordinates?.lat || !item.coordinates?.lng) return null;
          const isSelected = item.id === selectedId;

          return (
            <Marker
              key={item.id}
              position={[item.coordinates.lat, item.coordinates.lng]}
              icon={createPriceMarkerIcon(item.price, isSelected)}
              eventHandlers={{
                click: () => {
                  if (onSelectListing) onSelectListing(item);
                },
              }}
            >
              <Popup className="custom-brick-popup" minWidth={260} maxWidth={300}>
                <div className="p-1">
                  <ListingMiniCard listing={item} />
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

