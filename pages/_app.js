import '../styles/globals.scss'
import 'tailwindcss/tailwind.css'
import React from 'react'
import { Layout } from '../Components'
import { AppProps } from 'next/app';


function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp