import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SummaryDetail } from "./StatSummary";
import CountUp from "react-countup";

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
            <CountUp end={details.statusNumber ?? 0} duration={3} />
          </Typography>
          <Typography textAlign="center">
            Last Updated {new Date(details.lastUpdated!).toLocaleDateString()}
          </Typography>
        </CardContent>
        <CardActions sx={{ backgroundColor: details.statusColor }} />
      </Card>
    </Box>
  );
}
