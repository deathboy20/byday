/**
 * Utility functions for location handling
 */

import { LocationData } from '@/types/database';

/**
 * Parse location from database (can be string or object)
 */
export const parseLocation = (location: string | LocationData | null | undefined): LocationData => {
  if (!location) {
    return {
      address: 'Location not specified',
      coordinates: { lat: 0, lng: 0 },
    };
  }

  if (typeof location === 'string') {
    try {
      const parsed = JSON.parse(location);
      return {
        address: parsed.address || location,
        coordinates: parsed.coordinates || { lat: 0, lng: 0 },
      };
    } catch {
      return {
        address: location,
        coordinates: { lat: 0, lng: 0 },
      };
    }
  }

  return {
    address: location.address || 'Location not specified',
    coordinates: location.coordinates || { lat: 0, lng: 0 },
  };
};

/**
 * Get location string from LocationData
 */
export const getLocationString = (location: string | LocationData | null | undefined): string => {
  const parsed = parseLocation(location);
  return parsed.address;
};

/**
 * Stringify location for database storage
 */
export const stringifyLocation = (address: string, lat: number = 0, lng: number = 0): string => {
  return JSON.stringify({
    address,
    coordinates: { lat, lng },
  });
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};
