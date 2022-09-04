import { css } from "@emotion/react";
import { GoogleMap, InfoWindow, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";
import IconButton from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

const containerStyle = {
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
  currentRoute: { currentIndex: number; nextIndex: number };
};

export const RootMain: React.FC = () => {
  const [center, setCenter] = useState<{ lat: number; lng: number }>();
  const [nebutas, setNebutas] = useState<Nebuta[]>([]);
  const [activeMarker, setActiveMarker] = useState<number | undefined>();
  const [activeNebutaDetal, setActiveNebutaDetal] = useState<number | undefined>();

  useInterval({
    onUpdate: () => {
      const newNebuta = nebutas[0];
      // id 1 の現在の経路を選ぶ ---------------------------------------
      // NOTE: 曲がり角を過ぎていたら次の経路を選ぶ
      if (paths[newNebuta.currentRoute.currentIndex].lat < paths[newNebuta.currentRoute.nextIndex].lat) {
        if (newNebuta.location.lat >= paths[newNebuta.currentRoute.nextIndex].lat) {
          // 次の経路をセット
          newNebuta.currentRoute = {
            currentIndex: newNebuta.currentRoute.nextIndex,
            nextIndex: newNebuta.currentRoute.nextIndex + 1,
          };
        }
      } else {
        if (newNebuta.location.lat <= paths[newNebuta.currentRoute.nextIndex].lat) {
          // 次の経路をセット
          newNebuta.currentRoute = {
            currentIndex: newNebuta.currentRoute.nextIndex,
            nextIndex: newNebuta.currentRoute.nextIndex + 1,
          };
        }
      }

      if (paths[newNebuta.currentRoute.currentIndex].lng < paths[newNebuta.currentRoute.nextIndex].lng) {
        if (newNebuta.location.lng >= paths[newNebuta.currentRoute.nextIndex].lng) {
          // 次の経路をセット
          newNebuta.currentRoute = {
            currentIndex: newNebuta.currentRoute.nextIndex,
            nextIndex: newNebuta.currentRoute.nextIndex + 1,
          };
        }
      } else {
        if (paths[newNebuta.currentRoute.currentIndex].lat <= paths[newNebuta.currentRoute.nextIndex].lat) {
          // 次の経路をセット
          newNebuta.currentRoute = {
            currentIndex: newNebuta.currentRoute.nextIndex,
            nextIndex: newNebuta.currentRoute.nextIndex + 1,
          };
        }
      }

      const currentPoint = paths[newNebuta.currentRoute.currentIndex];
      const nextPoint = paths[newNebuta.currentRoute.nextIndex];
      // ---------------------------------------

      console.log(currentPoint, nextPoint);
      // id 1 のねぶたの移動方向を決定 -------------
      // (次の位置 - 現在地) / [500ms xOO]の OO の部分
      const xValue = (nextPoint.lat - currentPoint.lat) / 30;
      const yValue = (nextPoint.lng - currentPoint.lng) / 30;
      // ---------------------------------------

      console.log(xValue, yValue);
      // id 1 のねぶた位置を更新 ------------------
      const newLat = nebutas[0].location.lat + xValue;
      const newLng = nebutas[0].location.lng + yValue;
      newNebuta.location = { lat: newLat, lng: newLng };
      // ---------------------------------------

      // setNebutas ----------------------------
      setNebutas([
        newNebuta,
        { id: 2, location: { lat: 35.6654412, lng: 139.7707679 }, currentRoute: { currentIndex: 0, nextIndex: 1 } },
        { id: 3, location: { lat: 35.6754412, lng: 139.7707679 }, currentRoute: { currentIndex: 0, nextIndex: 1 } },
      ]);
      // ---------------------------------------
    },
    interval: 500,
  });

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
        { id: 1, location: { lat: 35.6554412, lng: 139.7607679 }, currentRoute: { currentIndex: 0, nextIndex: 1 } },
        { id: 2, location: { lat: 35.6654412, lng: 139.7707679 }, currentRoute: { currentIndex: 0, nextIndex: 1 } },
        { id: 3, location: { lat: 35.6754412, lng: 139.7707679 }, currentRoute: { currentIndex: 0, nextIndex: 1 } },
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
                {
                  // ---------------------------------
                  // 経路を病後
                  // ---------------------------------
                }
                <Polyline path={paths} options={options} />

                {nebutas.map((nebuta) => (
                  <>
                    {
                      // ---------------------------------
                      // ねぶたのアイコンを描画
                      // ---------------------------------
                    }
                    <Marker
                      key={nebuta.id}
                      position={nebuta.location}
                      icon={{
                        url: "https://res.cloudinary.com/drb9hgnv3/image/upload/v1662210447/download_rchsic.png",
                        size: new google.maps.Size(100, 100),
                        anchor: new google.maps.Point(25, 25),
                        scaledSize: new google.maps.Size(50, 50),
                      }}
                      onClick={() => setActiveMarker(nebuta.id)}
                    />

                    {
                      // ---------------------------------
                      // popup を描画
                      // ---------------------------------
                    }
                    {activeMarker === nebuta.id && (
                      <InfoWindow position={nebuta.location} onCloseClick={() => setActiveMarker(undefined)}>
                        <>
                          <h3
                            css={css`
                              color: #333;
                              margin-bottom: 20px;
                            `}
                          >
                            {nebuta.id}. 東京都立芝商業高等学校
                          </h3>
                          <button
                            css={css`
                              text-align: right;
                            `}
                            onClick={() => setActiveNebutaDetal(nebuta.id)}
                          >
                            さらに詳しく
                          </button>
                        </>
                      </InfoWindow>
                    )}

                    {
                      // ---------------------------------
                      // 詳細モーダルを描画
                      // ---------------------------------
                    }
                    {activeNebutaDetal === nebuta.id && (
                      <div
                        css={css`
                          transition: 0.5s;
                          position: absolute;
                          top: 0;
                          left: 0;
                          width: 100%;
                          height: 100%;
                          background-color: #fff;
                          opacity: 0.9;
                          z-index: 100;
                        `}
                      >
                        <IconButton
                          aria-label="delete"
                          onClick={() => setActiveNebutaDetal(undefined)}
                          css={css`
                            position: absolute;
                            top: 3%;
                            right: 6%;
                          `}
                        >
                          <CloseIcon
                            css={css`
                              font-size: 48px;
                            `}
                          ></CloseIcon>
                        </IconButton>
                      </div>
                    )}
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

export const useInterval = ({ onUpdate, interval = 1000 }: { onUpdate: () => void; interval: number }) => {
  const onUpdateRef = useRef<() => void>(() => {});
  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);
  useEffect(() => {
    const timerId = setInterval(() => onUpdateRef.current(), interval);
    return () => clearInterval(timerId);
  }, []);
};
