import { css, styled } from 'styled-components';
import { Typography } from '@mui/material';
import { brand, colors } from '../../theme/style.palette';
import { respondTo } from '../../theme/style.layout';
import { fontSize } from '../../theme/style.typography';

export const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 16px 0px;
    ${respondTo.smOnly}{
        flex-direction: column;
        align-items: baseline;
    }
`

export const StyledHeadingContainer = styled.div`
    margin-right: 32px;
    display: flex;
    ${respondTo.smOnly}{
        margin-left: 32px;
        margin-bottom: 8px;
    }
`
export const StyledHeading = styled(Typography)`
  
`

export const StyledActionItemContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    ${respondTo.smOnly}{
        flex-direction: column;
        align-items: baseline;
    }
`

export const StyledActionItem = styled.div<{lastItem?:boolean}>`
    margin-right: 24px;
    ${({lastItem})=>lastItem&&css`
        margin-right: 0px;
    `}
    ${respondTo.smOnly}{
        margin: 8px 0px;
    }
`

export const SearchCtaContainer = styled.div`
    display: flex;
    align-items: center;
    padding : 8px 16px;
    cursor:pointer;
    ${respondTo.smOnly}{
        padding-left: 0px;
        margin-bottom: 2px;
    }
`
export const StyledCtaText = styled(Typography)`
  
`

export const SearchInputContainer = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid ${colors.greyMedium};
    border-radius: 8px;

`

export const StyledSearchInput = styled.input`
    min-width: 240px;
    padding : 8px 0px;
    border: none;
    outline: none;
    font-size:${fontSize.b2};
    line-height: 24px;
    &::placeholder {
        color:  ${colors.grey};
    }
`

export const StyledSearchClear = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.greyLight};
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 10px 8px;
`