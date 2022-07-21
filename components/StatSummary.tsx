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
  const [summary, setSummary] = useState<SummaryDetail[]>([]);
  const { currentOption, setCountryGraphData, setGlobalGraphData } =
    useStateAPI();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: globalData } = useSWR<GlobalData[]>(
    () => (currentOption?.name === "Global" ? "/api/daily" : null),
    fetcher
  );
  const { data: countryData } = useSWR<CountryData>(
    () =>
      currentOption?.name !== "Global"
        ? `/api/countries/${currentOption?.iso3}`
        : null,
    fetcher
  );

  useEffect(() => {
    if (currentOption?.name === "Global") {
      if (globalData) {
        status.map((each) => {
          if (each.status === "Infected") {
            each.statusNumber =
              globalData[globalData.length - 1].totalConfirmed;
            each.lastUpdated = globalData[globalData.length - 1].reportDate;
          }
          if (each.status === "Recovered") {
            each.statusNumber =
              Number(globalData[globalData.length - 1].totalConfirmed) -
              Number(globalData[globalData.length - 1].deaths?.total);
            each.lastUpdated = globalData[globalData.length - 1].reportDate;
          }
          if (each.status === "Deaths") {
            each.statusNumber = globalData[globalData.length - 1].deaths?.total;
            each.lastUpdated = globalData[globalData.length - 1].reportDate;
          }
        });
        setSummary(status);
        setGlobalGraphData(globalData);
      }
    } else {
      if (countryData) {
        status.map((each) => {
          if (each.status === "Infected") {
            each.statusNumber = countryData.confirmed?.value;
            each.lastUpdated = countryData.lastUpdate;
          }
          if (each.status === "Recovered") {
            each.statusNumber =
              Number(countryData.confirmed?.value) -
              Number(countryData.deaths?.value);
            each.lastUpdated = countryData.lastUpdate;
          }
          if (each.status === "Deaths") {
            each.statusNumber = countryData.deaths?.value;
            each.lastUpdated = countryData.lastUpdate;
          }
        });
        setSummary(status);
        setCountryGraphData(countryData);
      }
    }
  }, [countryData, globalData, currentOption]);

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
    </Grid>
  );
};

export default StatSummary;
