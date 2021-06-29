import { useEffect, useState } from "react";
import axios from 'axios';

const KevsPics = () => {
  const [data, setData] = useState([])
  const [picArr, setPicArr] = useState([])
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
  
  useEffect(() => {
    for (let i = 0; i < data.length; i++){
      picArr.push(<img key={i} src={`https://kevinspics.s3.ap-southeast-2.amazonaws.com/${data[i][1]}.${data[i][7]}`} alt="Girl in a jacket" width="500" height="600" /> )
    }
    setPicArr(prev => [...picArr])
  },[data])
  
    const Pic = () => 
        <>
            <div>hello</div>
            <img src='https://kevspics.s3.us-west-1.amazonaws.com/brussels.JPG' alt="Girl in a jacket" width="500" height="600" /> 
            <div>hello</div>
        </>

    return (

            <div>
        {picArr.map((item) => (
                 item 
                ))}
            </div>
    )
};
    
export default KevsPics;