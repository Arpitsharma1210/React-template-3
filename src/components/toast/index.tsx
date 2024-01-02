import React from "react";
import { StyledToastContainer, StyledToastIcon, 
    StyledToastIconContainer, StyledToastInfoContainer,
     StyledToastInfoSubText, StyledToastInfoText } from "./styles";

interface Props {
    text?:string;
    subText?:string;
}

const Toast:React.FC<Props> = ({
    text, subText
}) => (
    <StyledToastContainer>
        <StyledToastIconContainer>
            <StyledToastIcon
                src='/assets/images/success.png'
            />
        </StyledToastIconContainer>
        <StyledToastInfoContainer>
            {text && <StyledToastInfoText>
                {text}
            </StyledToastInfoText>}
            {subText && <StyledToastInfoSubText>
               {subText}
            </StyledToastInfoSubText>}
        </StyledToastInfoContainer>
    </StyledToastContainer>
)

export default Toast;