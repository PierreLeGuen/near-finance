import { config } from "@fortawesome/fontawesome-svg-core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreProvider } from "easy-peasy";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreRehydrated } from "easy-peasy";
import { NearContextProvider } from "~/context/near";
import { WalletSelectorContextProvider } from "~/context/wallet";
import { api } from "~/lib/api";
import { store } from "~/store-easy-peasy/store";

import { type NextPage } from "next";
import { type Session } from "next-auth";
import { type AppProps } from "next/app";
import { type ReactElement, type ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "@near-finance-near-wallet-selector/modal-ui/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "~/styles/globals.css";

config.autoAddCss = false;

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session: Session;
};

const queryClient = new QueryClient();

const Wrapper = ({ children }: any) => {
  const isRehydrated = useStoreRehydrated();
  const [inInit, setInit] = useState(false);
  const initApp = useStoreActions((actions: any) => actions.initApp);

  useEffect(() => {
    initApp({ setInit });
  }, []);

  console.log("isRehydrated", isRehydrated);
  console.log("inInited", inInit);
  console.log(!isRehydrated || !inInit);

  return !isRehydrated || !inInit ? null : children;
};

function MyApp({ Component, pageProps, session }: AppPropsWithLayout) {
  const { getLayout } = Component;

  const pageContent = <Component {...pageProps} />;
  const layout = getLayout ? getLayout(pageContent) : pageContent;

  return (
    <StoreProvider store={store}>
      <Wrapper>
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
            <NearContextProvider>
              <WalletSelectorContextProvider>
                {layout}
                <ToastContainer />
              </WalletSelectorContextProvider>
            </NearContextProvider>
          </QueryClientProvider>
        </SessionProvider>
      </Wrapper>
    </StoreProvider>
  );
}

export default api.withTRPC(MyApp);
