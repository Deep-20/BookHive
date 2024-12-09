import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

// Component to display conversion rates in a horizontal bar chart
// Requires title, subheader, and chartData array containing label/value pairs
AppConversionRates.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

export default function AppConversionRates({ title, subheader, chartData, ...other }) {
  // Extract labels and values from chartData for the chart
  const chartLabels = chartData.map((i) => i.label);
  const chartSeries = chartData.map((i) => i.value);

  // Configure chart options using the useChart custom hook
  const chartOptions = useChart({
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName), // Format numbers in tooltip
        title: {
          formatter: () => '', // Remove series name from tooltip
        },
      },
    },
    plotOptions: {
      bar: { 
        horizontal: true, // Display bars horizontally
        barHeight: '28%', // Set bar thickness
        borderRadius: 2  // Slightly rounded corners
      },
    },
    xaxis: {
      categories: chartLabels,
    },
  });

  // Render card containing the bar chart
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={[{ data: chartSeries }]} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
