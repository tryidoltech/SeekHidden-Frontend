// "use client"

// import { useState, useMemo } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Badge } from "@/components/ui/badge"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { CalendarIcon, Search, Filter } from "lucide-react"
// import { format } from "date-fns"

// const publisherStatsData = [
//   {
//     id: 1,
//     name: "Monester CPA UK",
//     grossSpend: "0.93 USD",
//     validClicks: "00",
//     foreignClicks: "00",
//     latentClicks: "00",
//     botClicks: "00",
//     duplicateClicks: "00",
//   },
//   {
//     id: 2,
//     name: "ATTB US CPA",
//     grossSpend: "1.25 USD",
//     validClicks: "15",
//     foreignClicks: "02",
//     latentClicks: "03",
//     botClicks: "01",
//     duplicateClicks: "00",
//   },
//   {
//     id: 3,
//     name: "Global Leads EU",
//     grossSpend: "2.50 USD",
//     validClicks: "28",
//     foreignClicks: "05",
//     latentClicks: "02",
//     botClicks: "03",
//     duplicateClicks: "01",
//   },
// ]

// export function PublishersStats() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [dateRange, setDateRange] = useState()
//   const [selectedRows, setSelectedRows] = useState([])
//   const [rowsPerPage, setRowsPerPage] = useState(10)

//   const filteredStats = useMemo(() => {
//     return publisherStatsData.filter((stat) => stat.name.toLowerCase().includes(searchTerm.toLowerCase()))
//   }, [searchTerm])

//   const handleSelectAll = (checked) => {
//     if (checked) {
//       setSelectedRows(filteredStats.map((s) => s.id))
//     } else {
//       setSelectedRows([])
//     }
//   }

//   const handleSelectRow = (id, checked) => {
//     if (checked) {
//       setSelectedRows([...selectedRows, id])
//     } else {
//       setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
//     }
//   }

//   return (
//     <div className="p-6">
//       {/* Action and Date Range Row */}
//       <div className="flex justify-between items-center mb-4">
//         <Button variant="outline">Actions</Button>

