import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { EmptyState } from "../components/common/EmptyState";
import { Loader } from "../components/common/Loader";
import { LogsCarousel } from "../components/logs/LogsCarousel";
import { useGetTripLogsQuery } from "../services/tripApi";

export const LogsPage = () => {
  const { id = "" } = useParams();
  const { data, isLoading, isError } = useGetTripLogsQuery(id, { skip: !id });
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!data?.length || isExporting) return;
    setIsExporting(true);
    try {
      const fileData = {
        tripId: id,
        exportedAt: new Date().toISOString(),
        logs: data,
      };
      const blob = new Blob([JSON.stringify(fileData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `eld-logs-${id}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      await new Promise((resolve) => setTimeout(resolve, 350));
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) return <Loader />;
  if (isError || !data) return <EmptyState message="No logs available for this trip." />;

  return (
    <div className="space-y-5">
      <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="app-text-primary text-xl font-semibold">ELD Logs</h1>
           
        </div>
        <Button type="button" onClick={handleExport} disabled={isExporting}>
          {isExporting ? (
            <span className="inline-flex items-center gap-2">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Exporting...
            </span>
          ) : (
            "Export Logs"
          )}
        </Button>
      </Card>
      <LogsCarousel logs={data} />
    </div>
  );
};
