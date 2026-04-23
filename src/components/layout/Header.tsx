import { Menu } from "lucide-react";
import { APP_TITLE } from "../../lib/constants";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";

interface HeaderProps {
  onOpenSidebar: () => void;
}

export const Header = ({ onOpenSidebar }: HeaderProps) => (
  <header className="app-surface app-border flex items-center justify-between border-b px-4 py-3">
    <div>
      <p className="app-text-muted text-xs uppercase tracking-wide">Dispatch Dashboard</p>
      <h2 className="app-text-primary text-lg font-semibold">{APP_TITLE}</h2>
    </div>
    <div className="flex items-center gap-3">
      <Button type="button" className="px-3 lg:hidden" onClick={onOpenSidebar}>
        <Menu size={16} />
      </Button>
      <Badge text="System Online" className="hidden lg:block" />
    </div>
  </header>
);
