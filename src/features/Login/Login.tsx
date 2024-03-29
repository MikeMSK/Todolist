import React from 'react'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";
import {useFormik} from "formik";
import {loginTC} from "./auth-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks/hooks";
import {Navigate} from "react-router-dom";


export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                console.log(values)
                return {
                    email: 'Email required',
                }
            }
            if (!values.password) {
                return {
                    password: 'Password required',
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    });

    if (!isLoggedIn) {
        return <Navigate to={'/'}/>

    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}> here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label={'Email'}
                                       margin={'normal'}
                                       {...formik.getFieldProps('email')}
                            />
                            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            <TextField type={'password'}
                                       label={'Password'}
                                       margin={'normal'}
                                       {...formik.getFieldProps('password')}
                            />
                            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                            <FormControlLabel label={'Remember me'}
                                              control={
                                                  <Checkbox checked={formik.values.rememberMe}
                                                            {...formik.getFieldProps('rememberMe')}/>}
                            />
                            <Button type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}