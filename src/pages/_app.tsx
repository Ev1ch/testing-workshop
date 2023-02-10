import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import wrapper from 'store';

export default function App({ Component, ...props }: AppProps) {
  const {store, props: updatedProps} = wrapper.useWrappedStore(props);

  return <Provider store={store}>
    <Component {...updatedProps.pageProps} />;
  </Provider>
}
