import React, { useEffect, useState } from "react";
import axios from 'axios';
import { getPics } from "../utils/postgresAPI";
import { deleteFromS3 } from "../utils/AWS"
import { Delete } from "../utils/postgresAPI";


const KevsPics = () => {
  const [data, setData] = useState([])
  const [picArr, setPicArr] = useState([])

  useEffect(() => {
    const getPicData = async () => {
      const picData = await getPics()
      setData(() => picData);
    }
    getPicData()
  }, []);

  const handleDelete = (e) => {
    console.log(e.target.id)
    const picName = e.target.id
    const filePath = e.target.name
    Delete(picName, filePath)


    //const deletePic = async (picName, filePath) => {
    //  let successfulDelete = await deleteFromS3(filePath)
    //    .then(res => {
    //      console.log(res);
    //      deleteFromDb(picName);
    //    })
    //}
  //
//
    //// if (successfulDelete) {
    ////   deleteFromDb(picName)
    //// }
    //deletePic(picName, filePath)
  };
  
  useEffect(() => {
    for (let i = 0; i < data.length; i += 1) {
    console.log(data[i])
    picArr.push(
      <React.Fragment key={i}>
        <h1>{data[i][0]}</h1>
        <h1>{data[i][2]}</h1>
        <button onClick={handleDelete} id={`${data[i][0]}`} name={`${data[i][0]}.${data[i][6]}`} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
          Delete
        </button>
        <img key={i} src={`https://kevinspics.s3.ap-southeast-2.amazonaws.com/${data[i][0]}.${data[i][6]}`} alt={`${data[i][0]}.${data[i][6]}`} width="500" height="600" />
      </React.Fragment>
    )
    }
    setPicArr(() => [...picArr]);
  }, [data])
  
  // const Pic = PicArr && PicArr.map((pic) => (pic))

  return (
    <div className='container'>
      {picArr.map((pic) => (pic))}
    </div>


    )
};

export default KevsPics;

