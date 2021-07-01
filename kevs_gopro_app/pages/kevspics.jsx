import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import UserContext from "./components/UserContext";
import Login from "./components/Login"


const KevsPics = () => {
  const [data, setData] = useState([])
  const [picArr, setPicArr] = useState([])
  const [token, setToken] = useState('');

  const { user, getToken } = useContext(UserContext)


  // const Redirect = (user) ? redirect('/kevspics') : redirect('/')

  useEffect(() => {
    axios.get(`http://localhost:5000/get_rows`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    })
      .then(res => res.data)
      .then(dats => {
        console.log('resdata rows', dats);
        setData(prev => dats);
      })
      .catch(err => {
        console.log(err)
      });
  }, []);
  
  // let Pic
  
  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      picArr.push(<img key={i} src={`https://kevinspics.s3.ap-southeast-2.amazonaws.com/${data[i][1]}.${data[i][7]}`} alt="Girl in a jacket" width="500" height="600" />)
    }
    setPicArr(prev => [...picArr]);
    const Pic = (PicArr) => PicArr && PicArr.map((pic) => (pic))
  }, [data])
  
  // const Pic = PicArr && PicArr.map((pic) => (pic))

  return (
    <div>{ (!getToken()) ? <Login /> : picArr.map((pic) => (pic))}</div>


    )
};

export default KevsPics;

