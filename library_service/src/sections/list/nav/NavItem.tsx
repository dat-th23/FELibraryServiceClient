import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Tooltip, Link, ListItemText } from '@mui/material';
// locales
import { useLocales } from '../../../locales';
// auth
import RoleBasedGuard from '../../../auth/RoleBasedGuard';
//
import { NavItemProps } from '../../../components/nav-section/types';
import { StyledItem, StyledIcon, StyledDotIcon } from '../../../components/nav-section/vertical/styles';

// ----------------------------------------------------------------------

export default function NavItem({
    item,

    ...other
}: NavItemProps) {
    const { translate } = useLocales();

    const { title, path, icon, info, children, disabled, caption, roles } = item;


    const renderContent = (
        <StyledItem disabled={disabled} caption={!!caption} {...other}>


            <ListItemText
                primary={translate(title)}
                secondary={
                    caption && (
                        <Tooltip title={translate(caption)} placement="top-start">
                            <span>{translate(caption)}</span>
                        </Tooltip>
                    )
                }
                primaryTypographyProps={{
                    noWrap: true,
                    component: 'span',
                }}
                secondaryTypographyProps={{
                    noWrap: true,
                    variant: 'caption',
                }}
            />

            {info && (
                <Box component="span" sx={{ lineHeight: 0 }}>
                    {info}
                </Box>
            )}


        </StyledItem>
    );

    const renderItem = () => {
        // ExternalLink

        // Default
        return (
            <Link component={RouterLink} to={path} underline="none">
                {renderContent}
            </Link>
        );
    };

    return <RoleBasedGuard roles={roles}> {renderItem()} </RoleBasedGuard>;
}
