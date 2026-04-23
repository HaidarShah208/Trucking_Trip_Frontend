import type { DailyLog } from "../../features/trip/tripTypes";
import { Moon, BedDouble, Truck, BriefcaseBusiness } from "lucide-react";

export const DutyStatusGrid = ({ log }: { log: DailyLog }) => {
  const items = [
    { label: "Off Duty", value: log.offDuty, icon: Moon },
    { label: "Sleeper Berth", value: log.sleeperBerth, icon: BedDouble },
    { label: "Driving", value: log.driving, icon: Truck },
    { label: "On Duty", value: log.onDuty, icon: BriefcaseBusiness },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="app-surface-soft app-border rounded-xl border p-3">
            <div className="mb-2 flex items-center gap-2">
              <div className="app-surface rounded-lg p-1.5">
                <Icon size={14} className="app-text-secondary" />
              </div>
              <p className="app-text-muted text-xs">{item.label}</p>
            </div>
            <p className="app-text-primary text-xl font-semibold">{item.value.toFixed(1)}h</p>
          </div>
        );
      })}
    </div>
  );
};
