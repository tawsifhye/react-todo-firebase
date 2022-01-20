import React, { useEffect } from 'react';
import useDataProvider from '../Context/useDataProvider'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Checkbox, Container, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import { Link } from 'react-router-dom';
import { child, get, getDatabase, ref } from '@firebase/database';
import initializeFirebase from '../Firebase/firebase.init';


const DataTable = () => {

    const [taskList, setTaskList, authReturn] = useDataProvider();
    const { user, setUser, handleGoogleSignIn, handleSignOut } = authReturn;

    useEffect(() => {
        if (user) {
            const dbRef = ref(getDatabase(initializeFirebase()));
            get(child(dbRef, `todolist/${user.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const todos = snapshot.val();
                    const todoList = [];
                    for (let id in todos) {
                        todoList.push(todos[id])
                    }
                    setTaskList(todoList);
                } else {
                    // alert("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
        else {
            setUser({});
        }

    }, [user])


    const arr = [];

    const checkBoxHandler = (e) => {
        if (e.target.checked) {
            const find = taskList.find(task => task.id === e.target.value)
            arr.push(find);

        }
        if (!e.target.checked) {
            const unChecked = arr.find(a => a.id === e.target.value)
            arr.splice(arr.indexOf(unChecked), 1)
        }
    }
    const deleteMultipleTask = () => {
        const filteredArray = taskList.filter((task) => {
            return arr.indexOf(task) < 0;

        });

        setTaskList(filteredArray);
    }

    const markDone = (id) => {

        const statusUpdatedTasklList = taskList.map((task) => {
            if (task.id === id) {
                task.status = !task.status
            }
            return task;

        })
        setTaskList(statusUpdatedTasklList);

    }
    return (
        <Container sx={{ marginTop: '100px' }}>
            {
                user &&
                <Typography variant='h6'>Logged in as:{user.email}</Typography>
            }

            <Link to="/addtask"
                style={{
                    color: 'white',
                    textDecoration: 'none',
                    display: 'block',
                }}>
                <Button variant="contained" sx={{ mb: 2, mt: 2 }}>Add Task</Button>
            </Link>

            {/* <Button variant="contained" color="warning" sx={{ mb: 2, display: 'block' }} onClick={deleteMultipleTask}>Delete</Button> */}
            <Button variant="contained" color="success" sx={{ mb: 2 }} onClick={!user.email ? handleGoogleSignIn : handleSignOut}>{!user.email ? 'Sign In with Google' : 'Sign Out'}</Button>


            <TableContainer sx={{ boxShadow: 3 }} component={Paper} >
                <Table sx={{ minWidth: 450 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}></TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Pending Task</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Due Date</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Edit Task</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Remaining Days</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {taskList.map((row, index) => (
                            <TableRow
                                key={row.taskId}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }
                                }}
                            >
                                <TableCell align='center'>
                                    <Checkbox onChange={checkBoxHandler} value={row.id} />
                                </TableCell>
                                <TableCell align='center'>
                                    {row.pendingTask}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.dueDate}
                                </TableCell>
                                <TableCell align='center'>
                                    {!row.status &&
                                        <Tooltip title="Edit">

                                            <Link to={`/edittask/${row.id}`}
                                                style={{
                                                    color: 'white',
                                                    textDecoration: 'none',

                                                }}>
                                                <EditIcon color="primary" sx={{ '&:hover': { transform: 'scale(1.2)' } }} ></EditIcon>
                                            </Link>
                                        </Tooltip>
                                    }

                                </TableCell>
                                <TableCell component="th" scope="row" align='center'>

                                    {
                                        row.status ?

                                            <Typography sx={{ color: 'green' }}>Complete

                                                <Tooltip title="Mark Undone">
                                                    {/* <RemoveDoneIcon onClick={() => markDone(row.id)} color="warning" sx={{
                                                        ml: '10px',
                                                        '&:hover': { transform: 'scale(1.2)' }
                                                    }} /> */}
                                                </Tooltip>
                                            </Typography>
                                            :
                                            <Typography sx={{ color: 'red' }}>Incomplete
                                                <Tooltip title="Mark Done">
                                                    <DoneOutlineIcon onClick={() => markDone(row.id)} color="success" sx={{
                                                        ml: '10px',
                                                        '&:hover': { transform: 'scale(1.2)' }
                                                    }} />
                                                </Tooltip>

                                            </Typography>
                                    }

                                </TableCell>
                                <TableCell component="th" scope="row" align='center'>
                                    {row.remainingDays}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container >
    );
};

export default DataTable;