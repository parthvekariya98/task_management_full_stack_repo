import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        axios.post('https://65a1f8f142ecd7d7f0a706e3.mockapi.io/tasks', { title, description })
            .then(() => {
                setTitle('');
                setDescription('');
                alert('Task added successfully!');
            })
            .catch(error => console.error('Error adding task:', error));
    };

    return (
        <div>
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default TaskForm;