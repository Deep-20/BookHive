// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

// Custom styled component for the circular icon container
const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

// PropTypes definition for type checking
AppWidgetSummary.propTypes = {
  color: PropTypes.string,      // Theme color to use (primary, secondary, etc.)
  icon: PropTypes.string,       // Icon name/path to display
  title: PropTypes.string.isRequired,  // Widget title text
  total: PropTypes.number.isRequired,  // Numeric value to display
  sx: PropTypes.object,         // Additional MUI system styles
};

// Main widget component that displays a card with an icon, total, and title
export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        // Uses theme color variants for text and background
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: (theme) => theme.palette[color].dark,
          // Creates a gradient background effect for the icon
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </StyledIcon>

      {/* Displays the formatted number value */}
      <Typography variant="h3">{fShortenNumber(total)}</Typography>

      {/* Widget title with reduced opacity */}
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
