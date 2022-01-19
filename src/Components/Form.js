import { Alert, Button, Container, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useDataProvider from '../Context/useDataProvider';

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
    label: {
        display: 'block',
        marginTop: '20px',
    }

}


const Form = () => {
    const [taskList, setTaskList] = useDataProvider();
    const [updatedTaskName, setUpdatedTaskName] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');
    const [isAdded, setIsAdded] = useState(false);
    const { pathname } = useLocation();
    const { taskid } = useParams();
    const selectedTask = taskList.find((task) => task.id === taskid);
    const today = new Date();
    const currentDate = today.getFullYear() + '-' + ('0' + today.getMonth() + 1).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);


    const navigate = useNavigate();
    const navigateRoute = () => {
        navigate('/');
    }
    const { register, handleSubmit, resetField, formState: { errors } } = useForm();

    const handleRemainingDays = (dueDate) => {
        const given = moment(dueDate, "YYYY-MM-DD");
        var current = moment().startOf('day');
        //Difference in number of days
        let remainingDays = moment.duration(given.diff(current)).asDays();
        return remainingDays;
    }

    const onSubmit = data => {

        const newTask = {
            id: (Math.random() * 100).toString(),
            ...data,
            status: false,
            currentDate,
            remainingDays: handleRemainingDays(data.dueDate)
        }
        const updatedTaskList = [...taskList, newTask];
        setTaskList(updatedTaskList);
        resetField("pendingTask", "dueDate");
        setIsAdded('true');

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
            dueDate: updatedDate || selectedTask?.dueDate,
            remainingDays: handleRemainingDays(updatedDate) || selectedTask.remainingDays
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

            <Typography variant='h3'>
                {
                    pathname === '/addtask' ? 'Add Task' : 'Edit Task'
                }

            </Typography>
            <form form onSubmit={handleSubmit(onSubmit)}>
                <label style={styles.label}>Task Name</label>
                {pathname === '/addtask' ?
                    <input placeholder='Task' {...register("pendingTask", { required: true })} style={styles.form} />
                    :
                    <input defaultValue={selectedTask?.pendingTask} {...register("pendingTask", { required: true })} onBlur={getUpdatedTask} style={styles.form} />
                }
                <br />
                <label style={styles.label}>Add Due Date</label>
                {
                    pathname === '/addtask' ?
                        <input type='date' defaultValue={currentDate} min={currentDate} {...register("dueDate", { required: true })} style={styles.form} />
                        :
                        <input defaultValue={selectedTask?.dueDate} type='date' {...register("dueDate", { required: true })} onBlur={getDate} style={styles.form} />
                }

                <br />
                {
                    pathname === '/addtask' ?
                        <input type="submit" style={styles.submit} />
                        :
                        <button style={styles.submit} onClick={updateHandler} >Update</button>
                }

                <br />
                {(errors.pendingTask || errors.dueDate) && <span>This field is required</span>}
                <Button sx={{ marginTop: '20px' }} variant='contained' onClick={navigateRoute}>View ToDo List</Button>
            </form>

            {isAdded &&
                <Alert sx={{ mt: 2 }} severity="success" onClose={() => setIsAdded(false)}>Task Added <strong>check ToDo Table</strong>. </Alert>

            }
        </ Container>
    );
};

export default Form;