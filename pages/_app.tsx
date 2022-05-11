import "../styles/globals.css";
import type { AppProps } from "next/app";
////////////////////////////////////////////////
import { store } from "../app/store";
import { Provider } from "react-redux";
import Layout from "../components/Layout/Layout";
//font awesome icons//
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
//telling font awesome to skip adding css
//since its being imported above
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
