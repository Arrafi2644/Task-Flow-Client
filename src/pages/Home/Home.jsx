import React, { useContext, useState } from 'react';
import Banner from '../../components/Banner/Banner';
import { AuthContext } from '../../Context/AuthProvider';

import toast from 'react-hot-toast';
import useTasks from '../../hooks/useTasks';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { IoAddCircleSharp } from 'react-icons/io5';
import { IoMdAddCircleOutline } from 'react-icons/io';

const Home = () => {
    const { user } = useContext(AuthContext)
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, refetch] = useTasks()
    const axiosSecure = useAxiosSecure()
    const todoTask = tasks.filter(task => task.category === "todo")
    const inProgressTask = tasks.filter(task => task.category === "inprogress")
    const doneTask = tasks.filter(task => task.category === "done")

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const timestamp = new Date().toString()

        console.log(title, description, timestamp);

        if (title.length > 50) {
            return toast.error("Task title cannot exceed 50 characters.")
        }

        if (description.length > 200) {
            return toast.error("Task description cannot exceed 200 characters.")
        }
        const task = {
            title: title,
            description: description,
            timestamp: timestamp,
            category: "todo",
            email: user?.email
        }

        axiosSecure.post('/tasks', task)
            .then(res => {
                console.log(res);
                if (res.data.insertedId) {
                    toast.success("Task Added Successfully!")
                    refetch()
                    form.reset()
                    document.getElementById("my_modal_3").close()
                }
            })
            .catch(err => {
                toast.err("Something went wrong! Try again.")
            })
    }

    const handleDeleteTask = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/tasks/${_id}`)
                    .then(res => {
                        console.log(res?.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your task has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong! Try again!",
                            icon: "error"
                        });
                    })
            }
        });
    }



const openEditModal = (task) => {
    setSelectedTask(task);
    document.getElementById("edit_task_modal").showModal();
};

    const handleUpdateTask = (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedTitle = form.title.value;
        const updatedDescription = form.description.value;
    
        const updatedTask = {
            title: updatedTitle,
            description: updatedDescription,
            timestamp: new Date().toString()
        };
    
        axiosSecure.put(`/tasks/${selectedTask._id}`, updatedTask)
            .then(res => {
                console.log(res);
                if (res.data.modifiedCount > 0) {
                    toast.success("Task Updated Successfully!");
                    refetch(); // Refresh task list
                    form.reset();
                    document.getElementById("edit_task_modal").close();
                }
            })
            .catch(err => {
                toast.error("Failed to update task!");
            });
    };
    
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
                                    <button onClick={() => document.getElementById('my_modal_3').showModal()} className="btn w-full btn-sm bg-pink-700 hover:bg-pink-800 text-white mb-4 flex items-center"><span className='text-base -mr-1'><IoMdAddCircleOutline></IoMdAddCircleOutline> </span> Add Task</button>

                                    {
                                        todoTask.map(task => <div className='bg-pink-400 p-4 rounded-md space-y-2 my-4' key={task._id}>

                                            <p className='font-bold'> {task.title}</p>
                                            <p>{task?.description}</p>
                                            <div className='flex items-center gap-2'>
                                                <button onClick={() => openEditModal(task)} className="btn btn-sm"><FaEdit></FaEdit></button>
                                                <button onClick={() => handleDeleteTask(task._id)} className="btn btn-sm"><FaTrashAlt></FaTrashAlt></button>
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
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-xl text-center text-pink-700">Add A Task</h3>
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

                        <div className="form-control mt-6">
                            <button className="btn bg-pink-700 hover:bg-pink-800 text-white">Add Task</button>
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

            {/* Edit task modal  */}
            <dialog id="edit_task_modal" className="modal">
    <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-xl text-center text-pink-700">Edit Task</h3>
        <form onSubmit={handleUpdateTask} className="card-body pt-0">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Task Title</span>
                </label>
                <input type="text" name="title" defaultValue={selectedTask?.title} className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Description:</span>
                </label>
                <textarea name="description" className="textarea textarea-bordered" defaultValue={selectedTask?.description}></textarea>
            </div>
            <div className="form-control mt-6">
                <button className="btn bg-pink-700 hover:bg-pink-800 text-white">Update Task</button>
            </div>
        </form>
        <div className="modal-action">
            <form method="dialog">
                <button className="btn">Close</button>
            </form>
        </div>
    </div>
</dialog>

        </div>

    );
};

export default Home;