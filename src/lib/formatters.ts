const toSafeNumber = (value: number | string) => {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const formatHours = (hours: number | string) => `${toSafeNumber(hours).toFixed(1)} hrs`;
export const formatMiles = (miles: number | string) => `${toSafeNumber(miles).toLocaleString()} mi`;
