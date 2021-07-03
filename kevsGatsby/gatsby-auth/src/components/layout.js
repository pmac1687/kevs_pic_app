import React from "react"
import NavBar from "./nav-bar"
import '../styles/global.css'
const Layout = ({ children }) => (
  <>
    <NavBar />
    {children}
  </>
)
export default Layout