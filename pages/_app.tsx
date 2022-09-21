import '../styles/globals.css';
import { AppProps } from 'next/app';
import Navbar from '../src/components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { ShoppingCartProvider } from '../src/context/ShoppingCartContext';
import { Container } from 'react-bootstrap';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/utilities/createEmotionCache';

interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: CustomAppProps) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap');
    setDomLoaded(true);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ShoppingCartProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {domLoaded && (
            <>
              <Navbar />
              <Container className='mb-4'>
                <Component {...pageProps} />
              </Container>{' '}
            </>
          )}
        </ThemeProvider>
      </ShoppingCartProvider>
    </CacheProvider>
  );
}

export default App;
