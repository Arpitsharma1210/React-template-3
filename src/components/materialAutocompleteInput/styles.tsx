import { styled } from "styled-components";
import { brand } from "../../theme/style.palette";
import { fontSize, fontWeight } from "../../theme/style.typography";


export const StyledChipContainer = styled.div`
    display: flex;
    padding: 2px 5px 2px 10px;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 60px;
    background: ${brand.primaryLight};
    margin-right : 5px;
`

export const StyledChipLabel = styled.span`
    color : ${brand.primaryMain};
    font-size : ${fontSize.b2};
    font-weight : ${fontWeight.medium};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 72px;

`

export const StyledChipCloseContainer = styled.div`
    cursor : pointer;
    display : flex;
`