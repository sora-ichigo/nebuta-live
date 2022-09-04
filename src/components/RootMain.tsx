import { GoogleMap, InfoWindow, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

const containerStyle = {
  width: "100vh",
  height: "100vh",
};

const paths = [
  { lat: 35.6554412, lng: 139.7607679 },
  { lat: 35.6654412, lng: 139.7707679 },
  { lat: 35.6754412, lng: 139.7707679 },
  { lat: 35.6758412, lng: 139.7707679 },
  { lat: 35.6759412, lng: 139.7708679 },
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

type Nebuta = {
  id: number;
  name?: string;
  location: {
    lat: number;
    lng: number;
  };
  active: boolean;
};

export const RootMain: React.FC = () => {
  const [center, setCenter] = useState<{ lat: number; lng: number }>();
  const [nebutas, setNebutas] = useState<Nebuta[]>([]);

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
        { id: 1, location: { lat: 35.6554412, lng: 139.7607679 }, active: true },
        { id: 2, location: { lat: 35.6654412, lng: 139.7707679 }, active: false },
        { id: 3, location: { lat: 35.6754412, lng: 139.7707679 }, active: false },
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
                <Polyline path={paths} options={options} />
                {nebutas.map((nebuta) => (
                  <>
                    <Marker
                      key={nebuta.id}
                      position={nebuta.location}
                      icon={{
                        url: "https://res.cloudinary.com/drb9hgnv3/image/upload/v1662210447/download_rchsic.png",
                        size: new google.maps.Size(100, 100),
                        anchor: new google.maps.Point(25, 25),
                        scaledSize: new google.maps.Size(50, 50),
                      }}
                    />
                  </>
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

// {nebuta.active && (
//                       <InfoWindow>
//                         <div>aaaaaaa</div>
//                       </InfoWindow>
//                     )}
//
