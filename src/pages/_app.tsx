import type { AppProps } from 'next/app';
import { Providers } from '../apps/providers';
import '../libs/styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
