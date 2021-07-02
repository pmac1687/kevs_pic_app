// import { useContext } from "react";
import Uploader from "./Uploader";
// import UserContext from "../components/UserContext";
import styles from '../styles/Home.module.css';


const UploadImage = () => 
    // const { getToken } = useContext(UserContext)
     (
        <div className={styles.container}>
            <Uploader />  
        </div>
    )


export default UploadImage;