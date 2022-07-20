import type { NextApiRequest, NextApiResponse } from "next";

export interface GlobalData {
  totalConfirmed?: number;
  mainlandChina?: number;
  otherLocations?: number;
  deltaConfirmed?: number;
  totalRecovered?: number;
  confirmed?: Confirmed;
  deltaConfirmedDetail?: Confirmed;
  deaths?: Confirmed;
  recovered?: Confirmed;
  active?: number;
  deltaRecovered?: number;
  incidentRate?: number;
  peopleTested?: number;
  reportDate?: Date;
}

export interface Confirmed {
  total?: number;
  china?: number;
  outsideChina?: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GlobalData>
) {
  const url = "https://covid19.mathdro.id/api/daily";
  fetch(url)
    .then((res) => res.json())
    .then((data: GlobalData) => res.status(200).json(data))
    .catch((e) => console.log(e));
}
