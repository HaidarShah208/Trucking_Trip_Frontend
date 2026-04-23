import type { DailyLog } from "../../features/trip/tripTypes";
import { Card } from "../common/Card";
import { DutyStatusGrid } from "./DutyStatusGrid";

const SEGMENTS = [
  { key: "offDuty", label: "Off Duty", color: "bg-slate-300" },
  { key: "sleeperBerth", label: "Sleeper Berth", color: "bg-indigo-300" },
  { key: "driving", label: "Driving", color: "bg-sky-500" },
  { key: "onDuty", label: "On Duty", color: "bg-amber-400" },
] as const;

export const DailyLogSheet = ({ log }: { log: DailyLog }) => {
  const totalHours = 24;
  const usageHours = log.offDuty + log.sleeperBerth + log.driving + log.onDuty;

  return (
    <Card className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div>
          <h3 className="app-text-primary text-lg font-semibold">Day {log.day} ELD Log Sheet</h3>
          <p className="app-text-secondary text-sm">{log.date}</p>
        </div>
        <div className="app-surface-soft app-border rounded-xl border px-3 py-2 text-right">
          <p className="app-text-muted text-[11px] uppercase tracking-wide">Daily utilization</p>
          <p className="app-text-primary text-sm font-semibold">
            {usageHours.toFixed(1)}h logged / {totalHours}h
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="app-text-secondary text-sm font-medium">Duty timeline distribution</p>
        <div className="app-border app-surface-soft overflow-hidden rounded-xl border">
          <div className="flex h-6 w-full">
            {SEGMENTS.map((segment) => {
              const hours = log[segment.key];
              const width = `${Math.max((hours / totalHours) * 100, hours > 0 ? 4 : 0)}%`;
              return <div key={segment.key} className={segment.color} style={{ width }} title={`${segment.label}: ${hours.toFixed(1)}h`} />;
            })}
          </div>
        </div>
        <div className="app-text-muted flex items-center justify-between text-[11px] font-medium">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {SEGMENTS.map((segment) => {
            const hours = log[segment.key];
            const percent = (hours / totalHours) * 100;
            return (
              <div key={segment.key} className="app-surface-soft app-border flex items-center justify-between rounded-lg border px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${segment.color}`} />
                  <span className="app-text-secondary text-xs">{segment.label}</span>
                </div>
                <span className="app-text-primary text-xs font-semibold">
                  {hours.toFixed(1)}h ({percent.toFixed(0)}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="app-text-primary text-sm font-semibold">Duty Status Summary</h4>
        <DutyStatusGrid log={log} />
      </div>
    </Card>
  );
};
