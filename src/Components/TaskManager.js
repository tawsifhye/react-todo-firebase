import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom"

const TaskManager = () => {
    const { pathname } = useLocation();
    console.log(pathname);
    let navigate = useNavigate();
    const navigateRoute = () => {
        navigate('/');
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    // console.log(watch("example"));

    return (
        <div>
            This is task Manager.
            <button onClick={navigateRoute}>Navigate</button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input defaultValue="test" {...register("pendingTask", { required: true })} />

                <input {...register("dueDate", { required: true })} />
                {(errors.pendingTask || errors.dueDate) && <span>This field is required</span>}
                <input type="submit" />
            </form>
        </div>
    );
};

export default TaskManager;