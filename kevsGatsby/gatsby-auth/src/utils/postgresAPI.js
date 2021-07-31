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