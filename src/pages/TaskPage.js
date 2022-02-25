import React, {Component} from 'react';
import './Task.css';
import Task from './Task';

class TaskPage extends Component
{
    constructor(){
        super();
        this.state = {
            tasks: [],
            newTaskValue: '',
            msgError: ''
        }
        this.create_Tasks_Table = this.create_Tasks_Table.bind(this);
        this.change_New_Name_Task = this.change_New_Name_Task.bind(this);
        this.show_All_Tasks = this.show_All_Tasks.bind(this);
        this.create_New_Task = this.create_New_Task.bind(this);
        this.change_Task_Status = this.change_Task_Status.bind(this);
    }
    
    async componentDidMount(){
        this.show_All_Tasks();
    }

    create_Tasks_Table(){
        var tasks_Table_HTLM =<tr></tr>;
        if(this.state.tasks.length !== 0)
        {
            tasks_Table_HTLM = this.state.tasks.map( (item) =>{
                var isCheck = (item.status === 0) ? true : false;
                return this.create_Table_Row(item, isCheck);
            });
        }
        return tasks_Table_HTLM;
    }  

    create_Table_Row(item, isCheck){
        var buttonName = (isCheck) ? 'Uncheck' : 'Check';
        return (<tr key={item.id}>
            <td>
           
            <form method='POST' onSubmit={this.change_Task_Status}>
                <input type="hidden" name="_method" value="PATCH"/> 
                <input type="hidden" name="idTask" value={item.id}/> 
                <input type="hidden" name="name" value={item.name}/> 
                <input type="hidden" name="isCheck" value={isCheck}/> 
                <label className={isCheck? "checkTask" : ""}>{item.name}</label>
                <button className='button-change' type='submit' >{buttonName}</button>
            </form>
            </td>
        </tr>);
    }

    change_Task_Status(event)
    {
        event.preventDefault();
        var newStatus = 0;
        if(event.target.isCheck.value === 'true'){
            newStatus = 1
        }
        const taskInfo = { id: event.target.idTask.value,
        name: event.target.name.value,
        status: newStatus
        };
        Task.update_Status_Task(taskInfo).then(patchRequest =>{
            if(patchRequest.status === 200){
                this.setState({
                    tasks: patchRequest.tasks
                })
            }else{
                console.log("No save: "+ patchRequest)
            }
        });
    }

    change_New_Name_Task(name)
    {
        this.setState({newTaskValue: name.target.value,
            msgError: ''
        });
    }

    show_All_Tasks(){
        Task.get_All_Tasks().then(getRequest =>{
            if(getRequest.status === 200){
                this.setState({
                    tasks: getRequest.tasks
                })
            }
        });
    }
    
    create_New_Task(event)
    {
        event.preventDefault();
        var nameTask = this.state.newTaskValue;
        Task.add_Task(nameTask).then(postRequest =>{
            if(postRequest.status === 200){
                this.setState({
                    tasks: postRequest.tasks,
                    newTaskValue: '',
                    msgError: ''
                })
            }else{
                this.setState({
                    newTaskValue: '',
                    msgError: 'Invalid Task'
                })
            }
        });
       
    }

    render(){
        return (
            <div className='container-api'>
                <h1 className='title-api'>Tasks</h1>
                <div className='add-tasks'>
                    <label><p className='title-p'>Add new task:</p></label>
                    <p className='msgError'>{this.state.msgError}</p>
                    <form method='POST' onSubmit={this.create_New_Task}>
                        <input type='text' name='name' value={this.state.newTaskValue} onChange={this.change_New_Name_Task}/>
                        <button className='button-save' type='submit'>Save</button>
                    </form>
                </div>
                <div className='all-tasks'>
                    <table className='table-task'>
                        <thead >
                            <tr>
                                <th className='table-head'>All my tasks:</th>
                            </tr>
                        </thead>
                        <tbody className='table-body'>
                        {this.create_Tasks_Table()}
                        </tbody >
                    </table>
                </div>
            </div>
        );
    }
}

export default TaskPage;