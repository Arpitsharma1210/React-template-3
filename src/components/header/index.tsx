import React from 'react';
import {
    StyledContainer,
    StyledLogo,
    StyledLogoContainer,
    StyledLogoutContainer,
    StyledLogoutText,
    StyledNavContainer,
    StyledNavItem,
    StyledNavItemText
} from "./styles"
import { useDispatch } from 'react-redux';
import messages from '../../messages';
import { routes } from '../../utils';
import { useLocation } from 'react-router-dom';
import { push } from 'connected-react-router';
import { logout } from '../../redux/actions';
import { Right } from "../../redux/reducers/auth";


interface Props {

}

const navItems = [
    {
        key : 'Dashboard',
        label : 'Dashboard',
        path : routes.dashboard.root,
        icon: '',
        right: Right.DASHBOARD
    },

    // Add sidebar menu items here
]

const Header: React.FC<Props> = ({

}) => {

    const reduxDispatch = useDispatch();
    const location = useLocation();

    return (
        <StyledContainer>
            <StyledLogoContainer>
                <StyledLogo src='/assets/images/smallLogo.png' />
            </StyledLogoContainer>
            <StyledNavContainer>
                {navItems.map((navItem)=>(
                    <StyledNavItem 
                        active={location.pathname.startsWith(navItem.path)} 
                        key={navItem?.key}
                        onClick={()=>reduxDispatch(push(navItem.path))}
                    >
                        <StyledNavItemText variant="body2">
                            {navItem?.label}
                        </StyledNavItemText>
                    </StyledNavItem>
                ))}
            </StyledNavContainer>
            <StyledLogoutContainer onClick={()=>reduxDispatch(push(routes.login))}>
                    <StyledLogoutText variant='body2'>Logout</StyledLogoutText>
            </StyledLogoutContainer>
        </StyledContainer>
    )
}

export default Header;