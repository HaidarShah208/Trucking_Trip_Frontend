import { useState } from "react";
import type { DailyLog } from "../../features/trip/tripTypes";
import { Card } from "../common/Card";
import { DailyLogSheet } from "./DailyLogSheet";

export const LogsCarousel = ({ logs }: { logs: DailyLog[] }) => {
  const [active, setActive] = useState(0);
  const current = logs[active];

  if (!current) return null;
  const getTabLabel = (log: DailyLog) => {
    const normalizedDate = log.date.trim().toLowerCase();
    return normalizedDate === `day ${log.day}` || normalizedDate === `day-${log.day}`
      ? `Day ${log.day}`
      : `Day ${log.day} - ${log.date}`;
  };

  return (
    <div className="space-y-4">
      <Card className="space-y-4">
        <div>
          <h3 className="app-text-primary text-base font-semibold">Daily Sheets</h3>
          <p className="app-text-secondary text-sm">Switch between days to review the ELD sheet and totals.</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {logs.map((log, idx) => (
            <button
              key={log.day}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                idx === active
                  ? "app-primary app-border shadow-[0_8px_18px_rgba(56,116,255,0.25)]"
                  : "app-surface-soft app-border app-text-secondary hover:-translate-y-0.5"
              }`}
              onClick={() => setActive(idx)}
              type="button"
            >
              <p>{getTabLabel(log)}</p>
              <p className={`text-xs ${idx === active ? "text-white/85" : "app-text-muted"}`}>
                {log.driving.toFixed(1)}h drive, {log.onDuty.toFixed(1)}h on-duty
              </p>
            </button>
          ))}
        </div>
      </Card>
      <DailyLogSheet log={current} />
    </div>
  );
};
