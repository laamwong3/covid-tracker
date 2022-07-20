import type { NextApiRequest, NextApiResponse } from "next";

export interface CountryData {
  confirmed?: Confirmed;
  recovered?: Confirmed;
  deaths?: Confirmed;
  lastUpdate?: Date;
}

export interface Confirmed {
  value?: number;
  detail?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CountryData>
) {
  // res.status(200).json({ name: "John Doe" });
}
