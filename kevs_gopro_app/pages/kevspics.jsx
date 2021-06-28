import { useEffect } from "react";

const KevsPics = () => {
    /*
    useEffect(() => {
        axios.get(`http://localhost:5000/add_row/${slug}`, {
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
    }, []);
    */
    const Pic = () => 
        <>
            <div>hello</div>
            <img src='https://kevspics.s3.us-west-1.amazonaws.com/brussels.JPG' alt="Girl in a jacket" width="500" height="600" /> 
            <div>hello</div>
        </>

    return (

            <div>
                <Pic />
            </div>
    )
};
    
export default KevsPics;