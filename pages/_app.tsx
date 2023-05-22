import "@/styles/globals.css";
import "@/styles/styles.scss";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  const [ssr, setSsr] = useState(true);

  useEffect(() => {
    setSsr(false);
  }, []);

  if (ssr) {
    return null;
  }
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}
