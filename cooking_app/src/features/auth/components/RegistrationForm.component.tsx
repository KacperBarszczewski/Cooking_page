import { Box, Button, CircularProgress, Grid, InputLabel,  TextField, Typography } from '@mui/material'
import {FC, FormEvent, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../../hooks/input/redux/hooks';
import useInput from '../../../hooks/input/use-input';
import { validateEmail } from '../../../shared/utils/validation/email';
import { validateNameLength, validatePasswordLength } from '../../../shared/utils/validation/length';
import { register, reset } from '../authSlice';
import { NewUser } from '../models/NewUser';

const RegistrationFormComponent: FC =()=>{

    const{
        text: name,
        shouldDisplayError: nameHasError,
        textChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        clearHandler: nameClearHandler
    } = useInput(validateNameLength)

    const{
        text: email,
        shouldDisplayError: emailHasError,
        textChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        clearHandler: emailClearHandler
    } = useInput(validateEmail)

    const{
        text: password,
        shouldDisplayError: passwordHasError,
        textChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        clearHandler: passwordClearHandler
    } = useInput(validatePasswordLength)

    const{
        text: confirmPassword,
        shouldDisplayError: confirmPasswordHasError,
        textChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        clearHandler: confirmPasswordClearHandler
    } = useInput(validatePasswordLength)

    const clearForm = () => {
        nameClearHandler();
        emailClearHandler();
        passwordClearHandler();
        confirmPasswordClearHandler();
    }    

    const dispatch = useAppDispatch();
    
    const { isLoading, isSuccess } = useAppSelector((state) => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
          dispatch(reset());
          clearForm();
          navigate('/signin');
        }
    }, [isSuccess, dispatch]);

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();    
        
        if(password !== confirmPassword) return;

        if(nameHasError || emailHasError || passwordHasError || confirmPasswordHasError) return;

        if(
            name.length === 0 ||
            email.length === 0 ||
            password.length === 0 ||
            confirmPassword.length === 0
        )return;

        const newUser: NewUser = {
            name,email,password
        }

        dispatch(register(newUser));
    }

    if (isLoading)
    return <CircularProgress sx={{ marginTop: '64px' }} color='primary' />;


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
                        Utwórz konto
                    </Typography>

                    <InputLabel sx={{fontWeight:500, marginTop:1, color:'#000000'}} htmlFor='name'>Nazwa</InputLabel>
                    <TextField 
                        value={name}
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHandler}
                        error={nameHasError}
                        helperText={nameHasError ? 'wpisz nazwę użytkownika': ''}

                        type={'text'} 
                        name='name' 
                        id='name' 
                        variant='outlined' 
                        size='small'
                    />

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
                        helperText={passwordHasError ? 'wpisz hasło z minimum 6 znakami': ''}

                        type={'password'} 
                        name='password' 
                        id='password' 
                        variant='outlined' 
                        size='small' 
                        placeholder='Minimum 6 znaków'
                    />

                    <InputLabel sx={{fontWeight:500, marginTop:1, color:'#000000'}} htmlFor='confirmPassword'>Powtórz Hasło</InputLabel>
                    <TextField

                        value={confirmPassword}
                        onChange={confirmPasswordChangeHandler}
                        onBlur={confirmPasswordBlurHandler}
                        error={confirmPassword.length > 0 && password !== confirmPassword}
                        helperText={confirmPasswordHasError ? 'Panownie wpisz hasło': ''}                        

                        type={'password'} 
                        name='confirmPassword' 
                        id='confirmPassword' 
                        variant='outlined' 
                        size='small' 
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
                        Zarejestruj się
                    </Button>
                </Grid>
            </form>


            <div style={{marginTop:'16px'}}>
                <small>
                    Masz już konto?{' '}
                    <Link to="/signin" style={{ color:'green'}}>Zaloguj się</Link>
                </small>
            </div>

        </Box>
    )
}

export default RegistrationFormComponent