//         <div className="flex items-center gap-2">
//           <span className="text-sm text-muted-foreground">Date Range:</span>
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button variant="outline" className="w-60 justify-start text-left font-normal">
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {dateRange?.from ? (
//                   dateRange.to ? (
//                     <>
//                       {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
//                     </>
//                   ) : (
//                     format(dateRange.from, "LLL dd, y")
//                   )
//                 ) : (
//                   <span>Pick a date range</span>
//                 )}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0" align="start">
//               <Calendar
//                 initialFocus
//                 mode="range"
//                 defaultMonth={dateRange?.from}
//                 selected={dateRange}
//                 onSelect={setDateRange}
//                 numberOfMonths={2}
//               />
//             </PopoverContent>
//           </Popover>
//         </div>
//       </div>

//       {/* Search and Filter Row */}
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center gap-4">
//           <Badge variant="secondary" className="px-3 py-1">
//             {filteredStats.length} Records Found
//           </Badge>

//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search publishers..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 w-64"
//             />
//           </div>

//           <Button variant="outline" size="sm">
//             <Filter className="h-4 w-4 mr-2" />
//             Apply Filters
//           </Button>
//         </div>

//         <div className="flex items-center gap-2">
//           <span className="text-sm text-muted-foreground">Rows per page:</span>
//           <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
//             <SelectTrigger className="w-20">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="5">5</SelectItem>
//               <SelectItem value="10">10</SelectItem>
//               <SelectItem value="25">25</SelectItem>
//               <SelectItem value="50">50</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="border rounded-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-muted/50">
//               <tr>
//                 <th className="p-4 text-left">
//                   <Checkbox
//                     checked={selectedRows.length === filteredStats.length && filteredStats.length > 0}
//                     onCheckedChange={handleSelectAll}
//                   />
//                 </th>
//                 <th className="p-4 text-left font-medium">Publisher Name</th>
//                 <th className="p-4 text-left font-medium">Gross Spend</th>
//                 <th className="p-4 text-left font-medium">Valid Clicks</th>
//                 <th className="p-4 text-left font-medium">Foreign Clicks</th>
//                 <th className="p-4 text-left font-medium">Latent Clicks</th>
//                 <th className="p-4 text-left font-medium">Bot Clicks</th>
//                 <th className="p-4 text-left font-medium">Duplicate Clicks</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredStats.map((stat) => (
//                 <tr key={stat.id} className="border-t hover:bg-muted/25">
//                   <td className="p-4">
//                     <Checkbox
//                       checked={selectedRows.includes(stat.id)}
//                       onCheckedChange={(checked) => handleSelectRow(stat.id, checked)}
//                     />
//                   </td>
//                   <td className="p-4 font-medium">{stat.name}</td>
//                   <td className="p-4">{stat.grossSpend}</td>
//                   <td className="p-4">{stat.validClicks}</td>
//                   <td className="p-4">{stat.foreignClicks}</td>
//                   <td className="p-4">{stat.latentClicks}</td>
//                   <td className="p-4">{stat.botClicks}</td>
//                   <td className="p-4">{stat.duplicateClicks}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }
'use client';

import { useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Search, Filter } from 'lucide-react';

const publisherStatsData = [
  {
    id: 1,
    name: 'Monester CPA UK',
    grossSpend: '0.93 USD',
    validClicks: '00',
    foreignClicks: '00',
    latentClicks: '00',
    botClicks: '00',
    duplicateClicks: '00'
  },
  {
    id: 2,
    name: 'ATTB US CPA',
    grossSpend: '1.25 USD',
    validClicks: '15',
    foreignClicks: '02',
    latentClicks: '03',
    botClicks: '01',
    duplicateClicks: '00'
  },
  {
    id: 3,
    name: 'Global Leads EU',
    grossSpend: '2.50 USD',
    validClicks: '28',
    foreignClicks: '05',
    latentClicks: '02',
    botClicks: '03',
    duplicateClicks: '01'
  }
];

export function PublishersStats() {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredStats = useMemo(() => {
    return publisherStatsData.filter((stat) => stat.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(filteredStats.map((s) => s.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selectedRows.slice(0, selectedIndex), selectedRows.slice(selectedIndex + 1));
    }

    setSelectedRows(newSelected);
  };

  const isSelected = (id) => selectedRows.indexOf(id) !== -1;

  const applyFilters = () => {
    console.log('Stats filters applied:', { searchTerm, startDate, endDate });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        {/* Filters Row */}
        <Stack direction="row" spacing={2} sx={{ p: 2, alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button variant="outlined" size="small">
              Actions
            </Button>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2">Date Range :</Typography>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} size="small" sx={{ minWidth: 150 }} />}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} size="small" sx={{ minWidth: 150 }} />}
            />
          </Stack>
        </Stack>

        {/* Search and Filter Row */}
        <Stack direction="row" spacing={2} sx={{ px: 2, pb: 2, alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                backgroundColor: 'grey.100',
                px: 1.5,
                py: 1,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {filteredStats.length} Records Found
              </Typography>
            </Box>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ minWidth: 200 }}
              InputProps={{
                startAdornment: <Search size="16" style={{ marginRight: 8, color: '#666' }} />
              }}
            />

            <Button variant="outlined" size="small" startIcon={<Filter size="16" />} onClick={applyFilters}>
              Apply Filters
            </Button>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2">Rows per page :</Typography>
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select value={rowsPerPage} onChange={(e) => setRowsPerPage(e.target.value)}>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        {/* Table */}
        <Box sx={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
                <th style={{ padding: '12px', textAlign: 'left', width: '50px' }}>
                  <Checkbox
                    checked={selectedRows.length === filteredStats.length && filteredStats.length > 0}
                    indeterminate={selectedRows.length > 0 && selectedRows.length < filteredStats.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Publisher Name</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Gross Spend</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Valid Clicks</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Foreign Clicks</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Latent Clicks</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Bot Clicks</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Duplicate Clicks</th>
              </tr>
            </thead>
            <tbody>
              {filteredStats.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <td style={{ padding: '12px' }}>
                    <Checkbox checked={isSelected(row.id)} onChange={() => handleSelectRow(row.id)} />
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {row.name}
                    </Typography>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Typography variant="body2">{row.grossSpend}</Typography>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Typography variant="body2">{row.validClicks}</Typography>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Typography variant="body2">{row.foreignClicks}</Typography>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Typography variant="body2">{row.latentClicks}</Typography>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Typography variant="body2">{row.botClicks}</Typography>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Typography variant="body2">{row.duplicateClicks}</Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
