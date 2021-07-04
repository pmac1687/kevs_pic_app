import React from "react"
import { getAPIToken } from "../services/auth"
const Profile = () => (
  <>
    <h1>Your profile</h1>
    <ul>
      <li>Name: {getAPIToken()}</li>
    </ul>
  </>
)
export default Profile