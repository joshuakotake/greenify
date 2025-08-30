import React, { useEffect, useMemo, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapBoxMap({ routeCoordinates, mapStyle = "mapbox://styles/mapbox/streets-v12" }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const startMarkerRef = useRef(null);
  const endMarkerRef = useRef(null);

  const geojson = useMemo(() => ({
    type: "FeatureCollection",
    features: (routeCoordinates && routeCoordinates.length) ? [{
      type: "Feature",
      geometry: { type: "LineString", coordinates: routeCoordinates }
    }] : []
  }), [routeCoordinates]);

  // init once
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;
    mapboxgl.accessToken = TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: mapStyle,                         // ✅ Use Mapbox Streets (default)
      center: [151.205, -33.87],
      zoom: 12,
      attributionControl: true,                // (good practice for Streets)
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    mapRef.current = map;

    return () => {
      if (startMarkerRef.current) startMarkerRef.current.remove();
      if (endMarkerRef.current) endMarkerRef.current.remove();
      map.remove();
      mapRef.current = null;
    };
  }, [mapStyle]);

  // update route + markers whenever coordinates change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const hasRoute = geojson.features.length > 0;

    if (map.getLayer("route-line")) {
      map.removeLayer("route-line");
    }
    if (map.getSource("route")) {
      map.removeSource("route");
    }

    if (hasRoute) {
      map.addSource("route", { type: "geojson", data: geojson });
      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        paint: { "line-color": "#14532d", "line-width": 4, "line-opacity": 0.95 }
      });

      const start = routeCoordinates[0];
      const end = routeCoordinates[routeCoordinates.length - 1];

      // markers
      if (startMarkerRef.current) startMarkerRef.current.remove();
      if (endMarkerRef.current) endMarkerRef.current.remove();

      startMarkerRef.current = new mapboxgl.Marker({ color: "#16a34a" }).setLngLat(start).addTo(map);
      endMarkerRef.current   = new mapboxgl.Marker({ color: "#ef4444" }).setLngLat(end).addTo(map);

      // fit bounds
      const lons = routeCoordinates.map(([lon]) => lon);
      const lats = routeCoordinates.map(([, lat]) => lat);
      const bounds = new mapboxgl.LngLatBounds(
        [Math.min(...lons), Math.min(...lats)],
        [Math.max(...lons), Math.max(...lats)]
      );
      map.fitBounds(bounds, { padding: 40, duration: 500 });
    } else {
      // clear markers if no route
      if (startMarkerRef.current) { startMarkerRef.current.remove(); startMarkerRef.current = null; }
      if (endMarkerRef.current)   { endMarkerRef.current.remove();   endMarkerRef.current   = null; }
    }
  }, [geojson, routeCoordinates]);

  return <div className="map" style={{ height: 260 }} ref={containerRef} />;
}
