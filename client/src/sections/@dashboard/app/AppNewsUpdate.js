// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

// ----------------------------------------------------------------------

// Component to display a list of news updates in a card format
AppNewsUpdate.propTypes = {
  title: PropTypes.string,      // Card header title
  subheader: PropTypes.string,  // Card header subtitle
  list: PropTypes.array.isRequired,  // Array of news items to display
};

export default function AppNewsUpdate({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      {/* Card header with title and subheader */}
      <CardHeader title={title} subheader={subheader} />

      {/* Scrollable container for news items */}
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {/* Map through news items and render each one */}
          {list.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      {/* Footer section with "View all" button */}
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          View all
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

// PropTypes for individual news item
NewsItem.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,  // News description text
    image: PropTypes.string,        // URL of the news image
    postedAt: PropTypes.instanceOf(Date),  // Timestamp of when news was posted
    title: PropTypes.string,        // News title
  }),
};

// Component to render individual news item
function NewsItem({ news }) {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {/* News thumbnail image */}
      <Box component="img" alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

      {/* News content container */}
      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        {/* Clickable news title */}
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {title}
        </Link>

        {/* News description with ellipsis if too long */}
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>

      {/* Relative timestamp (e.g., "2 hours ago") */}
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fToNow(postedAt)}
      </Typography>
    </Stack>
  );
}
