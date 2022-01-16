import React from 'react';
import useDataProvider from '../Context/useDataProvider'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const DataTable = () => {
    const [taskList, setTaskList] = useDataProvider();
    // const updatedTask = [...taskList, { id: '2', title: 'seleep' }];
    // setTaskList(updatedTask);
    console.log(taskList);
    return (
        <Container sx={{ marginTop: '100px' }}>
            <TableContainer component={Paper}>
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
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align='center'>
                                    {row.id}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.pendingTask}
                                </TableCell>
                                <TableCell align='center'>
                                    Due Date
                                </TableCell>
                                <TableCell align='center'>
                                    <Tooltip title="Edit">
                                        <EditIcon color="primary" />
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <RemoveCircleOutlineIcon color="warning" title="Delete" />
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