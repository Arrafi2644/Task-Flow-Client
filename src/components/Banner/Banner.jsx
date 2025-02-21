import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Banner = () => {
  const { signInWithGoogle, user, logout } = useContext(AuthContext)
  const axiosSecure = useAxiosSecure()

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then(result => {
        if (result?.user) {

          const userInfo = {
            name: result?.user?.displayName,
            email: result?.user?.email
          }

          axiosSecure.post('/users', userInfo)
            .then(res => {
              console.log(res);
              if (res.data.insertedId) {
                toast.success("User created successfully!")
              }
              else {
                toast.success("Login successful!")

              }
            })
            .catch(err => {
              console.log(err);
            })

        }
      })
      .catch(err => {
        console.log(err);

      })
  }


  return (
    <div className='bg-pink-600'>
        <div className="hero max-w-7xl w-11/12 mx-auto min-h-screen">
            <div className="hero-content text-center">
              <div className="">
                <h1 className="text-5xl font-bold text-white">The everything app, for work.</h1>
                <p className="py-6 w-full md:w-2/3 mx-auto text-white">
                  One app for projects, knowledge, conversations and more. Get more done faster—together.
                </p>
                <button onClick={handleSignInWithGoogle} className="btn bg-pink-700 hover:bg-pink-800 text-white">Get Started. It's Free</button>
              </div>
            </div>
          </div>

    </div>
  )
}

export default Banner;