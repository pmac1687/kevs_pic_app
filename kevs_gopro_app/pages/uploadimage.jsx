import { useContext } from "react";
import Uploader from "./components/Uploader";
import UserContext from "./components/UserContext";
import Login from "./components/Login";

const UploadImage = () => {
    const { user, getToken } = useContext(UserContext)
    return (
        <>
            { (!sessionStorage.getItem()) ? <Login /> : <Uploader />  }
        </>
    )
}

export default UploadImage;