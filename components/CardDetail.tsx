import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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

export default function CardDetail() {
  return (
    <Box sx={{ width: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
