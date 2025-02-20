import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import toast from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
    const {signInWithGoogle, user, logout} = useContext(AuthContext)
    
    const handleSignInWithGoogle = () => {
           signInWithGoogle()
           .then(result => {
            if(result?.user){
                toast.success("Login successful!")
            }
           })
           .catch(err => {
            console.log(err);
            if(result?.user){
                toast.error("Something went wrong! Try again.")
            }
           })
    }

    const handleLogout = () => {
        logout()
        .then(result => {
            toast.success("Logout successful!")
        }).catch(err => {
            console.log(err);
        })
    }
    console.log(user);

  

    return (
        <div className='bg-pink-700 text-white'>
            <div className="navbar max-w-7xl w-11/12 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        {/* <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div> */}
                        {/* <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a>Item 1</a></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul> */}
                    </div>
                    <Link to={'/'} className="font-bold text-xl">Task Flow</Link>
                </div>
                {/* <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Item 1</a></li>
                        <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div> */}
                <div className="navbar-end">
                    {
                        user? <button onClick={handleLogout} className="btn btn-sm btn-outline text-white border-white hover:border-white hover:bg-pink-800">Logout</button>: 
                    <button onClick={handleSignInWithGoogle} className="btn btn-sm btn-outline text-white border-white hover:border-white hover:bg-pink-800">Login</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;