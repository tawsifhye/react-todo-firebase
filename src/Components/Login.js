import { Check } from '@mui/icons-material';
import { Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import React from 'react';
import useDataProvider from '../Context/useDataProvider';

const Login = () => {
    const [taskList,
        setTaskList,
        user,
        setUser,
        handleGoogleSignIn,
        handleSignOut,
        handleEmailChange,
        handlePasswordChange,
        handleRegistration,
        toggleLogin,
        isLogin,
        error] = useDataProvider();
    return (
        <div>
            <Typography variant='h5' sx={{ padding: '10px 0' }}>
                {!isLogin ? 'Register' : 'Login'}
            </Typography>
            <TextField
                onChange={handleEmailChange}
                required
                id="outlined-required"
                label="Email"
                type="email"
            />
            <br /> <br />
            <TextField
                onChange={handlePasswordChange}
                required
                id="outlined-required"
                label="Password"
                type="password"
            />
            <br /> <br />
            <FormControlLabel control={<Checkbox onChange={toggleLogin} />} label="Already Registered?" />
            <br />
            <Button onClick={handleRegistration} variant="contained">{isLogin ? 'Login' : 'Register'}</Button>

        </div>
    );
};

export default Login;