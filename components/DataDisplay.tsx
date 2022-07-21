import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  BarElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { Box } from "@mui/material";
import { useStateAPI } from "../contexts/StateManager";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

export default function DataDisplay() {
  const [labelGlobal, setLabelGlobal] = useState<string[]>([]);
  const [labelCountry, setLabelCountry] = useState<string[]>(["Country"]);

  const { currentOption, globalGraphData, countryGraphData } = useStateAPI();

  const barData: ChartData<"bar", number[], unknown> = {
    labels: labelCountry,
    datasets: [
      {
        label: "Infected",
        data: labelCountry.map(() => Number(countryGraphData.confirmed?.value)),
        borderColor: "purple",
        backgroundColor: "purple",
      },
      {
        label: "Recovered",
        data: labelCountry.map(
          () =>
            Number(countryGraphData.confirmed?.value) -
            Number(countryGraphData.deaths?.value)
        ),
        borderColor: "green",
        backgroundColor: "green",
      },
      {
        label: "Deaths",
        data: labelCountry.map(() => Number(countryGraphData.deaths?.value)),
        borderColor: "red",
        backgroundColor: "red",
      },
    ],
  };

  const lineData: ChartData<"line", number[], string> = {
    labels: labelGlobal,
    datasets: [
      {
        label: "Infected",
        data: labelGlobal.map((each, index) =>
          Number(globalGraphData[index].confirmed?.total)
        ),
        borderColor: "purple",
        backgroundColor: "purple",
      },
      {
        label: "Recovered",
        data: labelGlobal.map(
          (each, index) =>
            Number(globalGraphData[index].confirmed?.total) -
            Number(globalGraphData[index].deaths?.total)
        ),
        borderColor: "green",
        backgroundColor: "green",
      },
      {
        label: "Deaths",
        data: labelGlobal.map((each, index) =>
          Number(globalGraphData[index].deaths?.total)
        ),
        borderColor: "red",
        backgroundColor: "red",
      },
    ],
  };
  // console.log(labelGlobal);
  useEffect(() => {
    if (currentOption?.name === "Global") {
      if (globalGraphData) {
        let tempArr: string[] = [];
        globalGraphData.map((data) => {
          if (data.reportDate) {
            tempArr.push(data.reportDate.toString());
          }
        });
        setLabelGlobal(tempArr);
      }
    }
  }, [currentOption, globalGraphData]);
  return (
    <>
      <Box sx={{ width: { sm: "60vw", lg: "50vw" } }}>
        {currentOption?.name === "Global" ? (
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "COVID-19 STATUS",
                },
              },
            }}
            data={lineData}
          />
        ) : (
          <Bar
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "COVID-19 STATUS",
                },
              },
            }}
            data={barData}
          />
        )}
      </Box>
    </>
  );
}
