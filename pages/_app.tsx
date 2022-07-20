import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import darkTheme from "../constants/themes/darkTheme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
