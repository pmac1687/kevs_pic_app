import React from "react"
import NavBar from "./nav-bar"
import Nav from "./Nav"
import '../styles/global.css'
const Layout = ({ children }) => (
  <>
    <Nav />
    {children}
  </>
)
export default Layout