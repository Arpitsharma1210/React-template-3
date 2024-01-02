import React, { useRef, useState } from 'react';
import { Button, Grid, Link, TextField } from '@mui/material';
import { Card, Container, MaterialTextInput, PopupError } from '../../components';
import { Logo, StyledError, StyledHeading, StyledInvaildPassword, StyledLogo } from './styles';
import { HttpMethods, confirmPassword, passwordValidator, required, routes } from '../../utils';
import { useFormReducer } from '../../hooks';
import { useDispatch } from 'react-redux';
import md5 from 'md5';
import { apiCall, fetchBaseData } from '../../redux/actions';
import { SET_PASSWORD } from '../../api';
import { colors } from '../../theme/style.palette';
import messages from '../../messages';


const validators = {
    temporaryPassword: [required(messages?.setPassword?.form?.invalidDetails)],
    password: [required(messages?.setPassword?.form?.passwordInvalid), passwordValidator],
    confirmPassword: [required(messages?.setPassword?.form?.checkPassword), confirmPassword(messages?.setPassword?.form?.checkPassword)],
};

const SetPassword = () => {
    const {
        submitting, hasError, handleSubmit, connectField,
    } = useFormReducer(validators);
    const popoverAnchor = useRef(null);
    const [errorEl, setErrorEl] = useState(null);
    const reduxDispatch = useDispatch();

    const onSubmit = (data: any) => (
        new Promise<any>((resolve, reject) => {
            const sanitizedBody = {
                temporaryPassword: md5(data.temporaryPassword),
                newPassword: md5(data.password),
            }

            reduxDispatch(
                apiCall(
                    SET_PASSWORD, resolve, reject,
                    HttpMethods.POST, sanitizedBody
                )
            )
        }).then(() => {
            reduxDispatch(fetchBaseData())
        }).catch((error) => {
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
                <StyledLogo src='/assets/images/logo.svg' />
                <StyledHeading variant='h1'>{messages?.setPassword?.heading}</StyledHeading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid
                        container
                        direction="column"
                        spacing={2}
                    >
                        <Grid item>
                            {connectField('temporaryPassword', {
                                label: messages?.setPassword?.form?.temporaryPassword,
                                required: true,
                                disableErrorMode: true,
                                type: 'password'
                            })(MaterialTextInput)}
                        </Grid>
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
                                {messages?.setPassword?.form?.passwordInvalid}
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
                    </Grid>

                    <PopupError
                        anchorEl={errorEl}
                        onClose={() => setErrorEl(null)}
                        message={messages?.setPassword?.form?.invalidDetails}
                    />
                </form>
            </Card>
        </Container>
    )
}

export default SetPassword;