import { Stack, Container } from "@mui/material";
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
      <Container maxWidth="xl">
        <Stack
          gap={5}
          direction="column"
          justifyContent="center"
          alignItems="center"
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
