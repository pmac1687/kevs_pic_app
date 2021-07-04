import axios from "axios"
import { navigate } from "gatsby"

export const isBrowser = () => typeof window !== "undefined"


export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

export const getAPIToken = () =>
    isBrowser() && window.localStorage.getItem("apiToken")
      ? JSON.parse(window.localStorage.getItem("apiToken"))
      : false

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))
    
const setAPIToken = token =>
  window.localStorage.setItem("apiToken", JSON.stringify(token))

  
const verifyUser = (username, password) => {
  console.log(username, password)
  axios.post(`https://kev.patrickjmcdermott.com/login`, {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    data: {
      username,
      password
    }
  })
    .then(res => res.data)
    .then(dats => {
      console.log('impor', dats)
      if (dats) {
        console.log(4444444, dats)
        setAPIToken(dats)
        return (setUser({
          username: `john`,
          name: 'johnny',
          email: `johnny@example.org`,
        }), navigate('/app/profile')
        )
      }
      })
      .catch(() => {  
        // setAPIToken(false)
      });
}

export const handleLogin = (username, password) => {
  verifyUser(username, password)
  //if (getAPIToken()) {
  //  return setUser({
  //      username: `john`,
  //      name: `Johnny`,
  //      email: `johnny@example.org`,
  //    })
  //  }
    // return false

}

export const isLoggedIn = () => {
  console.log('islogeedin')
  const user = getUser()
  console.log('user',user)
  return !!user.username
}

export const logout = callback => {
  setUser({})
  callback()
  setAPIToken({})
  callback()
}