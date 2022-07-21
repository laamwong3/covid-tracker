import { Stack, Container, Box } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
  CountrySelect,
  DataDisplay,
  MainTitle,
  StatSummary,
} from "../components";

const Home: NextPage = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Stack
          gap={3}
          direction="column"
          justifyContent="center"
          alignItems="center"
          mt={1}
        >
          <MainTitle />
          <StatSummary />
          <CountrySelect />
          <DataDisplay />
        </Stack>
      </Container>
    </>
  );
};

export default Home;
