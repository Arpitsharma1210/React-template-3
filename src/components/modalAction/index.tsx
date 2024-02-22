import React, { useState } from "react";
import { StyledContainer, StyledCtaContainer, StyledInfo, StyledInfoContainer, StyledTitle } from "./styles";
import { Button } from "@mui/material";
import messages from "../../messages";
import { useDispatch } from "react-redux";
import { apiCall } from "../../redux/actions";
import { HttpMethods } from "../../utils";


interface Props {
    title?: string;
    info?: string;
    successCta?:string;
    onCancel?:()=>void;
    onSuccess?: ()=>Promise<unknown>;
    closePopup?:()=>void;
    apiName?:string;
}

const ModalAction: React.FC<Props> = ({
    title, info,successCta, 
    onCancel, onSuccess, closePopup,apiName
}) => {
    const [submitting, setSubmitting] = useState(false);
    const reduxDispatch = useDispatch();

    const onSubmit = async ()=>{
        setSubmitting(true);
        return new Promise<any>((resolve, reject) => {
            reduxDispatch(
                apiCall(apiName,resolve,reject, HttpMethods.DELETE, {})
            );
            })
            .then(() => {
                onCancel();
                setSubmitting(false);
            })
            .catch((error) => {
            //   setSubmitError(error?.message);
                setSubmitting(false);
            });
            
    }

    return (
        <StyledContainer>
            <StyledInfoContainer>
                {title && <StyledTitle variant="h3">{title}</StyledTitle>}
                {info && <StyledInfo variant="body1">{info}</StyledInfo>}
            </StyledInfoContainer>
            <StyledCtaContainer>
                <Button
                    variant="outlined"
                    color='secondary'
                    
                    onClick={onCancel}
                >
                    {messages?.general?.cancel}
                </Button>
                <Button
                    variant="contained"
                    onClick={onSubmit}
                    disabled={submitting}
                >
                    {messages?.general?.save}
                </Button>
            </StyledCtaContainer>
        </StyledContainer>
    )
}

export default ModalAction;