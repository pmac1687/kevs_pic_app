import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import Profile from "../components/profile"
import KevsPics from "../components/kevspics"
import UploadImage from "../components/uploadimage"
import Login from "../components/login"
const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/profile" component={Profile} />
      <PrivateRoute path="/app/kevspics" component={KevsPics} />
      <PrivateRoute path="/app/uploadimage" component={UploadImage} />
      <Login path="/app/login" />
    </Router>
  </Layout>
)
export default App