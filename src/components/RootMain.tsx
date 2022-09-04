import { css } from "@emotion/react";
import { GoogleMap, InfoWindow, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";
import IconButton from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

const containerStyle = {
  height: "100vh",
};

const paths = [
  { lat: 35.65594936307533, lng: 139.76032917477343 },
  { lat: 35.655073751283, lng: 139.76192619938814 },
  { lat: 35.654979139372294, lng: 139.76245507044615 },
  { lat: 35.653115909626244, lng: 139.76107433258016 },
  { lat: 35.65339081351041, lng: 139.76046536518126 },
  { lat: 35.654116551724464, lng: 139.7611104278123 },
  { lat: 35.65456372688509, lng: 139.76034357027046 },
  { lat: 35.65594936307533, lng: 139.76032917477343 },
];

const initNebutas: Nebuta[] = [
  {
    id: 1,
    location: { lat: 35.65594936307533, lng: 139.76032917477343 },
    currentRoute: { currentIndex: 0, nextIndex: 1 },
  },
  {
    id: 2,
    location: { lat: 35.653115909626244, lng: 139.76107433258016 },
    currentRoute: { currentIndex: 3, nextIndex: 4 },
  },
  {
    id: 3,
    location: { lat: 35.65456372688509, lng: 139.76034357027046 },
    currentRoute: { currentIndex: 6, nextIndex: 7 },
  },
];

const options = {
  strokeColor: "#e10354",
  strokeOpacity: 1.0,
  strokeWeight: 4,
  fillColor: "#000000",
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
      const newNebutas = nebutas.map((nebuta) => {
        const newNebuta = nebuta;
        // id 1 の現在の経路を選ぶ ---------------------------------------
        // NOTE: 曲がり角を過ぎていたら次の経路を選ぶ
        // - lat: +, lng: +
        // - lat: +, lng: -
        // - lat: -, lng: +
        // - lat: -, lng: -
        const latPlus_lngPlus =
          paths[newNebuta.currentRoute.currentIndex].lat <= paths[newNebuta.currentRoute.nextIndex].lat &&
          paths[newNebuta.currentRoute.currentIndex].lng <= paths[newNebuta.currentRoute.nextIndex].lng;
        const latPlus_lngMinus =
          paths[newNebuta.currentRoute.currentIndex].lat <= paths[newNebuta.currentRoute.nextIndex].lat &&
          paths[newNebuta.currentRoute.currentIndex].lng >= paths[newNebuta.currentRoute.nextIndex].lng;
        const latMinus_lngPlus =
          paths[newNebuta.currentRoute.currentIndex].lat >= paths[newNebuta.currentRoute.nextIndex].lat &&
          paths[newNebuta.currentRoute.currentIndex].lng <= paths[newNebuta.currentRoute.nextIndex].lng;
        const latMinus_lngMinus =
          paths[newNebuta.currentRoute.currentIndex].lat >= paths[newNebuta.currentRoute.nextIndex].lat &&
          paths[newNebuta.currentRoute.currentIndex].lng >= paths[newNebuta.currentRoute.nextIndex].lng;

        if (latPlus_lngPlus) {
          if (
            newNebuta.location.lat >= paths[newNebuta.currentRoute.nextIndex].lat &&
            newNebuta.location.lng >= paths[newNebuta.currentRoute.nextIndex].lng
          ) {
            newNebuta.currentRoute.currentIndex = newNebuta.currentRoute.nextIndex;
            if (newNebuta.currentRoute.nextIndex >= paths.length - 1) {
              newNebuta.currentRoute.nextIndex = 1;
            } else {
              newNebuta.currentRoute.nextIndex = newNebuta.currentRoute.nextIndex + 1;
            }
          }
        } else if (latPlus_lngMinus) {
          if (
            newNebuta.location.lat >= paths[newNebuta.currentRoute.nextIndex].lat &&
            newNebuta.location.lng <= paths[newNebuta.currentRoute.nextIndex].lng
          ) {
            newNebuta.currentRoute.currentIndex = newNebuta.currentRoute.nextIndex % paths.length;
            if (newNebuta.currentRoute.nextIndex >= paths.length - 1) {
              newNebuta.currentRoute.nextIndex = 1;
            } else {
              newNebuta.currentRoute.nextIndex = newNebuta.currentRoute.nextIndex + 1;
            }
          }
        } else if (latMinus_lngPlus) {
          if (
            newNebuta.location.lat <= paths[newNebuta.currentRoute.nextIndex].lat &&
            newNebuta.location.lng >= paths[newNebuta.currentRoute.nextIndex].lng
          ) {
            newNebuta.currentRoute.currentIndex = newNebuta.currentRoute.nextIndex % paths.length;
            if (newNebuta.currentRoute.nextIndex >= paths.length - 1) {
              newNebuta.currentRoute.nextIndex = 1;
            } else {
              newNebuta.currentRoute.nextIndex = newNebuta.currentRoute.nextIndex + 1;
            }
          }
        } else if (latMinus_lngMinus) {
          if (
            newNebuta.location.lat <= paths[newNebuta.currentRoute.nextIndex].lat &&
            newNebuta.location.lng <= paths[newNebuta.currentRoute.nextIndex].lng
          ) {
            newNebuta.currentRoute.currentIndex = newNebuta.currentRoute.nextIndex % paths.length;
            if (newNebuta.currentRoute.nextIndex >= paths.length - 1) {
              newNebuta.currentRoute.nextIndex = newNebuta.currentRoute.nextIndex + 1;
            } else {
              newNebuta.currentRoute.nextIndex = newNebuta.currentRoute.nextIndex + 1;
            }
          }
        }

        const currentPoint = paths[newNebuta.currentRoute.currentIndex];
        const nextPoint = paths[newNebuta.currentRoute.nextIndex];
        // ---------------------------------------

        // id 1 のねぶたの移動方向を決定 -------------
        // (次の位置 - 現在地) / [500ms xOO]の OO の部分
        const xValue = (nextPoint.lat - currentPoint.lat) / 30;
        const yValue = (nextPoint.lng - currentPoint.lng) / 30;
        // ---------------------------------------

        // id 1 のねぶた位置を更新 ------------------
        const newLat = newNebuta.location.lat + xValue;
        const newLng = newNebuta.location.lng + yValue;
        newNebuta.location = { lat: newLat, lng: newLng };

        return newNebuta;
      });

      setNebutas(newNebutas);
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
      setNebutas(initNebutas);
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
                      onClick={() => setActiveMarker(nebuta.id)}
                      icon={{
                        url: "https://res.cloudinary.com/drb9hgnv3/image/upload/v1662210447/download_rchsic.png",
                        size: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25),
                        scaledSize: new google.maps.Size(50, 50),
                      }}
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
