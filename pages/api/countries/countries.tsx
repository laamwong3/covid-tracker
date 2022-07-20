import type { NextApiRequest, NextApiResponse } from "next";

export interface CountryDetail {
  countries?: Country[];
}

export interface Country {
  name?: string;
  iso2?: string;
  iso3?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CountryDetail>
) {
  const url = "https://covid19.mathdro.id/api/countries";
  fetch(url)
    .then((res) => res.json())
    .then((data: CountryDetail) => res.status(200).json(data))
    .catch((e) => console.log(e));
}
