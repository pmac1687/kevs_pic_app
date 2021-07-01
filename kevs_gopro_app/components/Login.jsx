import {  useContext } from 'react';
import axios from 'axios';
import Router from 'next/router';
import UserContext from './UserContext';


/* eslint-disable jsx-a11y/label-has-associated-control */
const Login = () => {

  const { setToken } = useContext(UserContext);

  // const [data, setData] = useState()

  const checkPassword = (username, password) => {
    axios.post(`http://34.229.138.224/login`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        username,
        password
      }
    })  
    .then(res => res.data)
    .then(dats => {
      if (dats) {
        setToken(dats);
        Router.push('uploadimage')
        
      } else {document.getElementById('incorrect').style.display = 'block'}

    })
    .catch(() => {  
      document.getElementById('incorrect').style.display = 'block'
    });
  }


  const loginClick = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (!username || !password) {
      // eslint-disable-next-line no-alert
      alert(`missing ${username ? 'username' : 'password'}`)
    } else checkPassword(username, password)
  }



  return (
    <form className="w-full max-w-sm">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
            Username
          </label>
        </div>
        <div className="md:w-2/3">
          <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="username" type="text" placeholder="Jane Doe" />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
            Password
          </label>
        </div>
        <div className="md:w-2/3">
          <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="password" type="password" placeholder="******************" />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3" />
        <div className="md:w-2/3">
          <button onClick={(e) => { e.preventDefault(); loginClick() }} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
            Sign In
          </button>
        </div>
      </div>
      <div id='incorrect' style={{ display : 'none'}} className="md:flex md:items-center mb-6">
        <div style={{  marginLeft: '4vw' }} className="md:w-3/9">
          <label style={{ fontSize: '12px'}} className="block text-red-400 font-bold sm:text-right mb-1 sm:mb-0 pr-4" htmlFor="inline-password">
            Password or Username Incorrect Please Try Again
          </label>
        </div>
      </div>
    </form>
  )
}
    
export default Login;