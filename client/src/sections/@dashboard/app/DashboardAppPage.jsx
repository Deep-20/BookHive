import { Helmet } from "react-helmet-async";
import { useTheme } from "@mui/material/styles";
import { Container, Grid, Typography } from "@mui/material";
import { AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary } from "./index";
import { useAuth } from "../../../hooks/useAuth";

// ----------------------------------------------------------------------

// Main dashboard component
export default function DashboardAppPage() {
  // Get user data from authentication context
  const { user } = useAuth();
  // Get theme for consistent styling
  const theme = useTheme();

  return (
    <>
      {/* SEO optimization with React Helmet */}
      <Helmet>
        <title> Library | Dashboard </title>
      </Helmet>

      {/* Main container with maximum width */}
      <Container maxWidth="xl">
        {/* Welcome message using first name only */}
        <Typography variant="h4" sx={{mb: 5}}>
          Hi {user.name.split(' ')[0]}, Welcome back
        </Typography>

        {/* Dashboard grid layout */}
        <Grid container spacing={3}>
          {/* Summary widgets section - 4 cards in a row on large screens */}
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'}/>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'}/>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          {/* Large chart section - takes 8 columns on large screens */}
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              // Chart data configuration
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                // Column chart for Team A
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                // Area chart for Team B
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                // Line chart for Team C
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          {/* Pie chart section - takes 4 columns on large screens */}
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              // Using theme colors for consistent styling
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
