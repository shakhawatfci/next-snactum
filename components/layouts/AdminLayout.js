    import MainNav from "../Navbar";
    import  { Toaster } from 'react-hot-toast';
    import AuthContext from "../../context/AuthContext";
    import Cookies from 'js-cookie'
    import { useEffect, useState } from "react";
    import { useRouter } from "next/router";

    export default function AdminLayout({ children }) {
        const router = useRouter();

        const [user , setUser] = useState({});

        useEffect(() => {

            let  loggin_user  = Cookies.get('user');
             
             if(loggin_user){
                loggin_user = JSON.parse(loggin_user);
                setUser(loggin_user); 
             }
             else
             {

                router.push('/login');
                 
             }
             
        },[])

        return (
            <AuthContext.Provider value={{user:user}}>
            <div>

            <MainNav/>
            <div>
                <Toaster position="top-right" /> 
            </div>

            {children}

            </div>
            </AuthContext.Provider>

        );
    }

