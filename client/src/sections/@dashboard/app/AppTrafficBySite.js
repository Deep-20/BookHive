// @mui
import PropTypes from 'prop-types';
import { Box, Card, Paper, Typography, CardHeader, CardContent } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

// PropTypes definition for component props validation
AppTrafficBySite.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired, // Required array of site traffic data
};

export default function AppTrafficBySite({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      {/* Header section with title and subheader */}
      <CardHeader title={title} subheader={subheader} />

      <CardContent>
        {/* Grid container for site traffic items
            - Creates a 2-column responsive grid
            - Gap of 2 units between items */}
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
        >
          {/* Map through each site in the list and create a traffic card */}
          {list.map((site) => (
            <Paper key={site.name} variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
              {/* Site icon */}
              <Box sx={{ mb: 0.5 }}>{site.icon}</Box>

              {/* Traffic value - shortened for display (e.g., 1.5K, 2M) */}
              <Typography variant="h6">{fShortenNumber(site.value)}</Typography>

              {/* Site name */}
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {site.name}
              </Typography>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
