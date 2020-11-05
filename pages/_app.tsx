import React from "react";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";

import "../assets/styles/globals.scss";

import { swrFetcher } from "../services";
import { AuthProvider } from "../helpers/authContext";
import GeneralLayout from "../components/GeneralLayout/GeneralLayout";


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        fetcher: swrFetcher
      }}
    >
      <AuthProvider>
        <GeneralLayout>
          <Component {...pageProps} />
        </GeneralLayout>
      </AuthProvider>
    </SWRConfig>
  )
}
