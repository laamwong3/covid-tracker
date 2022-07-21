import { Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useStateAPI } from "../contexts/StateManager";
import { CountryData } from "../pages/api/countries/[country]";
import { GlobalData } from "../pages/api/daily";
import CardDetail from "./CardDetail";

export interface SummaryDetail {
  status: "Infected" | "Recovered" | "Deaths";
  statusNumber?: number;
  statusColor: "purple" | "green" | "red";
  lastUpdated?: Date;
}

const StatSummary = () => {
  const status: SummaryDetail[] = [
    {
      status: "Infected",
      statusColor: "purple",
    },
    { status: "Recovered", statusColor: "green" },
    { status: "Deaths", statusColor: "red" },
  ];
  const [summary, setSummary] = useState<SummaryDetail[]>();
  const { currentOption } = useStateAPI();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: globalData } = useSWR<GlobalData[]>("/api/daily", fetcher);
  const { data: countryData } = useSWR<CountryData[]>(
    () =>
      currentOption?.name === "Global"
        ? null
        : `/api/countries/${currentOption?.iso3}`,
    fetcher
  );

  useEffect(() => {
    if (globalData) {
      status.map((each) => {
        if (each.status === "Infected") {
          each.statusNumber = globalData[globalData.length - 1].totalConfirmed;
          each.lastUpdated = globalData[globalData.length - 1].reportDate;
        }
        if (each.status === "Recovered") {
          each.statusNumber = globalData[globalData.length - 1].totalRecovered;
          each.lastUpdated = globalData[globalData.length - 1].reportDate;
        }
        if (each.status === "Deaths") {
          each.statusNumber = globalData[globalData.length - 1].deaths?.total;
          each.lastUpdated = globalData[globalData.length - 1].reportDate;
        }
      });
      setSummary(status);
    }
  }, [globalData]);
  //console.log(globalData);
  // console.log(countryData);
  console.log(summary);
  return (
    <Grid
      gap={5}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      {summary &&
        summary.map((details, index) => (
          <Grid item key={index}>
            <CardDetail details={details} />
          </Grid>
        ))}
      {/* <Grid item>
        <CardDetail />
      </Grid>
      <Grid item>
        <CardDetail />
      </Grid>
      <Grid item>
        <CardDetail />
      </Grid> */}
    </Grid>
  );
};

export default StatSummary;
