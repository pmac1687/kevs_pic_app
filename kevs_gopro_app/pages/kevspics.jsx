import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import UserContext from "../components/UserContext";
import Login from "../components/Login";
import styles from '../styles/Home.module.css'



const KevsPics = () => {
  const [data, setData] = useState([])
  const [picArr, setPicArr] = useState([])

  const { getToken } = useContext(UserContext)


  // const Redirect = (user) ? redirect('/kevspics') : redirect('/')

  useEffect(() => {
    axios.get(`http://localhost:5000/get_rows`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    })
      .then(res => res.data)
      .then(dats => {
        // eslint-disable-next-line no-console
        console.log('resdata rows', dats);
        setData(() => dats);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err)
      });
  }, []);
  
  // let Pic
  
  useEffect(() => {
    for (let i = 0; i < data.length; i+= 1) {
      picArr.push(
        <>
          <h1>{data[i][1]}</h1>
          <h1>{data[i][3]}</h1>
          <img key={i} src={`https://kevinspics.s3.ap-southeast-2.amazonaws.com/${data[i][1]}.${data[i][7]}`} alt="Girl in a jacket" width="500" height="600" />
        </>
      )
    }
    setPicArr(() => [...picArr]);
  }, [data])
  
  // const Pic = PicArr && PicArr.map((pic) => (pic))

  return (
    <div className={styles.container}>{ (!getToken()) ? <Login /> : picArr.map((pic) => (pic))}</div>


    )
};

export default KevsPics;
