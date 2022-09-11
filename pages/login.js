import { useState } from "react";
import Cookies from 'js-cookie'
import axios from '../util/server';
import { useRouter } from "next/router";
import guestMiddleware from "../middleware/guestMiddleware";

import  { Toaster } from 'react-hot-toast';
import { showValidationErrors , successMessage } from "../util/helper";

export default function Login()
{
    const router = useRouter();
    const [loginData , setForm ] = useState({ email : '', password : '' });
    const [isLoading,setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post('login', loginData)
             .then(res => {
                    Cookies.set('access_token', res.data.data.access_token);
                    Cookies.set('user', JSON.stringify(res.data.data.user));
                    successMessage('You are logged in');
                    router.push('/');
                }
            ).catch(err => {
                showValidationErrors(err);
            }).finally(() => {
                setLoading(false);
            });

    }


    return (
        // design a login page using react boostrap login form will be center in browser with input email , password and login button
        <div className="container">
            <Toaster position="top-right"/>
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card card-body">
                        <h3 className="text-center mb-3">
                            <i className="fas fa-user-circle"></i> Login
                        </h3>
                        <form onSubmit={handleLogin}>
                            <div className="form-group mb-2">
                                <label htmlFor="email">Email</label>
                                <input type="email" onChange={(e) => setForm({...loginData , email : e.target.value })} className="form-control" id="email" name="email" placeholder="Enter email" />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="password">Password</label>
                                <input type="password" onChange={(e) => setForm({...loginData , password : e.target.value })} className="form-control" id="password" name="password" placeholder="Enter password" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">{isLoading ? 'Login....' : 'Login'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}


export const getServerSideProps = async (context)=>  guestMiddleware(context , {});