import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "../constants/themes/darkTheme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
