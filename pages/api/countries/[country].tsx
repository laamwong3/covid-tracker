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
  const url = `https://covid19.mathdro.id/api/countries/${req.query.country}`;
  fetch(url)
    .then((res) => res.json())
    .then((data: CountryData) => res.status(200).json(data))
    .catch((e) => console.log(e));
}
