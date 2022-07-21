import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SummaryDetail } from "./StatSummary";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography>Infected</Typography>
      <Typography variant="h5">number</Typography>
      <Typography>last updated</Typography>
    </CardContent>
    <CardActions sx={{ backgroundColor: "red" }} />
  </React.Fragment>
);

interface CardDetailProp {
  details: SummaryDetail;
}

export default function CardDetail({ details }: CardDetailProp) {
  return (
    <Box sx={{ width: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography
            textAlign="center"
            color={details.statusColor}
            sx={{ fontWeight: "bold" }}
          >
            {details.status}
          </Typography>
          <Typography textAlign="center" variant="h5">
            {details.statusNumber}
          </Typography>
          <Typography textAlign="center">
            Last Updated {details.lastUpdated?.toString()}
          </Typography>
        </CardContent>
        <CardActions sx={{ backgroundColor: details.statusColor }} />
      </Card>
    </Box>
  );
}
