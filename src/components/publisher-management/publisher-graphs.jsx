"use client"

import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { useTheme } from "@mui/material/styles"
import ReactApexChart from "react-apexcharts"

export function PublisherGraphs() {
  const theme = useTheme()
  const mode = theme.palette.mode
  const { primary, secondary } = theme.palette.text
  const line = theme.palette.divider

  const [dateRange, setDateRange] = useState('last7days')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [metric, setMetric] = useState('all')

  // Line Chart Options
  const [lineChartOptions, setLineChartOptions] = useState({
    chart: {
      type: 'area',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2,
      curve: 'smooth'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        type: 'vertical',
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0
      }
    },
    grid: {
      strokeDashArray: 4
    },
    legend: {
      position: 'top'
    }
  })

  // Bar Chart Options
  const [barChartOptions, setBarChartOptions] = useState({
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      strokeDashArray: 4
    },
    legend: {
      position: 'top'
    }
  })

  // Donut Chart Options
  const [donutChartOptions, setDonutChartOptions] = useState({
    chart: {
      type: 'donut'
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%'
        }
      }
    },
    dataLabels: {
      enabled: true
    },
    legend: {
      position: 'bottom'
    }
  })

  useEffect(() => {
    // Update Line Chart Options
    setLineChartOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.error.main],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        labels: {
          style: {
            colors: secondary
          }
        },
        axisBorder: {
          show: false,
          color: line
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      theme: {
        mode: mode === 'dark' ? 'dark' : 'light'
      },
      legend: {
        labels: {
          colors: secondary
        }
      }
    }))

    // Update Bar Chart Options
    setBarChartOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main],
      xaxis: {
        categories: ['ATTB US CPA (A)', 'ATTB US CPA (B)', 'Global Leads EU', 'Asia Converters'],
        labels: {
          style: {
            colors: secondary
          }
        },
        axisBorder: {
          show: false,
          color: line
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      theme: {
        mode: mode === 'dark' ? 'dark' : 'light'
      },
      legend: {
        labels: {
          colors: secondary
        }
      }
    }))

    // Update Donut Chart Options
    setDonutChartOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.success.main, theme.palette.error.main, theme.palette.warning.main],
      labels: ['Active', 'Inactive', 'Paused'],
      legend: {
        labels: {
          colors: secondary
        }
      },
      theme: {
        mode: mode === 'dark' ? 'dark' : 'light'
      }
    }))
  }, [mode, primary, secondary, line, theme])

  // Chart Data
  const lineChartSeries = [
    {
      name: 'Revenue',
      data: [12000, 19000, 15000, 25000, 22000, 30000]
    },
    {
      name: 'Spend',
      data: [8000, 12000, 10000, 18000, 15000, 20000]
    }
  ]

  const barChartSeries = [
    {
      name: 'Performance',
      data: [65, 59, 80, 81]
    }
  ]

  const donutChartSeries = [70, 20, 10]

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Date Range</InputLabel>
              <Select
                value={dateRange}
                label="Date Range"
                onChange={(e) => setDateRange(e.target.value)}
              >
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="yesterday">Yesterday</MenuItem>
                <MenuItem value="last7days">Last 7 Days</MenuItem>
                <MenuItem value="last30days">Last 30 Days</MenuItem>
                <MenuItem value="thisMonth">This Month</MenuItem>
                <MenuItem value="lastMonth">Last Month</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </Select>
            </FormControl>

            {dateRange === 'custom' && (
              <>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  slotProps={{
                    textField: {
                      size: 'small',
                      sx: { minWidth: 150 }
                    }
                  }}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  slotProps={{
                    textField: {
                      size: 'small',
                      sx: { minWidth: 150 }
                    }
                  }}
                />
              </>
            )}

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Metric</InputLabel>
              <Select
                value={metric}
                label="Metric"
                onChange={(e) => setMetric(e.target.value)}
              >
                <MenuItem value="all">All Metrics</MenuItem>
                <MenuItem value="revenue">Revenue</MenuItem>
                <MenuItem value="spend">Spend</MenuItem>
                <MenuItem value="clicks">Clicks</MenuItem>
                <MenuItem value="conversions">Conversions</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Paper>

        {/* Charts Grid */}
        <Grid container spacing={3}>
          {/* Revenue vs Spend Trend */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Revenue vs Spend Trend
              </Typography>
              <Box sx={{ height: 400 }}>
                <ReactApexChart 
                  options={lineChartOptions} 
                  series={lineChartSeries} 
                  type="area" 
                  height={350} 
                />
              </Box>
            </Paper>
          </Grid>

          {/* Publisher Status Distribution */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Publisher Status
              </Typography>
              <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ReactApexChart 
                  options={donutChartOptions} 
                  series={donutChartSeries} 
                  type="donut" 
                  height={350} 
                />
              </Box>
            </Paper>
          </Grid>

          {/* Publisher Performance */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Publisher Performance Comparison
              </Typography>
              <Box sx={{ height: 400 }}>
                <ReactApexChart 
                  options={barChartOptions} 
                  series={barChartSeries} 
                  type="bar" 
                  height={350} 
                />
              </Box>
            </Paper>
          </Grid>

          {/* Key Metrics Cards */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4" color="primary" gutterBottom>
                $125,000
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Revenue
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4" color="error" gutterBottom>
                $87,500
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Spend
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4" color="success.main" gutterBottom>
                42.5%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Profit Margin
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4" color="info.main" gutterBottom>
                1,250
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Clicks
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  )
}