import React, { useState } from "react";
import { StyledContainer, StyledCtaContainer, StyledInfo, StyledInfoContainer, StyledTitle } from "./styles";
import { Button } from "@mui/material";
import messages from "../../messages";


interface Props {
    title?: string;
    info?: string;
    successCta?:string;
    onCancel?:()=>void;
    onSuccess?: ()=>Promise<unknown>;
    closePopup?:()=>void;
}

const ModalAction: React.FC<Props> = ({
    title, info,successCta, 
    onCancel, onSuccess, closePopup
}) => {
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async ()=>{
        setSubmitting(true);
        try {
            await onSuccess();
            if(closePopup){
                closePopup();
            }
        } catch (error) {
            console.log(error);
        }finally{
            setSubmitting(false);
        }
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
                    {successCta || messages?.general?.save}
                </Button>
            </StyledCtaContainer>
        </StyledContainer>
    )
}

export default ModalAction;