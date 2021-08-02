import axios from "axios";

export const sendSlugToDb = (slug) => {
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
}

export const getPics = async () => {
  let dats = await axios.get(`https://kev.patrickjmcdermott.com/get_rows`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  })
    .then(res => res.data)
    .then(data => {
      // eslint-disable-next-line no-console
      return data
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      return console.log(err)
    });
  console.log('dats, axios',dats)
  return dats
}

export const Delete = (picName, filePath) => {
  //axios.get(`http://127.0.0.1:5000/delete_row/${picName}&${filePath}`, {
  axios.get(`https://kev.patrickjmcdermott.com/delete_row/${picName}&${filePath}`, {
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
}