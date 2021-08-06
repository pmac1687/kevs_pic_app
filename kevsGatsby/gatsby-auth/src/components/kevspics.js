import React, { useEffect, useState } from "react";
import { getPics } from "../utils/postgresAPI";
import { Delete } from "../utils/postgresAPI";
import EditInputs from "./elements/EditInputs";
import Button from "./elements/Button"


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
    const inds = [0,2,3,4,5]
    for (let i = 0; i < data.length; i += 1) {
      console.log(data[i])
      picArr.push(
        <div className='container' key={i}>
          {inds.map((item, index) => (
            <h1 key={index}>{data[i][item]}</h1>
          ))}
          <div>
            <Button subj={'Delete'} func={e => { e.preventDefault(); document.getElementById(`delete${i}`).className = 'flex space-y-8 flex-col w-full h-48 bg-gray-900 place-content-center' }} id={`${data[i][0]}`} name={`${data[i][0]}.${data[i][6]}`} color={'red'} style={{ marginRight: '0px' }} />
            <Button subj={'Edit'} style={{ marginLeft: '.5vw'}} func={() =>{document.getElementById(`form${i}`).className = 'block'}} id={`${data[i][0]}`} name={`${data[i][0]}.${data[i][6]}`} color={'green'} />
          </div>
          {/*<img key={i} src={`https://kevinspics.s3.ap-southeast-2.amazonaws.com/${data[i][0]}.${data[i][6]}`} alt={`${data[i][0]}.${data[i][6]}`} width="500" height="600" />*/}
            <form style={{ height:'600px', width:'600px', backgroundRepeat: 'no-repeat', backgroundSize:'cover', backgroundImage: `url("${`https://kevinspics.s3.ap-southeast-2.amazonaws.com/${data[i][0]}.${data[i][6]}`}")` }} className="w-full max-w-sm">
              <div id={`form${i}`} className="hidden">
                <EditInputs id={'Title'} data={data} i={i} num={0}/>
                <EditInputs id={'Occasion'} data={data} i={i} num={5} />
                <EditInputs id={'Tags'} data={data} i={i} num={3} />
                <EditInputs id={'Date'} data={data} i={i} num={2} />
                <EditInputs id={'Location'} data={data} i={i} num={4} />
                <div style={{ marginTop: '2vh' }} className="flex">
                  <Button subj={'Submit Edit'} func={''} style={{ marginLeft: '.5vw' }} id={ `${data[i][0]}` } name={`${data[i][0]}.${data[i][6]}`} color={'green'} />
                  <Button subj={'Close Edit'} func={e => {e.preventDefault();document.getElementById(`form${i}`).className = 'hidden'}} style={{ marginLeft: '.5vw'}} id={`${data[i][0]}`} name={`${data[i][0]}.${data[i][6]}`} color={'red'} />
                </div>
              </div>
              <div id={`delete${i}`} className='hidden flex space-y-8 flex-col w-full h-48 bg-gray-900 place-content-center'>
                <div className='justify-self-start text-red-300 text-center'>
                  Are you Sure You Want To Delete Picture?
                </div>
                <div className="flex items-center justify-center">
                  <Button subj={'Delete Pic'} func={e => handleDelete(e)} style={{ marginLeft: '.5vw'}}  id={`${data[i][0]}`} name={`${data[i][0]}.${data[i][6]}`} color={'red'} />
                  <Button subj={'Close'} func={e => {e.preventDefault();document.getElementById(`delete${i}`).className = 'hidden'}} style={{ marginLeft: '.5vw'}}  id={`${data[i][0]}`} name={`${data[i][0]}.${data[i][6]}`} color={'blue'} />
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

