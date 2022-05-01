import { Box } from '@chakra-ui/react'
import Head from 'next/head'


export default function Home() {
  return (
    <Box>
      <Head>
        <title>Home - Portfolio</title>
        <meta property="og:url" content="https://fireplank.vercel.com" />
        <meta property="og:type" content="portfolio" />
        <meta property="og:title" content="FirePlank&apos;s Portfolio" />
        <meta property="fb:app_id" content="com.vercel.fireplank" />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="A very responsive and good looking portfolio website to showcase me and my skills."
        />
        <meta property="og:image" content="/images/fireplank.png" />
        <meta name="description" content="FirePlank&apos;s portfolio website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="portfolio, fireplank, tech" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Box>
  )
}
