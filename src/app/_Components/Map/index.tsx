import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import { useGlobalContext } from "@/app/context/globalContext";
import { useEffect } from "react";

export default function Map() {
  const { forecast } = useGlobalContext();

  const activeCityCords = forecast?.coord;

  if (!forecast || !forecast.coord || !activeCityCords) {
    return (
      <div className="flex-1 basis-[50%] border rounded-lg">
        <div className="animate-pulse rounded-lg m-4 h-80 bg-gray-300" />
      </div>
    );
  }
  function FlyToActiveCity({ activeCityCords }: { activeCityCords: any }) {
    const map = useMap();
    useEffect(() => {
      if (activeCityCords) {
        const zoomLev = 13;
        const flyToOptions = {
          duration: 1.5,
        };

        map.flyTo(
          [activeCityCords.lat, activeCityCords.lon],
          zoomLev,
          flyToOptions
        );
      }
    }, [activeCityCords, map]);

    return null;
  }

  return (
    <div className="flex-1 basis-[50%] border rounded-lg">
      <MapContainer
        center={[activeCityCords.lat, activeCityCords.lon]}
        zoom={13}
        scrollWheelZoom={false}
        className="rounded-lg m-4"
        style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <FlyToActiveCity activeCityCords={activeCityCords} />
      </MapContainer>
    </div>
  );
}
