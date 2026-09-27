import { NextRequest, NextResponse } from "next/server";
import { runSniper } from "@/lib/sniper";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const minNet = Number(req.nextUrl.searchParams.get("minNet") ?? "-0.02");
  try {
    const report = await runSniper({
      minNet: Number.isFinite(minNet) ? minNet : -0.02,
    });
    return NextResponse.json(report);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sniper failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
