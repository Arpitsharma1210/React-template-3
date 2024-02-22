import React, { useEffect, useRef, useState } from 'react';
import { Card, Container, ListHeader, PopupError, TextInput } from "../../components";
import { styled } from 'styled-components';
import { brand, colors } from '../../theme/style.palette';
import { Button, Grid, Modal, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


import { fontSize, fontWeight } from '../../theme/style.typography';
import messages from '../../messages';
import { AdminUser, AdminUserList, Id, MetaData, PaginatedEntity, getDefaultMetaData } from '../../models';
import { ADMIN_USERS, apiCall } from '../../redux/actions';
import { ADMIN_FILTER, ADMINS } from '../../api';
import { usePagination, useFormReducer, useEntity } from '../../hooks';
import Table from '../../components/table';
import { HttpMethods, emailValidator, required } from '../../utils';
import { useDispatch } from 'react-redux';



interface Props {
    isUpdate?: boolean;
    adminUserId: Id;
    onCancel: () => void;
    onSuccess: ()=>void;
}

const validators = {
    firstName: [required(messages?.adminUser?.form?.errors?.firstName)],
    lastName: [required(messages?.adminUser?.form?.errors?.lastName)],
    workEmail: [required(messages?.adminUser?.form?.errors?.workEmail), emailValidator],
};

const AdminUserForm: React.FC<Props> = ({
    onCancel, onSuccess, isUpdate, adminUserId
}) => {
    const reduxDispatch = useDispatch();
    const {
        submitting, hasError, handleSubmit, connectField,
        setSubmitError, submitError, change
    } = useFormReducer(validators);
    const [resetData, setResetData] = useState(false);
    const popoverAnchor = useRef(null);
    const [errorEl, setErrorEl] = useState(null);
    const [readOnly,setReadOnly] = useState(isUpdate);
    const { entity : adminUser } = useEntity<AdminUser>(ADMINS, adminUserId);

    useEffect(() => {
        if (isUpdate && adminUser) {
          Object.keys(adminUser)
            .forEach((key) => {
              if ((adminUser as any)[key]) {
                change(key, `${(adminUser as any)[key]}`);
              }
            });
          change('workEmail', adminUser.email);
        }
      }, [adminUser, resetData]);

    const diableReadOnly = ()=>{
        setReadOnly(false);
    }

    const enableReadOnly = ()=>{
        setReadOnly(true);
    }


    const onSubmit = (data: any) => (
        new Promise<any>((resolve, reject) => {
            const sanitizedBody = {
                firstName : data.firstName,
                lastName : data.lastName,
                email : data.workEmail,
            }

            reduxDispatch(
                apiCall(
                    isUpdate ? `${ADMINS}/${adminUser?.id}` : ADMINS,resolve, reject,
                    isUpdate ? HttpMethods.PATCH : HttpMethods.POST, sanitizedBody
                )
            )
        }).then(() => {
            isUpdate ? enableReadOnly() : onSuccess();
        }).catch((error) => {
            setSubmitError(messages?.adminUser?.form?.errors?.serverErrors?.[error?.message]);
            setErrorEl(popoverAnchor?.current);
        }));

    return (
        <StyledFormContainer>
            <Card bordered>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid
                        container
                        direction="column"
                        spacing={2}
                    >
                        <Grid item>
                            <Grid container justifyContent={'flex-end'} alignItems={'center'} spacing={2}>
                                {isUpdate && <>
                                        {
                                            readOnly ? (
                                                <Grid item>
                                                    <Button
                                                        variant="outlined"
                                                        onClick={diableReadOnly}
                                                    >
                                                        {messages?.general?.edit}
                                                    </Button>
                                                </Grid>
                                            ) : (
                                                <>
                                                    <Grid item>
                                                        <Button
                                                            variant="text"
                                                            color='secondary'
                                                            
                                                            onClick={()=>{
                                                                setResetData(prevData=>!prevData);
                                                                enableReadOnly();
                                                            }}
                                                        >
                                                            {messages?.general?.cancel}
                                                        </Button>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button
                                                            variant="contained"
                                                            onClick={handleSubmit(onSubmit)}
                                                            disabled={submitting || hasError}
                                                        >
                                                            {messages?.general?.save}
                                                        </Button>
                                                    </Grid>
                                                </>
                                            )
                                        }
                                    </>
                                }
                                <Grid item>
                                    <StyledCloseContainer onClick={()=>{
                                        isUpdate ? onSuccess() : onCancel();
                                    }}
                                    >
                                        <CloseRoundedIcon
                                            fontSize='medium'
                                            style={{
                                                color: brand.textColourDark
                                            }}
                                        />
                                    </StyledCloseContainer>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                marginBottom: '24px'
                            }}
                        >
                            <Typography variant='h1'>{isUpdate ? messages?.adminUser?.form?.adminDetails : messages?.adminUser?.form?.addHeading}</Typography>
                        </Grid>
                        <Grid item>
                            {connectField('firstName', {
                                label: messages?.adminUser?.form?.firstName,
                                required: true,
                                disableErrorMode: true,
                                readOnly,
                                onReadOnlyCtaClick : diableReadOnly
                            })(TextInput)}
                        </Grid>
                        <Grid item>
                            {connectField('lastName', {
                                label: messages?.adminUser?.form?.lastName,
                                required: true,
                                disableErrorMode: true,
                                readOnly,
                                onReadOnlyCtaClick : diableReadOnly
                            })(TextInput)}
                        </Grid>
                        <Grid 
                            item
                            ref={popoverAnchor}
                        >
                            {connectField('workEmail', {
                                label: messages?.adminUser?.form?.workEmail,
                                required: true,
                                disableErrorMode: true,
                                readOnly : isUpdate,
                                disabled: isUpdate
                            })(TextInput)}
                        </Grid>
                        {!isUpdate && <Grid item display={'flex'} sx={{margin : '16px 0'}}>
                            <Button
                                variant="contained"
                                type='submit'
                                disabled={submitting || hasError}
                            >
                                {/* {messages?.adminUser?.form?.submitCta} */}
                                {messages?.general?.save}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={onCancel}
                                sx={{marginLeft:"16px"}}
                            >
                                {messages?.general?.cancel}
                            </Button>
                        </Grid>}
                        <PopupError
                            anchorEl={errorEl}
                            onClose={() => setErrorEl(null)}
                            message={submitError}
                        />
                    </Grid>
                    
                </form>
            </Card>
        </StyledFormContainer>
    )
}

export default AdminUserForm;



const StyledFormContainer = styled.div`
    width: 30%;
    min-width: 448px;
    margin: 0 auto;
`


const StyledCloseContainer = styled.div`
    cursor:pointer;
`

