import MainNav from "../Navbar";


export default function AdminLayout({ children }) {

    return (
        <div>

            <MainNav/>

            {children}

        </div>
    );
}

