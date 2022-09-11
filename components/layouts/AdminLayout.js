import MainNav from "../Navbar";
import  { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children }) {

    return (
        <div>

            <MainNav/>
            <Toaster position="top-right"/>
            {children}

        </div>
    );
}

