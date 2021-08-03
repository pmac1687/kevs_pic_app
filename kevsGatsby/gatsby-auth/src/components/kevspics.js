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
    Delete(picName, filePath);
  };

  const showEditForm = () => {
    
  }
  
  useEffect(() => {
    for (let i = 0; i < data.length; i += 1) {
    console.log(data[i])
    picArr.push(
      <div className='container' key={i}>
        <h1>{data[i][0]}</h1>
        <h1>{data[i][2]}</h1>
        <h1>{data[i][3]}</h1>
        <h1>{data[i][4]}</h1>
        <h1>{data[i][5]}</h1>
        <div>
        <button onClick={handleDelete} id={`${data[i][0]}`} name={`${data[i][0]}.${data[i][6]}`} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
          Delete
        </button>
        <button style={{ marginLeft: '.5vw'}} onClick={() =>{document.getElementById(`form${i}`).className = 'block'}} id={`${data[i][0]}`} name={`${data[i][0]}.${data[i][6]}`} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
          Edit
        </button>
        </div>
        {/*<img key={i} src={`https://kevinspics.s3.ap-southeast-2.amazonaws.com/${data[i][0]}.${data[i][6]}`} alt={`${data[i][0]}.${data[i][6]}`} width="500" height="600" />*/}
          <form style={{ height:'600px', width:'600px', backgroundRepeat: 'no-repeat', backgroundSize:'cover', backgroundImage: `url("${`https://kevinspics.s3.ap-southeast-2.amazonaws.com/${data[i][0]}.${data[i][6]}`}")` }} class="w-full max-w-sm">
            <div id={`form${i}`} className="hidden">
              <div class="flex items-center border-b border-teal-500 py-2">
                <label className="bg-black text-white" >Title</label>
                <input className="appearance-none  border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder={data[i][0] ? data[i][0] : 'None'} aria-label="Full name"/>
              </div>
              <div class="flex items-center border-b border-teal-500 py-2">
                <label className="bg-black text-white" >Occasion</label>
                <input className="appearance-none  border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder={data[i][5] ? data[i][5] : 'None'} aria-label="Full name"/>
              </div>
              <div class="flex items-center border-b border-teal-500 py-2">
                <label className="bg-black text-white" >Tags</label>
                <input className="appearance-none  border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder={data[i][3] ? data[i][3] : 'None'} aria-label="Full name"/>
              </div>
              <div class="flex items-center border-b border-teal-500 py-2">
                <label className="bg-black text-white" >Date</label>
                <input className="appearance-none  border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder={data[i][2] ? data[i][2] : 'None'} aria-label="Full name"/>
              </div>
              <div class="flex items-center border-b border-teal-500 py-2">
                <label className="bg-black text-white" >Location</label>
                <input className="appearance-none  border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder={data[i][4] ? data[i][4] : 'None'} aria-label="Full name"/>
              </div>
              <div style={{ marginTop: '2vh'}} className="flex">
                <button style={{ marginLeft: '.5vw'}}  id={`${data[i][0]}`} name={`${data[i][0]}.${data[i][6]}`} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                  Submit Edit
                </button>
                <button onClick={e => {e.preventDefault();document.getElementById(`form${i}`).className = 'hidden'}}  style={{ marginLeft: '.5vw'}}  id={`${data[i][0]}`} name={`${data[i][0]}.${data[i][6]}`} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                  Close Edit
                </button>
              </div>
            </div>
          </form>
      </div>
    )
    }
    setPicArr(() => [...picArr]);
  }, [data])
  
  // const Pic = PicArr && PicArr.map((pic) => (pic))

  return (
    <div className='block md:grid grid-cols-3'>
      {picArr.map((pic) => (pic))}
    </div>


    )
};

export default KevsPics;

