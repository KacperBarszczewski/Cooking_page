import { Box, Button, CircularProgress, Grid, InputLabel,  TextField, Typography } from '@mui/material'
import {FC, FormEvent, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../../hooks/input/redux/hooks';
import useInput from '../../../hooks/input/use-input';
import { validateEmail } from '../../../shared/utils/validation/email';
import { validatePasswordLength } from '../../../shared/utils/validation/length';
import { login, reset } from '../authSlice';
import { LoginUser } from '../models/LoginUser.interface';

const SigninFormComponent: FC =()=>{

    const {
        text: email,
        shouldDisplayError: emailHasError,
        textChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        clearHandler: emailClearHandler,
    } = useInput(validateEmail);
    
    const {
        text: password,
        shouldDisplayError: passwordHasError,
        textChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        clearHandler: passwordClearHandler,
    } = useInput(validatePasswordLength);
    
    const clearForm = () => {
        emailClearHandler();
        passwordClearHandler();
    };
    
    const dispatch = useAppDispatch();
    
    const { isLoading, isSuccess, isAuthenticated } = useAppSelector((state) => state.auth);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isSuccess) {
          dispatch(reset());
          clearForm();
        }
    }, [isSuccess, dispatch]);
    
    useEffect(() => {
        if (!isAuthenticated) return;
        navigate('/');
    }, [isAuthenticated]);
    
    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (emailHasError || passwordHasError) return;
    
        if (email.length === 0 || password.length === 0) return;
    
        const loginUser: LoginUser = { email, password };
    
        dispatch(login(loginUser));
    };
    
    if (isLoading)return <CircularProgress sx={{ marginTop: '64px' }} color='primary' />;


    return (
        <Box
            sx={{
                border:1,
                padding:2,
                borderColor:'#cccccc',
                width:'350px',
                marginTop:2
            }}
        >
            <form onSubmit={onSubmitHandler}>
                <Grid container direction='column' justifyContent='flex-start'>
                    <Typography variant='h4' component='h1'>
                        Zaloguj się
                    </Typography>


                    <InputLabel sx={{fontWeight:500, marginTop:1, color:'#000000'}} htmlFor='email'>E-mail</InputLabel>
                    <TextField 
                        value={email}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        error={emailHasError}
                        helperText={emailHasError ? 'wpisz swojego e-maila': ''}

                        type={'email'} 
                        name='email' 
                        id='email' 
                        variant='outlined' 
                        size='small'
                    />

                    <InputLabel sx={{fontWeight:500, marginTop:1, color:'#000000'}} htmlFor='password'>Hasło</InputLabel>
                    <TextField

                        value={password}
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        error={passwordHasError}
                        helperText={passwordHasError ? 'wpisz swoje hasło z minimum 6 znakami': ''}

                        type={'password'} 
                        name='password' 
                        id='password' 
                        variant='outlined' 
                        size='small' 
                        placeholder='Minimum 6 znaków'
                    />

                    <Button 
                        variant='contained' 
                        style={{
                            marginTop:'16px',
                            height:'31px',
                            backgroundColor:'#1315', 
                            color:'black',
                            borderColor:'#000000',
                            textTransform:'none'
                        }} 
                        type='submit'
                    >
                        Zaloguj się
                    </Button>
                </Grid>
            </form>


            <div style={{marginTop:'16px'}}>
                <small>
                    Nie masz konto?{' '}
                    <Link to="/register" style={{ color:'green'}}>Zarejestruj się</Link>
                </small>
            </div>

        </Box>
    )
}

export default SigninFormComponent