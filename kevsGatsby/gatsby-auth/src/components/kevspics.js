import React, { useEffect, useState } from "react";
import { getPics } from "../utils/postgresAPI";
import { Delete } from "../utils/postgresAPI";
import EditInputs from "./elements/EditInputs";


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
    e.preventDefault()
    console.log(e.target.id)
    const picName = e.target.id
    const filePath = e.target.name
    Delete(picName, filePath);
    // pause for reload to wait for delete
    const pause = setTimeout(() => {
      window.location.reload();
    }, 2000);
    return () => clearTimeout(pause);
  };

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
        <button onClick={e => { e.preventDefault(); document.getElementById(`delete${i}`).className = 'flex space-y-8 flex-col w-full h-48 bg-gray-900 place-content-center' }} id={`${data[i][0]}`} name={`${data[i][0]}.${data[i][6]}`} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
          Delete
        </button>
        <button style={{ marginLeft: '.5vw'}} onClick={() =>{document.getElementById(`form${i}`).className = 'block'}} id={`${data[i][0]}`} name={`${data[i][0]}.${data[i][6]}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
          Edit
        </button>
        </div>
        {/*<img key={i} src={`https://kevinspics.s3.ap-southeast-2.amazonaws.com/${data[i][0]}.${data[i][6]}`} alt={`${data[i][0]}.${data[i][6]}`} width="500" height="600" />*/}
          <form style={{ height:'600px', width:'600px', backgroundRepeat: 'no-repeat', backgroundSize:'cover', backgroundImage: `url("${`https://kevinspics.s3.ap-southeast-2.amazonaws.com/${data[i][0]}.${data[i][6]}`}")` }} className="w-full max-w-sm">
            <div id={`form${i}`} className="hidden">
              <EditInputs id={'Title'} data={data} i={i} num={0}/>
              <EditInputs id={'Occasion'} data={data} i={i} num={5} />
              <EditInputs id={'Tags'} data={data} i={i} num={3} />
              <EditInputs id={'Date'} data={data} i={i} num={2} />
              <EditInputs id={'Location'} data={data} i={i} num={4} />
              <div style={{ marginTop: '2vh'}} className="flex">
                <button style={{ marginLeft: '.5vw'}}  id={`${data[i][0]}`} name={`${data[i][0]}.${data[i][6]}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                  Submit Edit
                </button>
                <button onClick={e => {e.preventDefault();document.getElementById(`form${i}`).className = 'hidden'}}  style={{ marginLeft: '.5vw'}}  id={`${data[i][0]}`} name={`${data[i][0]}.${data[i][6]}`} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                  Close Edit
                </button>
              </div>
            </div>
            <div id={`delete${i}`} className='hidden flex space-y-8 flex-col w-full h-48 bg-gray-900 place-content-center'>
              <div className='justify-self-start text-red-300 text-center'>
                Are you Sure You Want To Delete Picture?
              </div>
              <div  className="flex items-center justify-center">
                <button onClick={e => handleDelete(e)} style={{ marginLeft: '.5vw'}}  id={`${data[i][0]}`} name={`${data[i][0]}.${data[i][6]}`} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                  Delete Pic
                </button>
                <button onClick={e => {e.preventDefault();document.getElementById(`delete${i}`).className = 'hidden'}}  style={{ marginLeft: '.5vw'}}  id={`${data[i][0]}`} name={`${data[i][0]}.${data[i][6]}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Close 
                </button>
              </div>
            </div>
          
          </form>
      </div>
    )
    }
    setPicArr((picArr) => [...picArr]);
    // eslint-disable-next-line
  }, [data])
  
  // const Pic = PicArr && PicArr.map((pic) => (pic))

  return (
    <div className='block md:grid grid-cols-4'>
      {picArr.map((pic) => (pic))}
    </div>


    )
};

export default KevsPics;

