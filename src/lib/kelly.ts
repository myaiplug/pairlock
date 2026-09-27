export function binaryKelly(p: number, price: number): number {
  if (price <= 0 || price >= 1 || p <= price) return 0;
  return (p - price) / (1 - price);
}

export function sizedKelly(p: number, price: number, k: number, bankroll: number, cap: number) {
  const full = binaryKelly(p, price);
  const frac = Math.max(0, full * k);
  const raw = bankroll * frac;
  const stake = Math.min(cap, raw);
  const payout = stake * (1 / price - 1);
  const profitIfWin = stake * ((1 - price) / price);
  const ev = stake * (p / price - 1);
  return { full, frac, stake, profitIfWin, payout, ev };
}
