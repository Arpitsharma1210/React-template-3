import React, { useRef, useState } from 'react';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Card, Container, MaterialTextInput, PopupError } from '../../components';
import { StyledError, StyledHeading, StyledLogo } from './styles';
import { HttpMethods, emailValidator, required, routes } from '../../utils';
import { useFormReducer } from '../../hooks';
import { useDispatch } from 'react-redux';
import { apiCall } from '../../redux/actions';
import { RESET_PASSWORD_REQUEST_LINK } from '../../api';
import { brand, colors } from '../../theme/style.palette';
import messages from '../../messages';
import { styled } from 'styled-components';
import { push } from 'connected-react-router';
import { fontSize, fontWeight } from '../../theme/style.typography';

const validators = {
    email: [required('login.form.errors.emailRequired'), emailValidator]
};


const ForgotPassword = () => {
    const {
        submitting, hasError, handleSubmit, connectField,
    } = useFormReducer(validators);
    const [resetLinkSent, setResetLinkSent] = useState(false);
    const popoverAnchor = useRef(null);
    const [errorEl, setErrorEl] = useState(null);
    const reduxDispatch = useDispatch();

    const onSubmit = (data: any) => (
        new Promise<any>((resolve, reject) => {
            const sanitizedBody = {
                email: data.email
            }

            reduxDispatch(
                apiCall(
                    RESET_PASSWORD_REQUEST_LINK, resolve, reject,
                    HttpMethods.POST, sanitizedBody
                )
            )
        }).then(() => {
            setResetLinkSent(true);
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
                <StyledLogo src='/assets/images/logo.svg' />
                <StyledHeading variant='h1'>
                    {resetLinkSent ? messages?.resetPassword?.successHeading : messages?.resetPassword?.heading}
                </StyledHeading>
                {!resetLinkSent ? (<form onSubmit={handleSubmit(onSubmit)}>
                    <Grid
                        container
                        direction="column"
                        spacing={2}
                    >
                        <Grid item ref={popoverAnchor}>
                            {connectField('email', {
                                label: messages?.resetPassword?.form?.email,
                                required: true,
                                disableErrorMode: true
                            })(MaterialTextInput)}
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                type='submit'
                                disabled={submitting || hasError}
                                sx={{ width: '100%' }}
                            >
                                {messages?.resetPassword?.form?.submitCta}
                            </Button>
                        </Grid>
                        <Grid item justifyContent={'center'} display={'flex'} flexDirection={'column'}>
                            <StyledInfo variant='body2'>
                                {messages?.resetPassword?.troubleShootingInfo?.text1}
                            </StyledInfo>
                            <StyledInfo variant='body2'>
                                {messages?.resetPassword?.troubleShootingInfo?.text2}
                                <StyledInfoCta>
                                    {messages?.resetPassword?.troubleShootingInfo?.text3}
                                </StyledInfoCta>
                            </StyledInfo>
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
                    <PopupError
                        anchorEl={errorEl}
                        onClose={() => setErrorEl(null)}
                        message={messages?.resetPassword?.form?.invalidDetails}
                    />
                </form>) : (
                    <Grid
                        container
                        direction="column"
                        spacing={2}
                    >
                        <Grid item justifyContent={'center'} display={'flex'}>
                            <StyledSuccessInfo variant='body2'>
                                {messages?.resetPassword?.successInfo}
                            </StyledSuccessInfo>
                        </Grid>
                        <Grid item justifyContent={'center'} display={'flex'}>
                            <Button
                                variant="contained"
                                onClick={() => reduxDispatch(push(routes.login))}
                                sx={{ marginTop: '24px' }}
                            >
                                {messages?.resetPassword?.backToLogin}
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Card>
        </Container>
    )
}

export default ForgotPassword;

export const StyledInfo = styled(Typography)`
    color : ${brand.textColourLight};
    text-align : center;
`

export const StyledInfoCta = styled.span`
    color : ${brand.textColour};
    font-size : ${fontSize.b2};
    font-weight : ${fontWeight.medium};
    text-align : center;
    cursor:pointer;
`
export const StyledSuccessInfo = styled(Typography)`
    color : ${brand.textColourLight};
    text-align : center;
`