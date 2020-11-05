import { ReactNode } from "react";
import Head from "next/head";

import styles from "./generalLayout.module.scss";

import Header from "../Header/Header";


export default function GeneralLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Next.js Example App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header/>
      
      {children}
    </div>
  )
}
