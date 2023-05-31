import React from "react";
import {
  FeatureGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import GeoJSONEl from "../components/GeoJSONEl";
import { CRS } from "leaflet";
import points from "../data/Point.json";
import lines from "../data/Lini.json";
import polygons from "../data/polygons.json";
import skvajina from "../data/skvajina.json";
import regions from "../data/Viloyatlar.json";
import { EditControl } from "react-leaflet-draw";

const Map = () => {
  const [zoom, setZoom] = React.useState(10);
  const [position, setPosition] = React.useState([
    38.458126079964785, 65.80552444969365,
  ]);
  const mapref = React.useRef();
  function _onCreate() {}
  function _onDelete() {}
  function _onEdit() {}
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <MapContainer
        crs={CRS.EPSG3857}
        className="map"
        zoom={zoom}
        center={{ lat: position[0], lng: position[1] }}
        scrollWheelZoom={true}
        style={{
          height: "100%",
          width: "100%",
        }}
        ref={mapref}
      >
        <LayersControl>
          <LayersControl.BaseLayer name="Open Street Map" checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Sattelite">
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              maxZoom={20}
              subdomains={["mt1", "mt2", "mt3"]}
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        <Marker position={{ lat: position[0], lng: position[1] }}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <FeatureGroup>
          <EditControl
            position="bottomright"
            onCreated={_onCreate}
            onDeleteStart={_onDelete}
            onEdited={_onEdit}
            draw={{
              rectangle: true,
              polyline: true,
              circle: true,
              circlemarker: false,
              marker: false,
            }}
          />
          <GeoJSONEl geojson={points.features} />
          <GeoJSONEl geojson={lines.features} />
          <GeoJSONEl geojson={polygons.features} />
          <GeoJSONEl geojson={skvajina.features} />
          <GeoJSONEl geojson={regions.features} />
        </FeatureGroup>
        {/* <GeoJSONEl geojson={countries?.features} /> */}

        {/* <GeoJSONEl geojson={districts.features} /> */}
      </MapContainer>
    </div>
  );
};

export default Map;
