/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
// import '../styles/globals.css';
// eslint-disable-next-line import/no-unresolved
// import '../styles/index.css';
import { useState } from 'react';
import "tailwindcss/tailwind.css";
import UserContext from './components/UserContext'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState()

  const setToken = (token) => {
    sessionStorage.setItem('token', token);
    console.log('token', sessionStorage.getItem('token'))
  }

  const getToken = () => {
    console.log(sessionStorage)
    const tokenString = sessionStorage && sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  }
  return (
      <UserContext.Provider value={{ user, setUser, setToken, getToken }}>
        <Component {...pageProps} />
      </UserContext.Provider>

  )
}

export default MyApp



