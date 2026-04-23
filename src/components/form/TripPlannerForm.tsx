import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAppDispatch } from "../../app/hooks";
import { setActiveTrip } from "../../features/trip/tripSlice";
import { useSubmitTripPlanMutation } from "../../services/tripApi";
import { Button } from "../common/Button";
import { ErrorState } from "../common/ErrorState";
import { Card } from "../common/Card";
import { LocationInput } from "./LocationInput";
import { NumberInput } from "./NumberInput";

const schema = z.object({
  currentLocation: z.string().min(2, "Current location is required"),
  pickupLocation: z.string().min(2, "Pickup location is required"),
  dropoffLocation: z.string().min(2, "Dropoff location is required"),
  currentCycleUsedHours: z.number().min(0, "Hours must be at least 0"),
});

type FormValues = z.infer<typeof schema>;

export const TripPlannerForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [submitTripPlan, { isLoading, error }] = useSubmitTripPlanMutation();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { currentCycleUsedHours: 24 },
  });

  const onSubmit = async (values: FormValues) => {
    const result = await submitTripPlan(values).unwrap();
    dispatch(setActiveTrip(result));
    navigate(`/trip/${result.id}`);
  };

  return (
    <Card>
      <h3 className="app-text-primary mb-4 text-base font-semibold">Plan New Trip</h3>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <LocationInput label="Current Location" error={form.formState.errors.currentLocation?.message} {...form.register("currentLocation")} />
        <LocationInput label="Pickup Location" error={form.formState.errors.pickupLocation?.message} {...form.register("pickupLocation")} />
        <LocationInput label="Dropoff Location" error={form.formState.errors.dropoffLocation?.message} {...form.register("dropoffLocation")} />
        <NumberInput
          label="Current Cycle Used (Hours)"
          type="number"
          step="0.5"
          error={form.formState.errors.currentCycleUsedHours?.message}
          {...form.register("currentCycleUsedHours", { valueAsNumber: true })}
        />
        {error && <ErrorState message="Failed to submit trip. Please retry." />}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Planning..." : "Generate Trip Plan"}
        </Button>
      </form>
    </Card>
  );
};
