import { useEffect, useRef } from "react";
import L from "leaflet";
import type { TripPlanResult } from "../../features/trip/tripTypes";
import { Card } from "../common/Card";
import "leaflet/dist/leaflet.css";

export const RouteMap = ({ trip }: { trip: TripPlanResult }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const center = (trip.routePoints[0] ?? [39.5, -98.35]) as [number, number];
    const map = L.map(mapRef.current).setView(center, 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
    const routeColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-primary")
      .trim();
    L.polyline(trip.routePoints, { color: routeColor }).addTo(map);
    trip.routePoints.forEach((point) => L.marker(point).addTo(map));
    return () => {
      map.remove();
    };
  }, [trip.routePoints]);

  return (
    <Card className="overflow-hidden">
      <h3 className="app-text-primary mb-3 text-base font-semibold">Route Map</h3>
      <div ref={mapRef} className="h-[360px] overflow-hidden rounded-xl" />
    </Card>
  );
};
