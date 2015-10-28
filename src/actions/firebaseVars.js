import Firebase from 'firebase';
import GeoFire from 'geofire';

import { FIREBASE_ROOT, MEMORY_PATH, LOCATION_PATH } from 'constants/FirebasePaths.js';
export const FIREBASE_TIMESTAMP = Firebase.ServerValue.TIMESTAMP;

export const baseRef = new Firebase(FIREBASE_ROOT);
export const memoriesRef = baseRef.child(MEMORY_PATH);
export const geoRef = baseRef.child(LOCATION_PATH);

export const geoFire = new GeoFire(geoRef);

/* Default radius measured in km */

export const defaultRadius = 10;

/* Default center lat/long is currently Moscone Center */
// const defaultCenter = [37.783530, -122.402482];
export const defaultCenter = [25, 25];

