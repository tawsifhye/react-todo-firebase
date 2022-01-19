import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom"
import { Alert, Button, Container, Typography } from '@mui/material';
import useDataProvider from '../Context/useDataProvider';
import moment from 'moment';
import Form from './Form';

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
    const { taskid } = useParams();
    return (
        <Form ></Form>
    );
};

export default TaskManager;