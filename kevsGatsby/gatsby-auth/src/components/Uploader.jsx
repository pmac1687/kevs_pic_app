/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React ,{useState} from 'react';
import AWS from 'aws-sdk';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { BUCKET_NAME, REGION_NAME, ACCESS_KEY, SECRET_KEY } from "/home/pat/Desktop/kevs_pic_app/kevs_pic_app/kevsGatsby/gatsby-auth/env/development.js"


// `https://kev.patrickjmcdermott/add_row/${slug}`
const S3_BUCKET =BUCKET_NAME;
const REGION = REGION_NAME;


AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})


const Uploader = () => {

    const [startDate, setStartDate] = useState(new Date());

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const col = progress < 100 ? 'red' : 'green';

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const showPics = () => {
    const upload = document.getElementById('upload')
    upload.style.display = 'none'
    const pics = document.getElementById('pics');
    pics.style.display = 'block'
    }

    const addToDb = (fType) => {
        const name = document.getElementById('grid-first-name').value ? document.getElementById('grid-first-name').value : '';
        const occasion = document.getElementById('occasion').value ? document.getElementById('occasion').value : '';
        const tags = document.getElementById('tags').value ? document.getElementById('tags').value : '';
        const date = startDate.toISOString().split('T')[0];
        const fileType = document.getElementById('file-type').value;
        const location = document.getElementById('location').value ? document.getElementById('location').value : '';
        const slug = `${name}&${occasion}&${tags}&${date}&${fileType}&${location}&${fType}`
        axios.get(`https://kev.patrickjmcdermott.com/add_row/${slug}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          }
        })  
        .then(res => res.data)
        .then(data => {
          console.log('resdata', data)  
        })
        .catch(err => {  
          console.log(err)  
        });  
  };
    

    const uploadFile = (file) => {
        const name = document.getElementById('grid-first-name').value;
        const fileType = file.name.split('.')[1]
        console.log(file)
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: `${name}.${fileType}`
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
                if (evt.loaded === evt.total) {
                    addToDb(fileType)
                }
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }


    return (
    <div>
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                File name(required)
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" />
              <p className="text-red-500 text-xs italic">Please fill out this field.</p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                Occasion
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="occasion" type="text" placeholder="Bat Mitzvah" />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                Tag Categories(seperate by commas)
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="tags" type="text" placeholder="ex. vacation, birthday, honeymoon, thailand trip" />
              <p className="text-gray-600 text-xs italic">.</p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                    Date
                </label>
                <div className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <DatePicker
                    style={{ marginLeft: '10vw'}}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    // CalendarContainer={MyContainer}
                    />
                </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                File Type
              </label>
              <div className="relative">
                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="file-type">
                  <option>Image</option>
                  <option>Video</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                location
              </label>
              <input style={{ width: '15vw'}} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="location" type="text" placeholder="ex. 90210 or Reno" />
                </div>
            </div>
            <div style={{ marginTop: '2vh'}}>
                <div style={{ display: 'flex', marginBottom: '1vh'}}>File Upload Progress is: <div style={{ color: col , marginLeft: '.5vw'}}>{progress}%</div></div>
                <input type="file" onChange={handleFileInput}/>
                <button  onClick={() => uploadFile(selectedFile)} className="shadow bg-green-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                    Upload
                </button>
                <button style={{ marginLeft: '1vw'}}  onClick={() => showPics()} className="shadow bg-blue-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                    Upload
                </button>
            </div>
        </form>
            
    </div>
)
}

export default Uploader;