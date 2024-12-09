// @mui
import { styled } from '@mui/material/styles';
import { ListItemIcon, ListItemButton } from '@mui/material';

// ----------------------------------------------------------------------

// Custom styled navigation item component that extends MUI's ListItemButton
export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

// Custom styled icon container with fixed dimensions and centered content
export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
