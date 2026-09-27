import { NextResponse } from "next/server";
import { followBook } from "@/lib/leaders";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const book = await followBook("MONTH", 6);
    return NextResponse.json({
      note: "Kalshi does not publish trader IDs. Follow book is Polymarket wallets only.",
      ...book,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Leaders failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
