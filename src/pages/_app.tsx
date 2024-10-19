import { Providers } from '../apps/providers';
import type { AppProps } from 'next/app';
import '../libs/styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
