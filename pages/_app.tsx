import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "../constants/themes/darkTheme";
import StateManager from "../contexts/StateManager";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <StateManager>
        <Component {...pageProps} />
      </StateManager>
    </ThemeProvider>
  );
}

export default MyApp;
