import { useParams } from "react-router-dom";
import { Badge } from "../components/common/Badge";
import { EmptyState } from "../components/common/EmptyState";
import { Loader } from "../components/common/Loader";
import { RouteMap } from "../components/trip/RouteMap";
import { StopsTimeline } from "../components/trip/StopsTimeline";
import { TripStatsGrid } from "../components/trip/TripStatsGrid";
import { TripSummaryCard } from "../components/trip/TripSummaryCard";
import { useGetTripByIdQuery } from "../services/tripApi";

export const TripDetailsPage = () => {
  const { id = "" } = useParams();
  const { data, isLoading, isError } = useGetTripByIdQuery(id, { skip: !id });

  if (isLoading) return <Loader />;
  if (isError) return <EmptyState message="Unable to load trip details." />;
  if (!data) return <EmptyState message="No trip selected." />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="app-text-primary text-xl font-semibold">{data.title}</h1>
        <Badge text={data.status} className="capitalize" />
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <RouteMap trip={data} />
          <StopsTimeline trip={data} />
        </div>
        <div className="space-y-4">
          <TripSummaryCard trip={data} />
          <TripStatsGrid trip={data} />
        </div>
      </div>
    </div>
  );
};
