import { styled } from "styled-components"
import { brand, colors } from "../../theme/style.palette"
import { Typography } from "@mui/material"
import { fontSize, fontWeight } from "../../theme/style.typography"

export interface StyledChipContainerProps {
    bgColor?: string;
    textColor?: string;
}

export enum ChipSize {
    Large = 'large',
    Regular = 'regular'
}

export const StyledChipContainer = styled.div<StyledChipContainerProps>`
    display : flex;
    padding : 4px 16px;
    border-radius : 24px;
    background : ${({bgColor})=>bgColor || brand.primaryMain};
    gap : 8px;
    color : ${({textColor})=>textColor || colors.grey10};
    align-items: center;
    justify-content: center;
`

export const StyledChipText = styled(Typography)<{chipSize?:ChipSize}>`
    font-size : ${({chipSize})=>chipSize === ChipSize.Large ? fontSize.b1 : fontSize.b2} !important;
`

export const StyledChipShowMoreContainer = styled.div`
    cursor : pointer;
`

export const StyledPopoverWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const StyledPopoverContainer = styled.div`
    background-color: ${colors.white};
    padding: 32px 16px;
    padding: 16px 16px;
    border-radius: 16px;
    border: 1px solid ${colors.tableBorder};
    max-width : 600px;
    min-width : 200px;
    max-height : 400px;
    overflow-y : auto;
    padding : 16px;
    display : flex;
    flex-direction: column;
    gap: 24px;
`

export const StyledPopoverSectionContainer = styled.div`
    display : flex;
    flex-direction: column;
    flex-wrap : wrap;
    gap : 8px;
`
export const StyledPopoverSectionHeader = styled.span`
    font-size : ${fontSize.b1};
    font-weight : ${fontWeight.semiBold};
`

export const StyledPopoverChipGroup = styled.div`
    display : flex;
    flex-wrap : wrap;
    gap : 8px; 
`