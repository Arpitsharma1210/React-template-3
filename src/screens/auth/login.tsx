import React, { useRef, useState } from 'react';
import { Button, Grid, Link } from '@mui/material';
import md5 from 'md5';
import { Card, Container, MaterialTextInput, PopupError } from '../../components';
import { StyledHeading, StyledLogo } from './styles';
import { required, routes } from '../../utils';
import { useFormReducer } from '../../hooks';
import messages from '../../messages';
import { login } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { colors } from '../../theme/style.palette';
import { push } from 'connected-react-router';


const validators = {
    email: [required('login.form.errors.emailRequired')],
    password: [required('login.form.errors.passwordRequired')],
};

const Login = () => {
    const {
        submitting, hasError, handleSubmit, connectField,
    } = useFormReducer(validators);
    const popoverAnchor = useRef(null);
    const [errorEl, setErrorEl] = useState(null);
    const reduxDispatch = useDispatch();

    const onSubmit = (data: any) => (
        new Promise<any>((resolve, reject) => {
            reduxDispatch(push(routes.dashboard.root))
        }).then(() => {

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
                <StyledLogo src='/assets/images/logo.png' alt='logo' />
                <StyledHeading variant='h1'>{messages?.login?.heading}</StyledHeading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid
                        container
                        direction="column"
                        spacing={2}
                    >
                        <Grid item>
                            {connectField('email', {
                                label: messages?.login?.form?.email,
                                required: true,
                                disableErrorMode: true
                            })(MaterialTextInput)}
                        </Grid>
                        <Grid
                            item
                            ref={popoverAnchor}
                        >
                            {connectField('password', {
                                label: messages?.login?.form?.password,
                                required: true,
                                disableErrorMode: true,
                                type: 'password'
                            })(MaterialTextInput)}
                        </Grid>
                        <Grid item>
                            <Grid container justifyContent={'flex-end'}>
                                <Link
                                    href={routes.forgotPassword}
                                    onClick={(e) => {
                                        e?.preventDefault();
                                        reduxDispatch(push(routes.forgotPassword))
                                    }}
                                >
                                    {messages?.login?.form?.forgotPassword}
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                type='submit'
                                disabled={submitting || hasError}
                                sx={{ width: '100%', marginTop: '12px' }}
                            >
                                {messages?.login?.form?.logIn}
                            </Button>
                        </Grid>
                    </Grid>
                    <PopupError
                        anchorEl={errorEl}
                        onClose={() => setErrorEl(null)}
                        message={messages?.login?.form?.invalidDetails}
                    />
                </form>
            </Card>
        </Container>
    )
}

export default Login;