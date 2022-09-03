// import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/header";
import emotionReset from "emotion-reset";
import { Global, css } from "@emotion/react";

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
          }
        `}
      />
      <Header  />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
