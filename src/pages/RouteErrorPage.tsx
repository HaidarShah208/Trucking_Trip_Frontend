import { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/common/Button";

export const RouteErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError() as { message?: string } | undefined;

  useEffect(() => {
    toast.error(error?.message ?? "Something went wrong while rendering this page.");
  }, [error]);

  return (
    <div className="app-surface app-border mx-auto mt-20 max-w-xl rounded-2xl border p-8 text-center shadow-[var(--shadow-card)]">
      <h1 className="app-text-primary text-xl font-semibold">Unexpected Error</h1>
      <p className="app-text-secondary mt-2 text-sm">
        We hit a rendering issue. Please go back to dashboard and try again.
      </p>
      <Button className="mt-5" onClick={() => navigate("/")}>
        Back to Dashboard
      </Button>
    </div>
  );
};
