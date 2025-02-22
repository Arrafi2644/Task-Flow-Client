import React from 'react';
import { useDrag } from 'react-dnd';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const TaskItem = ({ task, openEditModal, handleDeleteTask }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TASK',
        item: { id: task._id, category: task.category },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div 
            ref={drag}
            className={`bg-pink-400 p-4 rounded-md space-y-2 my-4 cursor-move ${isDragging ? 'opacity-50' : 'opacity-100'}`}
            key={task._id}
        >
            <p className='font-bold'>{task.title}</p>
            <p>{task?.description}</p>
            <div className='flex items-center gap-2'>
                <button onClick={() => openEditModal(task)} className="btn btn-sm"><FaEdit /></button>
                <button onClick={() => handleDeleteTask(task._id)} className="btn btn-sm"><FaTrashAlt /></button>
            </div>
        </div>
    );
};

export default TaskItem;
