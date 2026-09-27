import { NextResponse } from "next/server";
import { scoreEndgame } from "@/lib/endgame";
import { scanMarkets } from "@/lib/polymarket";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { results } = await scanMarkets({ limit: 40, targetSize: 10 });
    const rows = results
      .map((m) => scoreEndgame(m))
      .filter((r): r is NonNullable<typeof r> => r != null)
      .sort((a, b) => {
        const order = { ENDGAME: 0, THIN_PAY: 1, FEE_EATS: 2, HARD_RESIDUAL: 3, TOO_EARLY: 4 };
        return order[a.verdict] - order[b.verdict] || (a.hoursLeft ?? 9e9) - (b.hoursLeft ?? 9e9);
      });
    return NextResponse.json({
      scannedAt: new Date().toISOString(),
      note: "Paper scorer. Last-minute mid-priced books are residual hard markets.",
      rows,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Endgame failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
