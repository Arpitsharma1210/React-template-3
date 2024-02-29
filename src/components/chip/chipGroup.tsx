import React, { useRef, useState } from "react";
import { makeStyles } from '@mui/styles';
import Chip from "./chip";
import { Grid, Popover } from "@mui/material";
import { colors } from "../../theme/style.palette";
import { ChipSize, StyledChipShowMoreContainer, 
    StyledPopoverChipGroup, StyledPopoverContainer,
     StyledPopoverSectionContainer, 
     StyledPopoverSectionHeader, StyledPopoverWrapper } from "./styles";

const useStyles = makeStyles(() => ({
    paper: {
        boxShadow: 'none !important',
        background: 'transparent'
    },
}));

export enum GroupType {
    CLUBBED = 'CLUBBED',
    SEPERATED = 'CLUBBED'
}

interface ChipElement {
    key: string;
    text: string;
    bgColor: string;
    textColor: string;
};

export interface ChipTheme {
    bgColor: string;
    textColor: string;
};

export interface ChipGroupType {
    header: string;
    data: ChipElement[];
};
interface Props {
    data: ChipGroupType[];
    displayCount?: number;
    groupType?: GroupType;
    chipSize?:ChipSize;
    showAll?:boolean;
}

const CaretIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22" height="16" viewBox="0 0 22 16" fill={colors.white} style={{ marginTop: "-2px" }}>
        <path d="M1 1L11 14L21 1" stroke={colors.tableBorder} stroke-width="1" />
    </svg>
)

const ChipGroup: React.FC<Props> = ({
    data, displayCount, 
    groupType = GroupType.CLUBBED,
    chipSize, showAll
}) => {


    const chipsToShow: ChipElement[] = [];
    const popupChips: any = {};
    let chipsDiplayed = 0;
    let popupChipCount = 0;
    let showClubbed = true;

    const hasOneSection = !(data.length > 1)

    data.forEach((group) => {
        group.data.forEach((ele) => {
            const pushToChips = showAll || chipsDiplayed < displayCount;
            if (pushToChips) {
                chipsToShow.push(ele);
                chipsDiplayed += 1;
            }else{
                popupChipCount += 1;
            } 
            
            if(!pushToChips || !hasOneSection) {
                const chips = popupChips[group?.header];
                if (chips) {
                    chips.push(ele)
                } else {
                    popupChips[group?.header] = [ele]
                }
            }
        })
    })

    if (groupType === GroupType.SEPERATED && Object.keys(popupChips).length > 1) {
        showClubbed = false;
    }


    const [showAllEl, setShowAllEl] = useState(null);
    const popoverAnchor = useRef(null);
    const classes = useStyles();

    return (
        <Grid display={'flex'} gap={1} flexWrap={'wrap'}>
            {chipsToShow?.map((ele: any) => (
                <Chip
                    key={ele?.key}
                    text={ele?.text}
                    bgColor={ele.bgColor}
                    textColor={ele.textColor}
                    chipSize={chipSize}

                />)
            )}
            {popupChipCount > 0 && (
                <StyledChipShowMoreContainer
                    ref={popoverAnchor}
                    onClick={() => {
                        setShowAllEl(popoverAnchor?.current);
                    }}
                >
                    <Chip
                        text={`+${popupChipCount}`}
                        bgColor={colors.greyLight}
                        textColor={colors.grey}
                        chipSize={chipSize}
                    />
                </StyledChipShowMoreContainer>
            )}
            <Popover
                open={!!showAllEl}
                anchorEl={showAllEl}
                onClose={() => setShowAllEl(null)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                classes={{ paper: classes.paper }}
            >
                <StyledPopoverWrapper>
                    <StyledPopoverContainer>
                        {!showClubbed ? Object.keys(popupChips).map((key) => {
                            return (
                                <StyledPopoverSectionContainer key={key}>
                                    <StyledPopoverSectionHeader>{key}</StyledPopoverSectionHeader>
                                    <StyledPopoverChipGroup>
                                        {popupChips?.[key]?.map((ele: ChipElement) => (
                                            <Chip
                                                key={ele?.key}
                                                text={ele?.text}
                                                bgColor={ele.bgColor}
                                                textColor={ele.textColor}
                                                chipSize={chipSize}

                                            />)
                                        )}
                                    </StyledPopoverChipGroup>
                                </StyledPopoverSectionContainer>
                            )
                        }) : (
                            <StyledPopoverSectionContainer>
                                <StyledPopoverChipGroup>
                                    {Object.keys(popupChips).reduce((acc, key) => {
                                        acc.push(...(popupChips?.[key] || []))
                                        return acc;
                                    }, [])?.map((ele: ChipElement) => (
                                        <Chip
                                            key={ele?.key}
                                            text={ele?.text}
                                            bgColor={ele.bgColor}
                                            textColor={ele.textColor}
                                            chipSize={chipSize}

                                        />)
                                    )}
                                </StyledPopoverChipGroup>
                            </StyledPopoverSectionContainer>

                        )}
                    </StyledPopoverContainer>
                    <CaretIcon />
                </StyledPopoverWrapper>
            </Popover>
        </Grid>
    )
}

export default ChipGroup;