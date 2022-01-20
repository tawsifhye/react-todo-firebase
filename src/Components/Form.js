import { Alert, Button, Container, Typography } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push } from 'firebase/database';
import moment from 'moment';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useDataProvider from '../Context/useDataProvider';
import firebaseConfig from '../Firebase/firebase.config';
import initializeFirebase from '../Firebase/firebase.init';


const styles = {
    form: {
        marginTop: '10px',
        padding: '15px',
        fontSize: '15px',
        display: 'block'
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
        display: 'block'
    },
    label: {
        display: 'block',
        marginTop: '20px',
    }

}

const Form = () => {
    const [taskList, setTaskList] = useDataProvider();
    const [isAdded, setIsAdded] = useState(false);
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

    //      const handleAddData = data => {

    //         const newTask = {
    //             id: (Math.random() * 100).toString(),
    //             ...data,
    //             status: false,
    //             currentDate,
    //             remainingDays: handleRemainingDays(data.dueDate)
    //         } 
    // }

    function writeUserData(data) {
        const db = getDatabase(initializeApp(firebaseConfig));
        set(ref(db, 'users/'), {
            username: 'tawsif',
        });
    }



    const handleAddData = data => {
        const db = getDatabase(initializeFirebase());
        push(ref(db, 'todolist/'), {
            taskId: (Math.random() * 100).toString(),
            ...data,
            status: false,
            currentDate,
            remainingDays: handleRemainingDays(data.dueDate)
        });

        // const newTask = {
        //     name: 'todo'
        // }
        // db.push(newTask)
        // const updatedTaskList = [...taskList, newTask];
        // setTaskList(updatedTaskList);


        resetField("pendingTask", "dueDate");
        setIsAdded(true);
    }

    const handleUpdate = (data) => {
        console.log(data);
        const updatedTask = {
            id: selectedTask?.id,
            ...data,
            remainingDays: handleRemainingDays(data.dueDate) || selectedTask.remainingDays
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
                    !taskid ? 'Add Task' : 'Edit Task'
                }
            </Typography>
            <form form onSubmit={!taskid ? handleSubmit(handleAddData) : handleSubmit(handleUpdate)}>
                <label style={styles.label}>Task Name</label>

                <input placeholder={!taskid ? 'Task' : ''} defaultValue={taskid && selectedTask?.pendingTask}
                    {...register("pendingTask", { required: true })} style={styles.form} />


                <label style={styles.label}>Add Due Date</label>

                <input type='date' defaultValue={!taskid ? currentDate : selectedTask?.dueDate} min={currentDate} {...register("dueDate", { required: true })} style={styles.form} />

                <input type="submit" style={styles.submit} />


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