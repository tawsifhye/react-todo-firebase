import { Alert, Button, Container, Typography } from '@mui/material';
import { getDatabase, ref, set, push, child, update } from 'firebase/database';
import moment from 'moment';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useDataProvider from '../Context/useDataProvider';
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
    const [taskList, setTaskList, user, handleGoogleSignIn, handleSignOut] = useDataProvider();
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
    const db = getDatabase(initializeFirebase());
    const handleRemainingDays = (dueDate) => {
        const given = moment(dueDate, "YYYY-MM-DD");
        var current = moment().startOf('day');
        //Difference in number of days
        let remainingDays = moment.duration(given.diff(current)).asDays();
        return remainingDays;
    }

    const handleAddData = data => {

        push(ref(db, 'todolist/' + user.uid), {
            ...data,
            status: false,
            currentDate,
            remainingDays: handleRemainingDays(data.dueDate),
            email: user.email,
            uid: user.uid
        });
        resetField("pendingTask", "dueDate");
        setIsAdded(true);
    }

    const handleUpdate = (data) => {
        const updatedTask = {
            pendingTask: data.pendingTask || selectedTask.pendingTask,
            dueDate: data.dueDate || selectedTask.dueDate,
            remainingDays: handleRemainingDays(data.dueDate) || selectedTask.remainingDays
        }

        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates[`/todolist/${user.uid}/${taskid}/pendingTask`] = updatedTask.pendingTask;
        updates[`/todolist/${user.uid}/${taskid}/dueDate`] = updatedTask.dueDate;
        updates[`/todolist/${user.uid}/${taskid}/remainingDays`] = updatedTask.remainingDays;
        return update(ref(db), updates);
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