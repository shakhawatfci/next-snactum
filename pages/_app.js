import '../styles/globals.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css'
import "react-datepicker/dist/react-datepicker.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
