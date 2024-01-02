import React from 'react';
import { makeStyles } from '@mui/styles';
import { Popover } from '@mui/material';
import { StyledContainer, StyledInfo, StyledInfoContainer } from './styles';

const useStyles = makeStyles(() => ({
    paper: {
        boxShadow: 'none !important'
    },
}));

interface Props {
    anchorEl?: Element;
    message?:string;
    onClose?:()=>void;
}

const PopupError:React.FC<Props> = ({
    anchorEl, message, onClose
}) => {
    const classes = useStyles();

    return (
        <Popover
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            classes={{ paper: classes.paper }}
        >
            <StyledContainer>
                <StyledInfoContainer>
                    <StyledInfo variant='subtitle1'>
                        {message}
                    </StyledInfo>
                </StyledInfoContainer>
            </StyledContainer>
        </Popover>
    )

}

export default PopupError;