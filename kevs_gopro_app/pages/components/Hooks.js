import { useState, useEffect } from "react"


function useUser(_user){
    // const [sessUser, setSessUser] = useState('');

    useEffect(() => {
        if (_user) {
            console.log(_user)
            setSessUser(prev => _user)
        }
    },[])

    return (sessUser)
}

export default useUser;