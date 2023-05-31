import React from "react";
import { GeoJSON } from "react-leaflet";
import * as L from "leaflet";

const GeoJSONEl = ({ geojson }) => {
  // get a ref to the underlying L.geoJSON
  const geoJsonRef = React.useRef();
  // <GeoJsonObject></GeoJsonObject>
  // set the data to new data whenever it changes
  React.useEffect(() => {
    if (geoJsonRef.current) {
      geoJsonRef.current?.clearLayers(); // remove old data
      geoJsonRef.current?.addData(geojson); // might need to be geojson.features
    }
  }, [geoJsonRef, geojson]);

  const geojsonMarkerOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  };

  return (
    <div>
      <GeoJSON
        ref={geoJsonRef}
        data={geojson.features}
        style={function (geoJsonFeature) {
          // console.log(geoJsonFeature);
          return {};
        }}
        pointToLayer={function (geoJsonPoint, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup(
            "Awesome popup"
          );
        }}
        onEachFeature={function (feature, layer) {
          layer.on({
            click: function (e) {
              console.log(e);
            },
          });
          console.log(feature, "feature");
          layer.bindPopup(
            '<a href="http://some-url-to-call?mktid=' +
              feature.properties.code +
              '">' +
              feature.properties.Name +
              "</a>"
          );

          console.log(feature, "feature");
          console.log(layer, "layer");
        }}
      />
    </div>
  );
};

export default GeoJSONEl;
