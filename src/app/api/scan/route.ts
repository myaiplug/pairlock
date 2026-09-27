import { NextRequest, NextResponse } from "next/server";
import { scanMarkets } from "@/lib/polymarket";
import type { ScanResponse } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const started = Date.now();
  const { searchParams } = req.nextUrl;
  const limit = Number(searchParams.get("limit") ?? "24");
  const targetSize = Number(searchParams.get("size") ?? "25");

  try {
    const { results, booksOk, booksFail } = await scanMarkets({
      limit: Number.isFinite(limit) ? limit : 24,
      targetSize: Number.isFinite(targetSize) ? targetSize : 25,
    });
    const body: ScanResponse = {
      scannedAt: new Date().toISOString(),
      durationMs: Date.now() - started,
      markets: results.length,
      booksOk,
      booksFail,
      results,
    };
    return NextResponse.json(body);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Scan failed";
    const body: ScanResponse = {
      scannedAt: new Date().toISOString(),
      durationMs: Date.now() - started,
      markets: 0,
      booksOk: 0,
      booksFail: 0,
      results: [],
      error: message,
    };
    return NextResponse.json(body, { status: 502 });
  }
}
