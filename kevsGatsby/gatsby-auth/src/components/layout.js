import React from "react"
import Nav from "./Nav"
import '../styles/global.css'
const Layout = ({ children }) => (
  <>
    <Nav />
    {children}
  </>
)
export default Layout