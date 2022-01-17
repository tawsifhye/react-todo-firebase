import React from 'react';
import useDataProvider from '../Context/useDataProvider'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Link } from 'react-router-dom';

const DataTable = () => {
    const [taskList] = useDataProvider();
    console.log(taskList);
    return (
        <Container sx={{ marginTop: '100px' }}>
            <Button variant="contained" sx={{ mb: 5 }}>
                <Link to="addtask"
                    style={{
                        color: 'white',
                        textDecoration: 'none'
                    }}>
                    Add Task
                </Link>
            </Button>

            <TableContainer sx={{ boxShadow: 3 }} component={Paper} >
                <Table sx={{ minWidth: 450 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>SL</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Pending Task</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Due Date</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
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
                                <TableCell component="th" scope="row" align='center'>
                                    {row.id}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.pendingTask}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.dueDate}
                                </TableCell>
                                <TableCell align='center'>
                                    <Tooltip title="Edit" sx={{ '&:hover': { transform: 'scale(1.2)' } }}>

                                        <Link to="edittask"
                                            style={{
                                                color: 'white',
                                                textDecoration: 'none'
                                            }}>
                                            <EditIcon color="primary" ></EditIcon>
                                        </Link>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <RemoveCircleOutlineIcon color="warning" sx={{
                                            ml: '10px',
                                            '&:hover': { transform: 'scale(1.2)' }
                                        }} />
                                    </Tooltip>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default DataTable;