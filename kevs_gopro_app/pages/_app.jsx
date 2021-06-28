/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
// import '../styles/globals.css';
// eslint-disable-next-line import/no-unresolved
// import '../styles/index.css';
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
