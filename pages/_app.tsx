import "../styles/globals.css";
import type { AppProps } from "next/app";
////////////////////////////////////////////////
import { SessionProvider } from "next-auth/react";
////////////////////////////////////////////////
import { store } from "../app/store";
import { Provider } from "react-redux";
import Layout from "../components/layout/Layout";
//font awesome icons//
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
//telling font awesome to skip adding css
//since its being imported above
config.autoAddCss = false;

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
