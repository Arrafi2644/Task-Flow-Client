import React, { useContext } from 'react';
import Banner from '../../components/Banner/Banner';
import { AuthContext } from '../../Context/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import useTasks from '../../hooks/useTasks';

const Home = () => {
    const { user } = useContext(AuthContext)
    const [tasks, refetch] = useTasks()
    const axiosPublic = useAxiosPublic()

console.log("Tasks are", tasks);
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const timestamp = new Date().toString()
       
        console.log(title, description, timestamp);

        if(title.length > 50){
            return toast.error("Task title cannot exceed 50 characters.")
        }

        if(description.length > 200){
            return toast.error("Task description cannot exceed 200 characters.")
        }
        const task = {
            title: title,
            description: description,
            timestamp: timestamp,
            category: "todo",
            email: user?.email
        }

        axiosPublic.post('/tasks', task)
        .then(res => {
            console.log(res);
            if(res.data.insertedId){
                toast.success("Task Added Successfully!")
                refetch()
            }
        })
        .catch(err => {
            toast.err("Something went wrong! Try again.")
        })
    }

    console.log(tasks);
    return (
        <div>
            {
                user ? <div className='bg-pink-600'>
                    <div className="py-10 max-w-7xl w-11/12 mx-auto min-h-screen">
                        {/* banner head section  */}
                        <div>
                            <h2 className='text-2xl md:text-3xl font-bold text-center pb-8 text-white'>Make your task</h2>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 text-white'>
                            <div className='border rounded-md p-4 bg-pink-600'>
                                {/* category-title  */}
                                <div>
                                    <h2 className='font-bold text-xl md:text-2xl text-center pb-4'>To-Do</h2>
                                </div>
                                {/* category-content  */}
                                <div>
                                    <button onClick={() => document.getElementById('my_modal_4').showModal()} className="btn w-full btn-sm bg-pink-700 hover:bg-pink-800 text-white mb-4">+ Add Task</button>

                                    {
                                        tasks.map(task => <div className='bg-pink-400 p-4 rounded-md space-y-2 my-4' key={task._id}>

                                             <p className='font-bold'> {task.title}</p>
                                             <p>{task?.description}</p>
                                             <div className='flex items-center gap-2'>
                                                <button className="btn btn-sm">Edit</button>
                                                <button className="btn btn-sm">Delete</button>
                                             </div>
                                            </div>)
                                    }
                                </div>
                            </div>
                            <div className='border rounded-md p-4'>
                                {/* category-title  */}
                                <div>
                                    <h2 className='font-bold text-xl md:text-2xl text-center'>In Progress</h2>
                                </div>
                                {/* category-content  */}
                                <div>
                                </div>

                            </div>
                            <div className='border rounded-md  p-4'>
                                {/* category-title  */}
                                <div>
                                    <h2 className='font-bold text-xl md:text-2xl text-center'>Done</h2>
                                </div>
                                {/* category-content  */}
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    :
                    <Banner />
            }

            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_4').showModal()}>open modal</button> */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-xl text-center">Add A Task</h3>
                    <form onSubmit={handleSubmit} className="card-body pt-0">
            
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Task Title</span>
                            </label>
                            <input type="text" name='title' maxLength={50} placeholder="Task title" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description:</span>
                            </label>

                            <textarea name='description' className="textarea textarea-bordered" maxLength={200} placeholder="Task description"></textarea>
                        </div>
                        {/* <div className="form-control">
                            <label className="label">
                                <span className="label-text">Time</span>
                            </label>
                            <input type="date" name='time' placeholder="Select time" className="input input-bordered" required />
                        </div> */}

                        <div className="form-control mt-6">
                            <button className="btn bg-primary hover:bg-secondary">Add Task</button>
                        </div>

                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>

    );
};

export default Home;