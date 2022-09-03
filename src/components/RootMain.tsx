import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

const containerStyle = {
  width: "100vh",
  height: "100vh",
};

export const RootMain: React.FC = () => {
  const [center, setCenter] = useState<{ lat: number; lng: number }>();
  const [nebutas, setNebutas] = useState<{ location: { lat: number; lng: number } }[]>([]);

  useEffect(() => {
    (async () => {
      const s = await getCurrentPosition();
      setCenter({
        lat: s.coords.latitude,
        lng: s.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setNebutas([
        { location: { lat: 35.6554412, lng: 139.7607679 } },
        { location: { lat: 35.6654412, lng: 139.7707679 } },
        { location: { lat: 35.6754412, lng: 139.7707679 } },
      ]);
    })();
  });

  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
            {/* Child components, such as markers, info windows, etc. */}
            {center ? (
              <>
                {nebutas.map((nebuta, i) => (
                  <Marker
                    key={i}
                    position={nebuta.location}
                    label="1"
                    icon={{
                      url: "https://res.cloudinary.com/drb9hgnv3/image/upload/v1662210447/download_rchsic.png",
                      size: new google.maps.Size(100, 100),
                      anchor: new google.maps.Point(17, 46),
                      scaledSize: new google.maps.Size(37, 37),
                    }}
                  />
                ))}
              </>
            ) : null}
          </GoogleMap>
        </LoadScript>
      )}
    </>
  );
};

const getCurrentPosition = () => {
  return new Promise(
    (resolve: (value: GeolocationPosition) => void, reject: (reason: GeolocationPositionError) => void) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  );
};
