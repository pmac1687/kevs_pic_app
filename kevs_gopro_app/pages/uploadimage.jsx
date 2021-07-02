import { useContext } from "react";
import Uploader from "../components/Uploader";
import UserContext from "../components/UserContext";
import Login from "../components/Login";
import styles from '../styles/Home.module.css';
import Router from 'next/router'


const UploadImage = () => {
    const { getToken } = useContext(UserContext)
    return (
        <div className={styles.container}>
            <button type='button' onClick={() => Router.push('kevspics.html')}>Kevins Pics</button>
            { (!localStorage.getItem('token')) ? <Login /> : <Uploader />  }
        </div>
    )
}

export default UploadImage;