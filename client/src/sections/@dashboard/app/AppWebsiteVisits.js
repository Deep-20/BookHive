import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

// PropTypes definition for type checking the component props
AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,    // Array of data series for the chart
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,  // X-axis labels (datetime)
};

export default function AppWebsiteVisits({ title, subheader, chartLabels, chartData, ...other }) {
  // Configure chart options using custom hook
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },  // Set width for bar charts if used
    fill: { type: chartData.map((i) => i.fill) },  // Dynamic fill type based on data
    labels: chartLabels,
    xaxis: { type: 'datetime' },  // X-axis configured for datetime values
    tooltip: {
      shared: true,      // Show tooltip for all series
      intersect: false,  // Trigger tooltip without direct intersection
      y: {
        // Custom formatter to display visit counts
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });

  // Render chart inside a Card component
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      {/* Chart container with left-to-right direction */}
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart 
          type="line"           // Chart type: line chart
          series={chartData}    // The data series to be plotted
          options={chartOptions} // Chart configuration options
          height={364}          // Fixed height for the chart
        />
      </Box>
    </Card>
  );
}
