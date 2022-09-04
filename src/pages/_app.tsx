import type { AppProps } from "next/app";
import emotionReset from "emotion-reset";
import { Global, css } from "@emotion/react";

import Header from "../components/header";
import "./Nebuta.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global
        styles={css`
          ${emotionReset}

          *, *::after, *::before {
            box-sizing: border-box;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
            font-family: sans-serif;
          }
        `}
      />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
