import { LayoutDashboard, ScrollText, Route, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectActiveTrip } from "../../features/trip/tripSelectors";
import { Button } from "../common/Button";
import truck from "../../assets/truck.png";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ mobileOpen, onClose }: SidebarProps) => {
  const activeTrip = useAppSelector(selectActiveTrip);
  const { pathname } = useLocation();
  const pathTripId = pathname.match(/^\/(?:trip|logs)\/([^/]+)/)?.[1];
  const tripId = pathTripId ?? activeTrip?.id;

  const items = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard, disabled: false, exact: true },
    { to: tripId ? `/trip/${tripId}` : "", label: "Trips", icon: Route, disabled: !tripId, exact: false },
    { to: tripId ? `/logs/${tripId}` : "", label: "Logs", icon: ScrollText, disabled: !tripId, exact: false },
  ];

  return (
    <aside
      className={`app-surface app-border app-glass-highlight fixed inset-y-0 left-0 z-50 w-64 border-r p-4 transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={truck} alt="Truck" className="h-7 w-7 rounded-md object-cover" />
          <h1 className="app-text-primary text-lg font-bold">Trip Planner</h1>
        </div>
        <Button type="button" className="px-2 lg:hidden" onClick={onClose}>
          <X size={16} />
        </Button>
      </div>
      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          if (item.disabled) {
            return (
              <div
                key={item.label}
                className="app-text-muted app-surface-soft flex cursor-not-allowed items-center gap-2 rounded-xl px-3 py-2 text-sm opacity-70"
                title="Generate a trip plan first"
              >
                <Icon size={16} />
                {item.label}
              </div>
            );
          }
          return (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.exact}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                  isActive
                    ? "app-primary"
                    : "app-text-secondary app-surface-soft hover:-translate-y-0.5"
                }`
              }
            >
              <Icon size={16} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
