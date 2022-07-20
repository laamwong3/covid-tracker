import { Grid, Stack } from "@mui/material";
import React from "react";
import CardDetail from "./CardDetail";

const StatSummary = () => {
  return (
    <Grid
      gap={5}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Grid item>
        <CardDetail />
      </Grid>
      <Grid item>
        <CardDetail />
      </Grid>
      <Grid item>
        <CardDetail />
      </Grid>
    </Grid>
  );
};

export default StatSummary;
