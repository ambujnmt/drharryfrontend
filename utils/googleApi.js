const GOOGLE_API_KEY = "AIzaSyCGi81o8d8qylLHwl4P7lN5OhCbYvML3Ls";

// Get Lat/Lng from address
export async function getLatLngFromAddress(address) {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`
  );
  const data = await res.json();

if (data.status !== "OK") {
  console.error("Geocode error:", data);
  throw new Error(data.error_message || data.status);
}


  const location = data.results[0].geometry.location;
  return { lat: location.lat, lng: location.lng };
}

// Get Timezone from lat/lng
export async function getTimezone(lat, lng) {
  const timestamp = Math.floor(Date.now() / 1000); // current epoch time
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${GOOGLE_API_KEY}`
  );
  const data = await res.json();

  if (data.status !== "OK") {
    throw new Error("Unable to fetch timezone");
  }

  const timezone = data.timeZoneId; // e.g., "Asia/Kolkata"

  // Convert offset (seconds) → "+05:30" format
  const totalOffsetSeconds = data.rawOffset + data.dstOffset;
  const offsetHours = Math.floor(totalOffsetSeconds / 3600);
  const offsetMinutes = Math.floor((totalOffsetSeconds % 3600) / 60);

  const tz_offset =
    (offsetHours >= 0 ? "+" : "-") +
    String(Math.abs(offsetHours)).padStart(2, "0") +
    ":" +
    String(Math.abs(offsetMinutes)).padStart(2, "0");

  return { timezone, tz_offset };
}
