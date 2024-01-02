import { styled } from 'styled-components';
import {  Typography } from '@mui/material';

export const StyledContainer = styled.div`
    &::before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #F7EAAB; /* Adjust the background color as needed */
        top: 0px;
        left: 50%;
        transform: translateX(-50%);
    }
`

export const StyledInfoContainer = styled.div`
    background-color: #F7EAAB;
    padding: 32px 16px;
    background-color: #F7EAAB;
    padding: 16px 16px;
    border-radius: 5px;
    margin-top:10px;
`
export const StyledInfo = styled(Typography)`
    padding: 4px 8px;
`