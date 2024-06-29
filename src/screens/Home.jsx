import React, { useState, useEffect } from 'react';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjdmYjI5NzE3YjIwNDUxYzI3NTVkMWUiLCJpYXQiOjE3MTk2NDgzNTd9.GRhtaUtI7W9r3HJHcRVP79bL-3gTw3IzemgsxVJ7CTY';  // Replace this with your actual token

    useEffect(() => {
        // Fetch initial todos from the backend
        fetch('https://backend-todo-app-steel.vercel.app/todos', {
            method: 'get',
            headers: {
                'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjdmYjI5NzE3YjIwNDUxYzI3NTVkMWUiLCJpYXQiOjE3MTk2NDgzNTd9.GRhtaUtI7W9r3HJHcRVP79bL-3gTw3IzemgsxVJ7CTY"
            }
        })
            .then(response => response.json())
            .then(data => {
                setTasks(data.data);
                console.log(data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the todos!', error);
            });
    }, [token ]);


    const addTask = async (e) => {
    e.preventDefault();
    if (task.trim()) {
        try {
            let response;
            if (isEditing) {
                // Update the existing task
                response = await fetch(`https://backend-todo-app-steel.vercel.app/todos/edit/${currentTaskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ todo: task })
                });
            } else {
                // Add a new task
                response = await fetch('https://backend-todo-app-steel.vercel.app/todos/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ todo: task })
                });
            }

            if (!response.ok) {
                // Handle server errors
                const errorData = await response.json();
                console.error('Server Error:', errorData);
                alert(`Error: ${errorData.message}`);
                return;
            }

            const data = await response.json();
            if (isEditing) {
                setTasks(tasks.map(t => t._id === currentTaskId ? data.data : t));
                setIsEditing(false);
                setCurrentTaskId(null);
            } else {
                setTasks([...tasks, data.data]); // Append new task to current tasks
                console.log(tasks , data);
            }
            // setTasks([...tasks,data.data])
            
        } catch (error) {
            // Handle network errors
            console.error('There was an error adding/updating the task!', error);
        } finally {
            setTask(''); // Clear the task input field
        }
    }
};
    
    

    const editTask = (id, task) => {
        console.log(id);
        setTask(task);
        setIsEditing(true);
        setCurrentTaskId(id);
    };

    const deleteTask = (id) => {
        fetch(`https://backend-todo-app-steel.vercel.app/todos/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                setTasks(tasks.filter(task => task._id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the task!', error);
            });

        if (isEditing && id === currentTaskId) {
            setTask('');
            setIsEditing(false);
            setCurrentTaskId(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Todo List</h1>
                <form className="flex mb-4" onSubmit={addTask}>
                    <input
                        type="text"
                        className="border rounded w-full py-2 px-3 mr-4 text-gray-700"
                        placeholder="Enter your task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                     
                    />
                    <button
                        className="bg-blue-500 text-white rounded px-4 py-2"
                        type='submit'
                    >
                        {isEditing ? 'Update' : 'Add'}
                    </button>
                </form>
                <ul>
                

                    {tasks.length > 0 ? tasks.map((item , index)=>{
                        return <li
                        key={index}
                        className="bg-gray-200 p-2 rounded mb-2 text-gray-700 flex justify-between items-center"
                    >
                        {item.todo}
                        <div>
                            <button
                                className="bg-yellow-500 text-white rounded px-2 py-1 mr-2"
                                onClick={() => editTask(item._id, item.todo)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white rounded px-2 py-1"
                                onClick={() => deleteTask(item._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                    }) : <li className='text-black'>No Todo!</li>}
                </ul>
            </div>
        </div>
    );
};

export default Home;
