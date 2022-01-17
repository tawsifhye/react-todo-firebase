import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom"
import { Button, Container, Typography } from '@mui/material';
import useDataProvider from '../Context/useDataProvider';


const TaskManager = () => {
    const [taskList, setTaskList] = useDataProvider();
    const [updatedTaskName, setUpdatedTaskName] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');
    const { pathname } = useLocation();
    const { taskid } = useParams();
    const selectedTask = taskList.find((task) => task.id == taskid);

    let navigate = useNavigate();
    const navigateRoute = () => {
        navigate('/');
    }
    const { register, handleSubmit, resetField, formState: { errors } } = useForm();
    const onSubmit = data => {
        const newTask = {
            id: Math.random() * 100,
            ...data,
            status: false,
        }
        const updatedTaskList = [...taskList, newTask];
        setTaskList(updatedTaskList);
        resetField("pendingTask", 'dueDate')
        // navigate('/');
    }
    const getUpdatedTask = (e) => {
        setUpdatedTaskName(e.target.value);
    }
    const getDate = (e) => {
        setUpdatedDate(e.target.value)
    }
    const updateHandler = () => {
        const updatedTask = {
            id: selectedTask?.id,
            pendingTask: updatedTaskName || selectedTask?.pendingTask,
            dueDate: updatedDate || selectedTask?.dueDate
        }
        const updatedTaskList = [];
        updatedTaskList.push(updatedTask);
        const newTaskList = taskList.map(task => updatedTaskList.find(o => o.id === task.id) || task);
        setTaskList(newTaskList);
    }

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            {
                pathname === '/addtask' ?

                    <>
                        <Typography variant='h2'>
                            Add Task
                        </Typography>
                        <form form onSubmit={handleSubmit(onSubmit)}>
                            <input placeholder='Task' {...register("pendingTask", { required: true })} />
                            <br />
                            <input type='date' {...register("dueDate", { required: true })} />
                            <br />

                            <input type="submit" />
                            <br />
                            {(errors.pendingTask || errors.dueDate) && <span>This field is required</span>}
                        </form>
                        <Button sx={{ marginTop: '20px' }} variant='contained' onClick={navigateRoute}>Show ToDo List</Button>
                    </>
                    :
                    <>
                        <Typography variant='h2'>
                            Edit Task
                        </Typography>
                        <form form onSubmit={handleSubmit(onSubmit)}>
                            <input defaultValue={selectedTask.pendingTask} {...register("pendingTask", { required: true })} onBlur={getUpdatedTask} />
                            <br />
                            <input defaultValue={selectedTask.dueDate} type='date' {...register("dueDate", { required: true })} onBlur={getDate} />
                            <br />
                            <Button sx={{ marginTop: '20px' }} variant='outlined' onClick={updateHandler} >Update Task</Button>
                            <br />
                            {(errors.pendingTask || errors.dueDate) && <span>This field is required</span>}
                        </form>
                        <Button sx={{ marginTop: '20px' }} variant='contained' onClick={navigateRoute}>Show ToDo List</Button>


                    </>

            }




        </ Container>
    );
};

export default TaskManager;