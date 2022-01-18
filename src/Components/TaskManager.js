import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom"
import { Alert, Button, Container, Typography } from '@mui/material';
import useDataProvider from '../Context/useDataProvider';
import moment from 'moment';
import { FlashlightOffRounded } from '@mui/icons-material';


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

const TaskManager = () => {
    const [taskList, setTaskList] = useDataProvider();
    const [updatedTaskName, setUpdatedTaskName] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');
    const [isAdded, setIsAdded] = useState(false);
    const { pathname } = useLocation();
    const { taskid } = useParams();
    const selectedTask = taskList.find((task) => task.id === taskid);
    const today = new Date();
    // const currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const currentDate = today.getFullYear() + '-' + ('0' + today.getMonth() + 1).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

    // var a = moment([2007, 0, 29]);
    // var b = moment([2007, 0, 28]);
    // a.diff(b, 'days')

    // var dateofvisit = moment('{visit}', 'DD-MM-YYYY');
    // var today = moment();
    // today.diff(dateofvisit, 'days');


    // const given = moment({ dueDate }, "YYYY-MM-DD");
    // var current = moment().startOf('day');
    // //Difference in number of days
    // console.log(moment.duration(given.diff(current)).asDays())

    // var interestStartDate = moment()
    //     var interestEndDate = moment(dueDate)
    //     console.log('interestStartDate: ', interestStartDate)
    //     console.log('interestEndDate: ', interestEndDate)
    //     console.log(moment(interestEndDate).diff(moment(interestStartDate), 'days', true))

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
            {
                pathname === '/addtask' ?

                    <>
                        <Typography variant='h3'>
                            Add Task
                        </Typography>
                        <form form onSubmit={handleSubmit(onSubmit)}>
                            <label style={styles.label}>Task Name</label>
                            <input placeholder='Task' {...register("pendingTask", { required: true })} style={styles.form} />
                            <br />
                            <label style={styles.label}>Add Due Date</label>
                            <input type='date' defaultValue={currentDate} min={currentDate} {...register("dueDate", { required: true })} style={styles.form} />
                            <br />

                            <input type="submit" style={styles.submit} />
                            <br />
                            {(errors.pendingTask || errors.dueDate) && <span>This field is required</span>}
                        </form>
                        <Button sx={{ marginTop: '20px' }} variant='contained' onClick={navigateRoute}>View ToDo List</Button>
                    </>
                    :
                    <>
                        <Typography variant='h3'>
                            Edit Task
                        </Typography>
                        <form form onSubmit={handleSubmit(onSubmit)}>
                            <input defaultValue={selectedTask?.pendingTask} {...register("pendingTask", { required: true })} onBlur={getUpdatedTask} style={styles.form} />
                            <br />
                            <input defaultValue={selectedTask?.dueDate} type='date' {...register("dueDate", { required: true })} onBlur={getDate} style={styles.form} />
                            <br />
                            <button style={styles.submit} onClick={updateHandler} >Update</button>
                            <br />
                            {(errors.pendingTask || errors.dueDate) && <span>This field is required</span>}
                            <Button sx={{ marginTop: '20px' }} variant='contained' onClick={navigateRoute}>View ToDo List</Button>
                        </form>
                    </>
            }
            {isAdded &&
                <Alert sx={{ mt: 2 }} severity="success" onClose={() => setIsAdded(false)}>Task Added <strong>check ToDo Table</strong>. </Alert>

            }
        </ Container>
    );
};

export default TaskManager;