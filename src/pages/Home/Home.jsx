import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import toast from 'react-hot-toast';
import useTasks from '../../hooks/useTasks';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { IoMdAddCircleOutline } from 'react-icons/io';
import TaskItem from '../../components/TaskItem';
import Banner from '../../components/Banner/Banner';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [tasks, refetch] = useTasks();
    const axiosSecure = useAxiosSecure();

    const [editingTask, setEditingTask] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const todoTask = tasks.filter(task => task.category === "todo");
    const inProgressTask = tasks.filter(task => task.category === "inprogress");
    const doneTask = tasks.filter(task => task.category === "done");

    // Function to move a task when dropped into a different category
    const moveTask = (taskId, newCategory) => {
        axiosSecure.put(`/tasks/category/${taskId}`, { category: newCategory })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success("Task Moved Successfully!");
                    refetch();  // ✅ Refresh the tasks after update
                }
            })
            .catch(() => toast.error("Failed to move task!"));
    };
    

    // Function to delete a task
    const handleDeleteTask = (taskId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover this task!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tasks/${taskId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            toast.success("Task Deleted Successfully!");
                            refetch();
                        }
                    })
                    .catch(() => toast.error("Failed to delete task!"));
            }
        });
    };

    const handleAddTask = (e) => {
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

    // Function to open edit modal
    const openEditModal = (task) => {
        setEditingTask(task);
        setNewTitle(task.title);
        setNewDescription(task.description);
        document.getElementById('edit_task_modal').showModal();
    };

    // Function to update a task
    const handleUpdateTask = () => {
        if (!newTitle || !newDescription) {
            toast.error("Title and description cannot be empty!");
            return;
        }

        axiosSecure.put(`/tasks/${editingTask._id}`, { title: newTitle, description: newDescription })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success("Task Updated Successfully!");
                    refetch();
                    document.getElementById('edit_task_modal').close();
                }
            })
            .catch(() => toast.error("Failed to update task!"));
    };

    // Drop zone component for each task category
    const DropZone = ({ category, children }) => {
        const [{ isOver }, drop] = useDrop({
            accept: "TASK",
            drop: (item) => {
                moveTask(item.id, category);  // ✅ Move task when dropped
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
            }),
        });
    
        return (
            <div ref={drop} className={`border rounded-md p-4 ${isOver ? "bg-gray-200" : "bg-white"}`}>
                <h2 className="font-bold text-xl text-center capitalize">{category}</h2>
                {children}
            </div>
        );
    };
    

    return (
        <div>
            {user ? (
                <DndProvider backend={HTML5Backend}>
                    <div className="py-10 max-w-7xl w-11/12 mx-auto min-h-screen">
                        <h2 className="text-2xl md:text-3xl font-bold text-center pb-8 text-pink-700">Make Your Task</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-black">
                            {/* To-Do Column */}
                            <DropZone category="todo">
                                <button 
                                    onClick={() => document.getElementById('my_modal_3').showModal()} 
                                    className="btn w-full btn-sm bg-pink-700 text-white my-4 flex items-center"
                                >
                                    <IoMdAddCircleOutline className="mr-1" /> Add Task
                                </button>
                                {todoTask.map(task => (
                                    <TaskItem 
                                        key={task._id} 
                                        task={task} 
                                        handleDeleteTask={handleDeleteTask} 
                                        openEditModal={openEditModal} 
                                    />
                                ))}
                            </DropZone>

                            {/* In Progress Column */}
                            <DropZone category="inprogress">
                                {inProgressTask.map(task => (
                                    <TaskItem 
                                        key={task._id} 
                                        task={task} 
                                        handleDeleteTask={handleDeleteTask} 
                                        openEditModal={openEditModal} 
                                    />
                                ))}
                            </DropZone>

                            {/* Done Column */}
                            <DropZone category="done">
                                {doneTask.map(task => (
                                    <TaskItem 
                                        key={task._id} 
                                        task={task} 
                                        handleDeleteTask={handleDeleteTask} 
                                        openEditModal={openEditModal} 
                                    />
                                ))}
                            </DropZone>
                        </div>
                    </div>
                </DndProvider>
            ) : (
                <Banner></Banner>
            )}

            {/* Add Task Modal */}
<dialog id="my_modal_3" className="modal">
    <div className="modal-box">
        <h3 className="font-bold text-lg">Add New Task</h3>
        
        <form onSubmit={handleAddTask} className="space-y-4">
            <input type="text" name="title" placeholder="Task Title" className="input input-bordered w-full" required />
            <textarea name="description" placeholder="Task Description" className="textarea textarea-bordered w-full" required></textarea>
            <button type="submit" className="btn bg-pink-700 text-white w-full">Add Task</button>
        </form>
        
        <div className="modal-action">
            <button onClick={() => document.getElementById('my_modal_3').close()} className="btn">Close</button>
        </div>
    </div>
</dialog>


            {/* Edit Task Modal */}
            <dialog id="edit_task_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Task</h3>
                    <input 
                        type="text" 
                        value={newTitle} 
                        onChange={(e) => setNewTitle(e.target.value)} 
                        className="input input-bordered w-full my-2" 
                    />
                    <textarea 
                        value={newDescription} 
                        onChange={(e) => setNewDescription(e.target.value)} 
                        className="textarea textarea-bordered w-full my-2" 
                    ></textarea>
                    <div className="modal-action">
                        <button onClick={handleUpdateTask} className="btn btn-sm bg-green-500 text-white">Save</button>
                        <button onClick={() => document.getElementById('edit_task_modal').close()} className="btn btn-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Home;
