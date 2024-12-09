// @mui
import PropTypes from 'prop-types';
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
// utils
import { fDateTime } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

AppOrderTimeline.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

// Main component that renders a timeline of orders in a card
export default function AppOrderTimeline({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          // Remove the default opposite content spacing in timeline
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
        }}
      >
        <Timeline>
          {/* Map through the list of orders and render each as a timeline item */}
          {list.map((item, index) => (
            <OrderItem key={item.id} item={item} isLast={index === list.length - 1} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  isLast: PropTypes.bool,
  item: PropTypes.shape({
    time: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    type: PropTypes.string,
  }),
};

// Individual timeline item component that renders a single order entry
function OrderItem({ item, isLast }) {
  const { type, title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          // Color coding based on order type:
          // order1 -> primary (blue)
          // order2 -> success (green)
          // order3 -> info (light blue)
          // order4 -> warning (orange)
          // default -> error (red)
          color={
            (type === 'order1' && 'primary') ||
            (type === 'order2' && 'success') ||
            (type === 'order3' && 'info') ||
            (type === 'order4' && 'warning') ||
            'error'
          }
        />
        {/* Only show connector line if it's not the last item */}
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        {/* Order title */}
        <Typography variant="subtitle2">{title}</Typography>

        {/* Formatted timestamp */}
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
