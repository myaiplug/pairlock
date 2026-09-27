export type Level = { price: number; size: number };

export type BookSide = {
  bestBid: number | null;
  bestAsk: number | null;
  bidDepth: number;
  askDepth: number;
  asks: Level[];
  bids: Level[];
};

export type ScanMarket = {
  id: string;
  question: string;
  slug: string;
  endDate: string | null;
  volume24hr: number;
  liquidity: number;
  tickSize: number;
  minSize: number;
  takerBaseFee: number;
  feeRate: number;
  negRisk: boolean;
  acceptingOrders: boolean;
  outcomes: [string, string];
  lastPrices: [number, number];
  yesTokenId: string;
  noTokenId: string;
  yes: BookSide;
  no: BookSide;
  lastSum: number;
  askSum: number | null;
  bidSum: number | null;
  pairCost: number | null;
  maxSize: number;
  feePerPair: number;
  netEdge: number | null;
  status: "LOCK" | "NEAR" | "FAIR" | "OVER" | "THIN" | "DEAD";
  reject: string;
};

export type ScanResponse = {
  scannedAt: string;
  durationMs: number;
  markets: number;
  booksOk: number;
  booksFail: number;
  results: ScanMarket[];
  error?: string;
};

export type PaperStatus =
  | "PENDING"
  | "LOCKED"
  | "DEAD_EDGE"
  | "MISSED_LEG"
  | "THIN_FILL"
  | "CANCELLED";

export type PaperTicket = {
  id: string;
  marketId: string;
  question: string;
  slug: string;
  signalAt: number;
  fillAt: number | null;
  size: number;
  signalPairCost: number;
  signalNetEdge: number;
  fillPairCost: number | null;
  fillNetEdge: number | null;
  fillYesVwap: number | null;
  fillNoVwap: number | null;
  status: PaperStatus;
  note: string;
  lockedPnl: number;
};
