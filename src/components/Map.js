import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

const API_Key = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
mapboxgl.accessToken = API_Key;

const Map = ({mapContainer,map,lat,setLat,lng,setLng,zoom,setZoom}) => {

     useEffect(() => {
if (map.current) return; // initialize map only once
map.current = new mapboxgl.Map({
     container: mapContainer.current,
     style: 'mapbox://styles/danwestfall/ckm70cxfd1tot17m894ctkfqv',
     center: [lng, lat],
     zoom: zoom
});
});

     return (
          <div ref={mapContainer} className="map-container" />
     )
}

export default Map
