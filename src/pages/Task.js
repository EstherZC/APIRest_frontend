import React, {Component} from 'react';
import axios from 'axios';
import './Task.css';

class Task extends Component
{
    static async update_Status_Task(data)
    {
        const patchRequest = await axios.patch('http://127.0.0.1:8000/api/update', data);
        return await patchRequest.data;
    }

    static async get_All_Tasks()
    {
        const getRequest = await axios.get('http://127.0.0.1:8000/api');
        return await getRequest.data;
    }

    static async add_Task(nameTask)
    {
        const data = {
            name: nameTask
        }
        const postRequest = await axios.post('http://127.0.0.1:8000/api', data);
        return await postRequest.data;
    }
    
}

export default Task;