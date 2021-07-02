import axios from "../../../../kevs_gopro_app/node_modules/axios"

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
    window.localStorage.setItem("gatsbyUser", JSON.stringify(user))
  
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
          console.log(dats)
        if (dats) {
            return dats
          
        } else return false
  
      })
      .catch(() => {  
        return false
      });
}

export const handleLogin = ({ username, password }) => {
    console.log(username, password)
    const dats = verifyUser(username, password)
    console.log(dats)
    if (verifyUser(username, password)) {
      return setUser({
        username: `john`,
        name: `Johnny`,
        email: `johnny@example.org`,
      })
    }
    return false
}

export const isLoggedIn = () => {
  const user = getUser()
  return !!user.username
}

export const logout = callback => {
  setUser({})
  callback()
}