/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React ,{useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { resizeFile } from '../utils/resizeFile'
import { sendToS3 } from '../utils/AWS';
import { sendSlugToDb } from '../utils/postgresAPI';
import FormUpload from './FormUpload';


const Uploader = () => {

    const [startDate, setStartDate] = useState(new Date());

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [resizedFile, setResizedFile] = useState(null)

    const col = progress < 100 ? 'red' : 'green';

  const handleFileInput = async (e) => {
    const img = e.target.files[0]
    console.log(img, 'e.target')
    setSelectedFile(img)
    const resized_pic = await resizeFile(img)
    console.log(resized_pic)
    setResizedFile(resized_pic);
  };

  const uploadFile = (file) => {
    const name = document.getElementById('grid-first-name').value;
    const fileType = 'JPEG';
    const success = sendToS3(name, fileType, resizedFile, setProgress)
    if (success) {
      const occasion = document.getElementById('occasion').value ? document.getElementById('occasion').value : '';
      const tags = document.getElementById('tags').value ? document.getElementById('tags').value : '';
      const date = startDate.toISOString().split('T')[0];
      const fileType = document.getElementById('file-type').value;
      const location = document.getElementById('location').value ? document.getElementById('location').value : '';
      const slug = `${name}&${occasion}&${tags}&${date}&${fileType}&${location}&${fileType}`;
      sendSlugToDb(slug)
    }

  }

    return (
    <div className='container2'>
        <form className="w-full max-w-lg">
          <FormUpload startDate={startDate} setStartDate={ setStartDate }/>
            <div style={{ marginTop: '2vh'}}>
                <div style={{ display: 'flex', marginBottom: '1vh'}}>File Upload Progress is: <div style={{ color: col , marginLeft: '.5vw'}}>{progress}%</div></div>
                <input type="file" onChange={handleFileInput}/>
                <button  onClick={uploadFile} className="shadow bg-green-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                    Upload
                </button>
            </div>
        </form>
            
    </div>
)
}

export default Uploader;