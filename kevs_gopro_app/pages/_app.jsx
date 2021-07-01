/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
// import '../styles/globals.css';
// eslint-disable-next-line import/no-unresolved
// import '../styles/index.css';
import { useState } from 'react';
import "tailwindcss/tailwind.css";
import UserContext from '../components/UserContext'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState()

  const setToken = (token) => {
    if (token) {
      setUser(token)
    }
  }

  const getToken = () => user;
  return (
      <UserContext.Provider value={{ setToken, getToken }}>
        <Component {...pageProps} />
      </UserContext.Provider>

  )
}

export default MyApp



