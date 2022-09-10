import Head from 'next/head';
export default function MetaHeader({ pageTitle }){
  
    return (
        <Head>
        <title>Rocket:prep || {pageTitle}</title>
        <meta property="og:title" content={pageTitle} key="title" />
        </Head>
    )

}