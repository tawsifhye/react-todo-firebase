import React, { useState } from 'react';
import useDataProvider from '../Context/useDataProvider'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import { Link } from 'react-router-dom';

const DataTable = () => {
    const [taskList, setTaskList] = useDataProvider();
    const [taskStatus, setTaskStatus] = useState(false);

    const deleteTask = id => {
        const newTaskList = taskList.filter((task) => task.id !== id)
        setTaskList(newTaskList);
    }
    const markDone = (id, type) => {

        const completeTask = taskList.find((task) => task.id === id);
        if (type === 'done') {
            completeTask.status = true;
            setTaskStatus(true);
        }
        else {
            completeTask.status = false;
            setTaskStatus(false);
        }

    }
    return (
        <Container sx={{ marginTop: '100px' }}>

            <Link to="/addtask"
                style={{
                    color: 'white',
                    textDecoration: 'none'
                }}>
                <Button variant="contained" sx={{ mb: 5 }}>Add Task</Button>
            </Link>

            <TableContainer sx={{ boxShadow: 3 }} component={Paper} >
                <Table sx={{ minWidth: 450 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Pending Task</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Due Date</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {taskList.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }
                                }}
                            >
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


                                    <Tooltip title="Delete">
                                        <RemoveCircleOutlineIcon onClick={() => deleteTask(row.id)} color="warning" sx={{
                                            ml: '10px',
                                            '&:hover': { transform: 'scale(1.2)' }
                                        }} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell component="th" scope="row" align='center'>

                                    {
                                        row.status ?

                                            <Typography sx={{ color: 'green' }}>Complete

                                                <Tooltip title="Mark Undone">
                                                    <RemoveDoneIcon onClick={() => markDone(row.id)} color="warning" sx={{
                                                        ml: '10px',
                                                        '&:hover': { transform: 'scale(1.2)' }
                                                    }} />
                                                </Tooltip>
                                            </Typography>
                                            :
                                            <Typography sx={{ color: 'red' }}>Incomplete
                                                <Tooltip title="Mark Done">
                                                    <DoneOutlineIcon onClick={() => markDone(row.id, 'done')} color="success" sx={{
                                                        ml: '10px',
                                                        '&:hover': { transform: 'scale(1.2)' }
                                                    }} />
                                                </Tooltip>

                                            </Typography>
                                    }

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