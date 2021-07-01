import { useContext } from "react";
import Uploader from "../components/Uploader";
import UserContext from "../components/UserContext";
import Login from "../components/Login";
import styles from '../styles/Home.module.css'


const UploadImage = () => {
    const { getToken } = useContext(UserContext)
    return (
        <div className={styles.container}>
            { (!getToken()) ? <Login /> : <Uploader />  }
        </div>
    )
}

export default UploadImage;