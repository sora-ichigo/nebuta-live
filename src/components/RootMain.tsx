import { css } from "@emotion/react";
import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import InfoIcon from "@mui/icons-material/Info";
import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Link from "next/link";

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

export const dataset__nebutas: Nebuta[] = [
  {
    id: 1,
    name: "龍王",
    groupName: "豊田工業高等専門学校",
    location: { lat: 35.65594936307533, lng: 139.76032917477343 },
    imgUrl: "https://tabizine.jp/wp-content/uploads/2020/06/344535-01.jpg",
    currentRoute: { currentIndex: 0, nextIndex: 1 },
  },
  {
    id: 2,
    name: "龍王",
    groupName: "豊田工業高等専門学校",
    location: { lat: 35.653115909626244, lng: 139.76107433258016 },
    imgUrl: "https://res.cloudinary.com/drb9hgnv3/image/upload/v1662254189/unknown_ghbp9e.png",
    currentRoute: { currentIndex: 3, nextIndex: 4 },
  },
  {
    id: 3,
    name: "龍王",
    groupName: "豊田工業高等専門学校",
    location: { lat: 35.65456372688509, lng: 139.76034357027046 },
    imgUrl: "https://tabizine.jp/wp-content/uploads/2020/06/344535-01.jpg",
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

export type Nebuta = {
  id: number;
  name: string;
  groupName: string;
  imgUrl: string;
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
  const [isLoad, setIsLoad] = useState(false);

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
      setNebutas(dataset__nebutas);
    })();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(true);
    }, 300);
  }, []);
  const switchImage = (index: number) => {
    if (index === 0) {
      return "https://res.cloudinary.com/ds1kkhh4o/image/upload/v1662290251/download__1_-removebg-preview_a9qunv.png";
    } else if (index === 1) {
      return "https://res.cloudinary.com/ds1kkhh4o/image/upload/v1662289918/24275756-removebg-preview_jqioxx.png";
    } else {
      return "https://res.cloudinary.com/ds1kkhh4o/image/upload/v1662289900/download-removebg-preview_le2dn5.png";
    }
  };

  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={18}
            onClick={(v) => {
              setActiveMarker(undefined);
            }}
          >
            {/* Child components, such as markers, info windows, etc. */}
            {center && isLoad ? (
              <>
                {
                  // ---------------------------------
                  // 経路を病後
                  // ---------------------------------
                }
                <Polyline path={paths} options={options} />

                {nebutas.map((nebuta, index) => (
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
                        url: switchImage(index),
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
                      <div
                        css={css`
                          position: fixed;
                          overflow: scroll;
                          bottom: 0;
                          left: 0;
                          width: 100%;
                          height: 40%;
                          background-color: #f7f7f7;
                          padding-bottom: 30px;
                          box-shadow: 0px 0px 5px #8a8a8a;
                          border-radius: 10px 10px 0px 0px;
                        `}
                        onScroll={(e) => {
                          console.log("aaaaaaa");
                          console.log(e);
                        }}
                      >
                        <img
                          src={nebuta.imgUrl}
                          alt=""
                          css={css`
                            border-radius: 10px 10px 0px 0px;
                            width: 100%;
                            height: 150px;
                            object-fit: cover;
                          `}
                        />
                        <div
                          css={css`
                            padding: 8px 30px;
                          `}
                        >
                          <div
                            css={css`
                              width: 17%;
                              height: 2px;
                              margin: 0 auto 16px;
                              background: #c4c4c4;
                            `}
                          ></div>
                          <h3
                            css={css`
                              color: #333;
                              font-size: 26px;
                              font-weight: 700;
                              margin-bottom: 8px;
                            `}
                          >
                            {nebuta.id}.{` ${nebuta.name}`}
                          </h3>
                          <h4
                            css={css`
                              color: #6c6c6c;
                              font-size: 14px;
                              font-weight: 700;
                              margin-bottom: 28px;
                            `}
                          >
                            {nebuta.groupName}
                          </h4>

                          <Button
                            variant="contained"
                            disableElevation
                            onClick={() => setActiveNebutaDetal(nebuta.id)}
                            css={css`
                              font-size: 12px;
                              border-radius: 25px;
                            `}
                          >
                            <Link href={`/nebutas/${nebuta.id}`}>
                              <a
                                css={css`
                                  display: flex;
                                  align-items: center;
                                  color: inherit;
                                `}
                              >
                                <InfoIcon
                                  css={css`
                                    margin-right: 5px;
                                  `}
                                ></InfoIcon>
                                もっと見る
                              </a>
                            </Link>
                          </Button>
                        </div>
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
