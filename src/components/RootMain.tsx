import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const paths = [
  { lat: 35.6554412, lng: 139.7607679 },
  { lat: 35.6654412, lng: 139.7707679 },
  { lat: 35.6754412, lng: 139.7707679 },
  { lat: 35.6554412, lng: 139.7607679 },
];

const options = {
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  paths,
  zIndex: 1,
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
        { location: { lat: 35.67947366768189, lng: 139.75768552366762 } },
        { location: { lat: 35.68254732849531, lng: 139.75952000036554 } },
        { location: { lat: 35.68171691764521, lng: 139.76338857292788 } },
        { location: { lat: 35.678310832804, lng: 139.7622880838378 } },
      ]);
    })();
  }, []);

  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
            {/* Child components, such as markers, info windows, etc. */}
            {center ? (
              <>
                <Polyline path={paths} options={options} />
                {nebutas.map((nebuta, i) => (
                  <Marker
                    key={i}
                    position={nebuta.location}
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
