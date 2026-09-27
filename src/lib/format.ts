export function usd(n: number | null | undefined, digits = 3): string {
  if (n == null || !Number.isFinite(n)) return "--";
  return n.toFixed(digits);
}

export function cents(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return "--";
  const sign = n >= 0 ? "+" : "";
  return `${sign}${(n * 100).toFixed(2)}c`;
}

export function compact(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return "--";
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toFixed(0);
}

export function clock(iso: string | null | undefined): string {
  if (!iso) return "--";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "--";
  return d.toLocaleTimeString("en-US", { hour12: false });
}
