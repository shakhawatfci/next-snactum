import Head from 'next/head';
export default function MetaHeader({ pageTitle }){
  
    return (
        <Head>
        <title>Rocket:prep || {pageTitle}</title>
        <meta property="og:title" content={pageTitle} key="title" />
        <link rel="shortcut icon" href="http://tutor.publicdemo.xyz/assets/images/rocketprep-logo-sm.png"></link>
        </Head>
    )

}