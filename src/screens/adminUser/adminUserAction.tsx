import React, { useState } from "react";
import { styled } from "styled-components";
import { Id } from "../../models";
import { useDispatch } from "react-redux";
import { Button, Grid, Typography } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { brand } from "../../theme/style.palette";
import messages from "../../messages";
import { fontWeight } from "../../theme/style.typography";
import { Card } from "../../components";
import { apiCall } from "../../redux/actions";
import { ADMINS, ADMIN_RESEND_INVITE } from "../../api";
import { HttpMethods } from "../../utils";

export enum UserActionType {
    REVOKE_INVITATION = "REVOKE_INVITATION",
    RESEND_INVITATION = "RESEND_INVITATION",
    DEACTIVATE_USER = "DEACTIVATE_USER",
    ACTIVATE_USER = "ACTIVATE_USER",

}

export interface UserActionConfig {
    visibility: boolean;
    type?: UserActionType;
    adminUserId: Id;
}

interface Props {
    userActionConfig: UserActionConfig;
    onCancel: () => void;
    onSuccess: () => void;
}

const AdminUserAction: React.FC<Props> = ({
    onCancel, onSuccess, userActionConfig
}) => {

    const reduxDispatch = useDispatch();
    const [submitting, setSubmitting] = useState(false);
    const { adminUserId } = userActionConfig;

    let displayMessages = {title : "", info : "", cta : ""};
    let url:string;
    let method:HttpMethods;
    let body:Record<string, any>;

    switch(userActionConfig?.type){
        case UserActionType.REVOKE_INVITATION:
            displayMessages = messages?.adminUser?.listing?.revokeInvitation;
            url = `${ADMINS}/${adminUserId}`;
            method = HttpMethods.DELETE;
            break;
        case UserActionType.RESEND_INVITATION:
            displayMessages = messages?.adminUser?.listing?.resendInvitation;
            url = ADMIN_RESEND_INVITE;
            method = HttpMethods.POST;
            body = {userId : adminUserId}
            break;
        case UserActionType.DEACTIVATE_USER:
            displayMessages = messages?.adminUser?.listing?.deactivateUser;
            url = `${ADMINS}/${adminUserId}`;
            method = HttpMethods.PATCH;
            body = {status : "INACTIVE"}
            break;
        case UserActionType.ACTIVATE_USER:
            displayMessages = messages?.adminUser?.listing?.activateUser;
            url = `${ADMINS}/${adminUserId}`;
            method = HttpMethods.PATCH;
            body = {status : "ACTIVE"}
            break;
    }

    const handleCtaClick =  ()=>{
        setSubmitting(true);
        try {
            reduxDispatch(apiCall(url,()=>{
                onSuccess();
            },(err)=>{

            },method, body))
            
        } catch (error) {
            setSubmitting(false);
        }
    }

    return (
        <StyledContainer>
            <Card
                cardCss={{
                    position: 'relative'
                }}
            >
                <StyledCloseContainer onClick={onCancel}>
                    <CloseRoundedIcon
                        fontSize='medium'
                        style={{
                            color: brand.textColourDark
                        }}
                    />
                </StyledCloseContainer>
                <Grid
                    container
                    direction="column"
                >
                   
                    <Grid
                        item
                        sx={{
                            margin: '8px 0px 24px 0px'
                        }}
                    >
                        <Typography variant='h2' sx={{ fontWeight: fontWeight.semiBold }}>
                            {displayMessages?.title}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            marginBottom: '16px'
                        }}
                    >
                        <Typography variant='body2'>
                            {displayMessages?.info}
                        </Typography>
                    </Grid>
                    <Grid item display={'flex'} justifyContent={'space-evenly'} sx={{ margin: '16px 0' }}>
                        <Grid item >
                            <Button
                                variant="text"
                                color="secondary"
                                onClick={onCancel}
                            >
                                {messages?.general?.cancel}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                sx={{ marginLeft: "16px" }}
                                color={displayMessages?.cta === "Deactivate" ? "info" : "primary"}
                                disabled={submitting}
                                onClick={handleCtaClick}
                            >
                                {displayMessages?.cta}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </StyledContainer>
    )
}

export default AdminUserAction;


const StyledContainer = styled.div`
    width: 384px;
    margin: 0 auto;
`


const StyledCloseContainer = styled.div`
    cursor:pointer;
    position: absolute;
    top: 24px;
    right: 24px;
`

