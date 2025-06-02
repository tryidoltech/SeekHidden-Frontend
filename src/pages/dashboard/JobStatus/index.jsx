import React from "react"
import ApplyFilters from "../../../components/jobstatus/ApplyFilters"
import ToggleMetrics from "../../../components/jobstatus/ToggleMetrics"
import { Stack } from "@mui/system"
import CustomTable from "../../../components/shareComponents/CustomTable"
import MultiLineChart from "../../../components/shareComponents/MultiLineChart"
import LineChart from "../../../components/shareComponents/LineChart"


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

//table
const rows = [
  {
    id: 1,
    country: 'UK',
    website: 'Website 1',
    dod: 5500,
    dodPercent: '10%'
  },
  {
    id: 2,
    country: 'USA',
    website: 'Website 2',
    dod: 5500,
    dodPercent: '8%'
  },
  {
    id: 3,
    country: 'UK',
    website: 'Website 3',
    dod: 5500,
    dodPercent: '12%'
  },
  {
    id: 4,
    country: 'USA',
    website: 'Website 4',
    dod: 5500,
    dodPercent: '5%'
  },
  {
    id: 5,
    country: 'UK',
    website: 'Website 5',
    dod: 5500,
    dodPercent: '15%'
  }
];



const headers = [
  { label: 'ID', key: 'id' },
  { label: 'Country', key: 'country' },
  { label: 'Website', key: 'website' },
  { label: 'DOD', key: 'dod' },
  { label: 'DOD%', key: 'dodPercent' }
];


const countryCpsRows = [
  {
    id: 1,
    country: 'UK',
    website: 'Website 1',
    Today_CPC: 2.5,
    CPC_DOD: '10%',
    Jobs_DOD: '5%'
  },
  {
    id: 2,
    country: 'USA',
    website: 'Website 2',
    Today_CPC: 3.1,
    CPC_DOD: '8%',
    Jobs_DOD: '7%'
  },
  {
    id: 3,
    country: 'UK',
    website: 'Website 3',
    Today_CPC: 1.9,
    CPC_DOD: '12%',
    Jobs_DOD: '4%'
  },
  {
    id: 4,
    country: 'USA',
    website: 'Website 4',
    Today_CPC: 2.8,
    CPC_DOD: '5%',
    Jobs_DOD: '3%'
  },
  {
    id: 5,
    country: 'UK',
    website: 'Website 5',
    Today_CPC: 3.4,
    CPC_DOD: '15%',
    Jobs_DOD: '9%'
  }
];


const countryCpsheaders = [
  { label: 'ID', key: 'id' },
  { label: 'Country', key: 'country' },
  { label: 'Website', key: 'website' },
  { label: 'Today CPC', key: 'Today_CPC' },
  { label: 'CPC DOD', key: 'CPC_DOD' },
  { label: 'Jobs DOD', key: 'Jobs_DOD' }
];

//multilineChart
const sampleSeries = [
  {
    name: 'Series A',
    data: [450, 800, 600, 900, 200, 1000, 700, 150, 850, 400],
  },
  {
    name: 'Series B',
    data: [300, 500, 400, 700, 100, 950, 600, 100, 700, 450],
  },
  {
    name: 'Series C',
    data: [100, 250, 300, 850, 950, 200, 500, 850, 600, 1000],
  },
];

const xLabels = Array.from({ length: 10 }, (_, i) => i.toString());

//lineChart
  const chartSeries = [
    {
      name: 'www.abcxyz.com',
      data: [80, 120, 190, 300, 270, 180],
    },
    {
      name: 'www.abcxyz.com',
      data: [250, 150, 0, 100, 260, 0],
    },
    {
      name: 'www.abcxyz.com',
      data: [100, 280, 230, 150, 260, 300],
    },
    {
      name: 'www.abcxyz.com',
      data: [20, 60, 90, 250, 270, 330],
    },
  ];

  const chartCategories = [0, 1, 2, 3, 4, 5];
  const title = 'Line Chart - abcxyz.com';
const JobStatus=()=>{

  
    return(
        <Stack direction="column" spacing={2}>
             <ApplyFilters />
            <ToggleMetrics />
            <MultiLineChart 
            title=""
            seriesData={sampleSeries}
            categories={xLabels}/>
            <CustomTable    
            title="Top 10 Website Increase/Decrease"
            data={rows}
            headers={headers}
            filename="basic-table-data.csv" 
            withPagination={true}/>
      <LineChart series={chartSeries} title="" categories={chartCategories} />
         <CustomTable    
      title="Top 25 Website Increasing Country CPC"
      data={countryCpsRows}
      headers={countryCpsheaders}
      filename="basic-table-data.csv" />
        </Stack>
           
  
    )
}
export default JobStatus