import MainNav from "../Navbar";
import  { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children }) {

    return (
        <div>

            <MainNav/>
            <div>
                <Toaster position="top-right" /> 
            </div>
           
            {children}

        </div>
    );
}

