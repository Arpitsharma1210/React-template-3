import React, { useRef, useState } from 'react';
import { Button, Grid, } from '@mui/material';
import { useParams } from 'react-router-dom';
import { push } from 'connected-react-router';
import md5 from 'md5';
import { Card, Container, MaterialTextInput, PopupError } from '../../components';
import { Logo, StyledHeading, StyledInvaildPassword, StyledLogo } from './styles';
import { HttpMethods, confirmPassword, passwordValidator, required, routes } from '../../utils';
import { useFormReducer } from '../../hooks';
import { useDispatch } from 'react-redux';
import { RESET_PASSWORD } from '../../api';
import { apiCall } from '../../redux/actions';
import { colors } from '../../theme/style.palette';
import messages from '../../messages';


const validators = {
    password: [required(messages?.resetPassword?.form?.passwordInvalid), passwordValidator],
    confirmPassword: [required(messages?.resetPassword?.form?.checkPassword), confirmPassword(messages?.resetPassword?.form?.checkPassword)],
};

const ResetPassword = () => {
    const {
        submitting, hasError, handleSubmit, connectField,
    } = useFormReducer(validators);
    const { token } = useParams<{ token?: string }>();
    const popoverAnchor = useRef(null);
    const [errorEl, setErrorEl] = useState(null);
    const reduxDispatch = useDispatch();

    const onSubmit = (data: any) => (
        new Promise<any>((resolve, reject) => {
            const sanitizedBody = {
                token,
                newPassword: md5(data.password),
            }

            reduxDispatch(
                apiCall(
                    RESET_PASSWORD, resolve, reject,
                    HttpMethods.POST, sanitizedBody
                )
            )
        }).then(() => {
            reduxDispatch(push(routes.login))
        }).catch(() => {
            setErrorEl(popoverAnchor?.current);
        }));
    return (
        <Container hideHeader centerAlign containerCss={{ background: '#F9F9F9', height: '100vh' }}>
            <Card
                bordered
                cardCss={{
                    borderColor: colors.red,
                    borderRadius: '34px',
                    padding: '74px 58px',
                    margin: 0
                }}
                contentCss={{
                    alignItems: 'center',
                    padding: 0
                }}
            >
                <StyledLogo src='/assets/images/logo.png' />
                <StyledHeading variant='h1'>
                    {messages?.resetPassword?.heading}
                </StyledHeading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid
                        container
                        direction="column"
                        spacing={2}
                    >
                        <Grid item>
                            {connectField('password', {
                                label: messages?.setPassword?.form?.password,
                                required: true,
                                disableErrorMode: true,
                                type: 'password'
                            })(MaterialTextInput)}
                        </Grid>
                        <Grid item ref={popoverAnchor}>
                            {connectField('confirmPassword', {
                                label: messages?.setPassword?.form?.confirmPassword,
                                required: true,
                                disableErrorMode: true,
                                type: 'password'
                            })(MaterialTextInput)}
                        </Grid>
                        <Grid item>
                            <StyledInvaildPassword>
                                {messages?.resetPassword?.form?.passwordInvalid}
                            </StyledInvaildPassword>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                type='submit'
                                disabled={submitting || hasError}
                                sx={{ width: '100%' }}
                            >
                                {messages?.setPassword?.form?.savePassword}
                            </Button>
                        </Grid>
                        <Grid item justifyContent={'center'} display={'flex'}>
                            <Button
                                variant="text"
                                onClick={() => reduxDispatch(push(routes.login))}
                            >
                                {messages?.resetPassword?.backToLogin}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <PopupError
                    anchorEl={errorEl}
                    onClose={() => setErrorEl(null)}
                    message={messages?.resetPassword?.form?.invalidLink}
                />
            </Card>
        </Container>
    )
}

export default ResetPassword;