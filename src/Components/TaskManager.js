import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom"
import { Button, Container, Typography } from '@mui/material';
import useDataProvider from '../Context/useDataProvider';
import { fontWeight, style } from '@mui/system';

const styles = {
    form: {
        marginTop: '10px',
        padding: '15px',
        fontSize: '15px'
    },
    submit: {
        marginTop: '10px',
        padding: '15px 30px',
        fontWeight: 'bold',
        fontSize: '15px',
        backgroundColor: '#5454D4',
        border: 'none',
        color: 'white',
        transition: '.3s',
        cursor: 'pointer',
    },

}

const TaskManager = () => {
    const [taskList, setTaskList] = useDataProvider();
    const [updatedTaskName, setUpdatedTaskName] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');
    const { pathname } = useLocation();
    const { taskid } = useParams();
    const selectedTask = taskList.find((task) => task.id === taskid);

    let navigate = useNavigate();
    const navigateRoute = () => {
        navigate('/');
    }
    const { register, handleSubmit, resetField, formState: { errors } } = useForm();
    const onSubmit = data => {
        const newTask = {
            id: (Math.random() * 100).toString(),
            ...data,
            status: false,
        }
        const updatedTaskList = [...taskList, newTask];
        setTaskList(updatedTaskList);
        resetField("pendingTask", 'dueDate')

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
        navigate('/');
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
                        <Typography variant='h3'>
                            Add Task
                        </Typography>
                        <form form onSubmit={handleSubmit(onSubmit)}>
                            <input placeholder='Task' {...register("pendingTask", { required: true })} style={styles.form} />
                            <br />
                            <input type='date' {...register("dueDate", { required: true })} style={styles.form} />
                            <br />

                            <input type="submit" style={styles.submit} />
                            <br />
                            {(errors.pendingTask || errors.dueDate) && <span>This field is required</span>}
                        </form>
                        <Button sx={{ marginTop: '20px' }} variant='contained' onClick={navigateRoute}>Show ToDo List</Button>
                    </>
                    :
                    <>
                        <Typography variant='h3'>
                            Edit Task
                        </Typography>
                        <form form onSubmit={handleSubmit(onSubmit)}>
                            <input defaultValue={selectedTask.pendingTask} {...register("pendingTask", { required: true })} onBlur={getUpdatedTask} style={styles.form} />
                            <br />
                            <input defaultValue={selectedTask.dueDate} type='date' {...register("dueDate", { required: true })} onBlur={getDate} style={styles.form} />
                            <br />
                            <button style={styles.submit} onClick={updateHandler} >Update</button>
                            <br />
                            {(errors.pendingTask || errors.dueDate) && <span>This field is required</span>}
                            <Button sx={{ marginTop: '20px' }} variant='contained' onClick={navigateRoute}>Show ToDo List</Button>
                        </form>



                    </>

            }




        </ Container>
    );
};

export default TaskManager;