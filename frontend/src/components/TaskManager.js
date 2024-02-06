import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css';

const TaskList = ({ tasks, onDelete }) => {
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/tasks/${id}`);
            onDelete();
            alert('Task deleted successfully!');
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Error deleting task. Please try again.');
        }
    };

    return (
        <div className="task-list-container">
            <h2>Task List</h2>
            <ul className="task-list">
                {tasks.map(task => (
                    <li key={task.id} className="task-item">
                        {task.title} - {task.description}
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            await axios.post(
                '/api/tasks',
                { title, description },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            setTitle('');
            setDescription('');
            setLoading(false);
            alert('Task added successfully!');

            onTaskAdded();
        } catch (error) {
            console.error('Error adding task:', error);
            setLoading(false);
            alert('Error adding task. Please try again.');
        }
    };

    return (
        <div className="task-form">
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <button type="submit" disabled={loading}>Add Task</button>
            </form>
        </div>
    );
};

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/tasks');
                setTasks(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchData();

    }, []);

    const updateTaskList = async () => {
        try {
            const response = await axios.get('/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    return (
        <div>
            <TaskList tasks={tasks} onDelete={updateTaskList} />
            <TaskForm onTaskAdded={updateTaskList} />
        </div>
    );
};

export default TaskManager;
