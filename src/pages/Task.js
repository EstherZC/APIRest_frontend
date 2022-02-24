import React, {Component} from 'react';
import axios from 'axios';
import './Task.css';

class Task extends Component
{
    constructor(){
        super();
        this.state = {
            tasks: []
        }
        this.create_Tasks_Table = this.create_Tasks_Table.bind(this);
    }
    
    async componentDidMount(){
        const res = await axios.get('http://127.0.0.1:8000/');
        if(res.data.status === 200){
            console.log(res);
            this.setState({
                tasks: res.data.tasks
            })
        }
    }

    create_Tasks_Table(){
        var tasks_Table_HTLM =<tr></tr>;
        if(this.state.tasks.length !== 0)
        {
            tasks_Table_HTLM = this.state.tasks.map( (item) =>{
                var isCheck = false;
                if(item.status === 0){
                    isCheck=true;
                }
                return (
                    <tr key={item.id}>
                        <td>
                            <input type='checkbox' checked={isCheck} onChange={this.change_Task_Status} name={item.id}/>
                            <label className={isCheck? "checkTask" : ""}>{item.name}</label>
                        </td>
                    </tr>
                );
            });
        }
        return tasks_Table_HTLM;
    }  

    change_Task_Status(){

    }
    render(){
        return (
            <div className='container-api'>
                <h1 className='title-api'>Tasks</h1>
                <div className='add-tasks'>
                    <p>Add new task:</p>
                </div>
                <div className='all-tasks'>
                    <table className='table-task'>
                        <thead >
                            <tr>
                                <td className='table-head'>All my tasks:</td>
                            </tr>
                        </thead>
                        <tbody>
                        {this.create_Tasks_Table()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Task;