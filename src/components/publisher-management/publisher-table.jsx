// "use client"

// import { useState, useMemo } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Badge } from "@/components/ui/badge"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { CalendarIcon, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"
// import { format } from "date-fns"

// const initialPublishers = [
//   {
//     id: 1,
//     name: "ATTB US CPA (A)",
//     status: "active",
//     currency: "USD",
//     country: "USA",
//     bidType: "CPA",
//     minBid: 0.25,
//     industry: "Accounting",
//     creationDate: "2000-01-01",
//   },
//   {
//     id: 2,
//     name: "ATTB US CPA (B)",
//     status: "active",
//     currency: "USD",
//     country: "USA",
//     bidType: "CPA",
//     minBid: 0.25,
//     industry: "Accounting",
//     creationDate: "2000-01-01",
//   },
//   {
//     id: 3,
//     name: "Global Leads EU",
//     status: "inactive",
//     currency: "EUR",
//     country: "Germany",
//     bidType: "CPC",
//     minBid: 0.15,
//     industry: "Technology",
//     creationDate: "2001-03-15",
//   },
//   {
//     id: 4,
//     name: "Asia Converters",
//     status: "active",
//     currency: "USD",
//     country: "Singapore",
//     bidType: "CPA",
//     minBid: 0.3,
//     industry: "Finance",
//     creationDate: "2002-07-22",
//   },
// ]

// export function PublishersTable() {
//   const [publishers, setPublishers] = useState(initialPublishers)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("")
//   const [currencyFilter, setCurrencyFilter] = useState("")
//   const [action, setAction] = useState("")
//   const [dateRange, setDateRange] = useState()
//   const [selectedRows, setSelectedRows] = useState([])
//   const [currentPage, setCurrentPage] = useState(1)
//   const [rowsPerPage, setRowsPerPage] = useState(10)

//   // Filter and search logic
//   const filteredPublishers = useMemo(() => {
//     return publishers.filter((publisher) => {
//       const matchesSearch =
//         publisher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         publisher.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         publisher.industry.toLowerCase().includes(searchTerm.toLowerCase())

//       const matchesStatus = !statusFilter || publisher.status === statusFilter
//       const matchesCurrency = !currencyFilter || publisher.currency === currencyFilter

//       return matchesSearch && matchesStatus && matchesCurrency
//     })
//   }, [publishers, searchTerm, statusFilter, currencyFilter])

//   // Pagination
//   const totalPages = Math.ceil(filteredPublishers.length / rowsPerPage)
//   const startIndex = (currentPage - 1) * rowsPerPage
//   const paginatedPublishers = filteredPublishers.slice(startIndex, startIndex + rowsPerPage)

//   const handleSelectAll = (checked) => {
//     if (checked) {
//       setSelectedRows(paginatedPublishers.map((p) => p.id))
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

//   const handleAction = () => {
//     if (action && selectedRows.length > 0) {
//       console.log(`Performing ${action} on publishers:`, selectedRows)
//       // Implement action logic here
//       alert(`Applied ${action} to ${selectedRows.length} publishers`)
//     }
//   }

//   const applyFilters = () => {
//     setCurrentPage(1) // Reset to first page when applying filters
//   }

//   return (
//     <div className="p-6">
//       {/* Action and Date Range Row */}
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center gap-4">
//           <Select value={action} onValueChange={setAction}>
//             <SelectTrigger className="w-40">
//               <SelectValue placeholder="Actions" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="xml">XML</SelectItem>
//               <SelectItem value="status">Status</SelectItem>
//               <SelectItem value="edit">Edit</SelectItem>
//               <SelectItem value="admin-active">Admin Active</SelectItem>
//               <SelectItem value="admin-paused">Admin Paused</SelectItem>
//               <SelectItem value="admin-churn">Admin Churn</SelectItem>
//               <SelectItem value="reset-password">Reset Password</SelectItem>
//             </SelectContent>
//           </Select>

//           {selectedRows.length > 0 && (
//             <Button onClick={handleAction} variant="outline">
//               Apply to {selectedRows.length} selected
//             </Button>
//           )}
//         </div>

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
//             {filteredPublishers.length} Records Found
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

//           <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
//             <SelectTrigger className="w-32">
//               <SelectValue placeholder="Currency" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All</SelectItem>
//               <SelectItem value="USD">USD - $</SelectItem>
//               <SelectItem value="EUR">EUR - €</SelectItem>
//               <SelectItem value="GBP">GBP - £</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-32">
//               <SelectValue placeholder="Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All</SelectItem>
//               <SelectItem value="active">Active</SelectItem>
//               <SelectItem value="inactive">Inactive</SelectItem>
//             </SelectContent>
//           </Select>

//           <Button onClick={applyFilters} variant="outline" size="sm">
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
//                     checked={selectedRows.length === paginatedPublishers.length && paginatedPublishers.length > 0}
//                     onCheckedChange={handleSelectAll}
//                   />
//                 </th>
//                 <th className="p-4 text-left font-medium">Publisher Name</th>
//                 <th className="p-4 text-left font-medium">Status</th>
//                 <th className="p-4 text-left font-medium">Currency</th>
//                 <th className="p-4 text-left font-medium">Country</th>
//                 <th className="p-4 text-left font-medium">Bid Type</th>
//                 <th className="p-4 text-left font-medium">Min Bid</th>
//                 <th className="p-4 text-left font-medium">Industry</th>
//                 <th className="p-4 text-left font-medium">Creation Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedPublishers.map((publisher) => (
//                 <tr key={publisher.id} className="border-t hover:bg-muted/25">
//                   <td className="p-4">
//                     <Checkbox
//                       checked={selectedRows.includes(publisher.id)}
//                       onCheckedChange={(checked) => handleSelectRow(publisher.id, checked)}
//                     />
//                   </td>
//                   <td className="p-4 font-medium">{publisher.name}</td>
//                   <td className="p-4">
//                     <div className="flex items-center gap-2">
//                       <div
//                         className={`w-2 h-2 rounded-full ${publisher.status === "active" ? "bg-green-500" : "bg-red-500"}`}
//                       />
//                       <span className="capitalize">{publisher.status}</span>
//                     </div>
//                   </td>
//                   <td className="p-4">{publisher.currency}</td>
//                   <td className="p-4">{publisher.country}</td>
//                   <td className="p-4">{publisher.bidType}</td>
//                   <td className="p-4">${publisher.minBid}</td>
//                   <td className="p-4">{publisher.industry}</td>
//                   <td className="p-4">{format(new Date(publisher.creationDate), "dd-MM-yyyy")}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center gap-2 mt-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//           disabled={currentPage === 1}
//         >
//           <ChevronLeft className="h-4 w-4" />
//         </Button>

//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//           <Button
//             key={page}
//             variant={currentPage === page ? "default" : "outline"}
//             size="sm"
//             onClick={() => setCurrentPage(page)}
//             className="w-8 h-8"
//           >
//             {page}
//           </Button>
//         ))}

//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
//           disabled={currentPage === totalPages}
//         >
//           <ChevronRight className="h-4 w-4" />
//         </Button>
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
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const initialPublishers = [
  {
    id: 1,
    name: 'ATTB US CPA (A)',
    status: 'active',
    currency: 'USD',
    country: 'USA',
    bidType: 'CPA',
    minBid: 0.25,
    industry: 'Accounting',
    creationDate: '01-01-2000'
  },
  {
    id: 2,
    name: 'ATTB US CPA (B)',
    status: 'active',
    currency: 'USD',
    country: 'USA',
    bidType: 'CPA',
    minBid: 0.25,
    industry: 'Accounting',
    creationDate: '01-01-2000'
  },
  {
    id: 3,
    name: 'Global Leads EU',
    status: 'inactive',
    currency: 'EUR',
    country: 'Germany',
    bidType: 'CPC',
    minBid: 0.15,
    industry: 'Technology',
    creationDate: '15-03-2001'
  },
  {
    id: 4,
    name: 'Asia Converters',
    status: 'active',
    currency: 'USD',
    country: 'Singapore',
    bidType: 'CPA',
    minBid: 0.3,
    industry: 'Finance',
    creationDate: '22-07-2002'
  }
];

export function PublishersTable() {
  const [publishers, setPublishers] = useState(initialPublishers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState('');
  const [action, setAction] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  // Add state for visible columns with default important columns
  const [visibleColumns, setVisibleColumns] = useState([
    'name',
    'status',
    'currency',
    'country',
    'bidType',
    'minBid',
    'industry',
    'creationDate'
  ]);

  // Define all available columns for the stats dropdown
  const allColumns = [
    { id: 'name', label: 'Publisher Name' },
    { id: 'status', label: 'Status' },
    { id: 'currency', label: 'Currency' },
    { id: 'country', label: 'Country' },
    { id: 'bidType', label: 'Bid Type' },
    { id: 'minBid', label: 'Min Bid' },
    { id: 'industry', label: 'Industry' },
    { id: 'creationDate', label: 'Creation Date' }
  ];

  // Generate column options for the dropdown
  const columnOptions = allColumns.map((column) => ({
    value: column.id,
    label: column.label
  }));

  // Working search and filter functionality
  const filteredPublishers = useMemo(() => {
    return publishers.filter((publisher) => {
      const matchesSearch =
        publisher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publisher.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publisher.industry.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = !statusFilter || publisher.status === statusFilter;
      const matchesCurrency = !currencyFilter || publisher.currency === currencyFilter;

      return matchesSearch && matchesStatus && matchesCurrency;
    });
  }, [publishers, searchTerm, statusFilter, currencyFilter]);

  const paginatedPublishers = filteredPublishers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const totalPages = Math.ceil(filteredPublishers.length / rowsPerPage);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(paginatedPublishers.map((row) => row.id));
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

  const handleApplyAction = () => {
    if (action && selectedRows.length > 0) {
      alert(`Applied ${action} to ${selectedRows.length} publishers`);
      console.log('Action applied:', { action, selectedPublishers: selectedRows });
    }
  };

  const applyFilters = () => {
    setPage(0); // Reset to first page when applying filters
    console.log('Filters applied:', { searchTerm, statusFilter, currencyFilter, startDate, endDate });
  };

  // Handle stats column selection
  const handleStatsChange = (value) => {
    if (value === 'all') {
      setVisibleColumns(allColumns.map((col) => col.id));
    } else if (value === '' || !value) {
      // Default columns
      setVisibleColumns(['name', 'status', 'currency', 'country', 'bidType', 'minBid', 'industry', 'creationDate']);
    } else {
      // Single column selection
      setVisibleColumns([value]);
    }
  };

  // Filter columns based on visibility
  const getVisibleColumns = () => {
    return allColumns.filter((column) => visibleColumns.includes(column.id));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        {/* Filters Row */}
        <Stack direction="row" spacing={2} sx={{ p: 2, alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={action || ''}
                onChange={(e) => setAction(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Actions' }}
              >
                <MenuItem value="" disabled>
                  Actions
                </MenuItem>
                <MenuItem value="XML">XML</MenuItem>
                <MenuItem value="Status">Status</MenuItem>
                <MenuItem value="Edit">Edit</MenuItem>
                <MenuItem value="Admin Active">Admin Active</MenuItem>
                <MenuItem value="Admin Paused">Admin Paused</MenuItem>
                <MenuItem value="Admin Churn">Admin Churn</MenuItem>
                <MenuItem value="Reset Password">Reset Password</MenuItem>
              </Select>
            </FormControl>

            {selectedRows.length > 0 && (
              <Button variant="contained" onClick={handleApplyAction} size="small">
                Apply to {selectedRows.length} selected
              </Button>
            )}
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
                {filteredPublishers.length} Records Found
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

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Select Stats</InputLabel>
              <Select value="" label="Select Stats" onChange={(e) => handleStatsChange(e.target.value)}>
                <MenuItem value="">Default Stats</MenuItem>
                <MenuItem value="all">All Stats</MenuItem>
                {columnOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Currency</InputLabel>
              <Select value={currencyFilter} label="Currency" onChange={(e) => setCurrencyFilter(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="USD">USD - $</MenuItem>
                <MenuItem value="EUR">EUR - €</MenuItem>
                <MenuItem value="GBP">GBP - £</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>

            <Button variant="outlined" size="small" startIcon={<Filter size="16" />} onClick={applyFilters}>
              Apply Filters
            </Button>

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
                    checked={selectedRows.length === paginatedPublishers.length && paginatedPublishers.length > 0}
                    indeterminate={selectedRows.length > 0 && selectedRows.length < paginatedPublishers.length}
                    onChange={handleSelectAll}
                  />
                </th>
                {getVisibleColumns().map((column) => (
                  <th key={column.id} style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedPublishers.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <td style={{ padding: '12px' }}>
                    <Checkbox checked={isSelected(row.id)} onChange={() => handleSelectRow(row.id)} />
                  </td>
                  {getVisibleColumns().map((column) => (
                    <td key={column.id} style={{ padding: '12px' }}>
                      {column.id === 'name' ? (
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {row[column.id]}
                        </Typography>
                      ) : column.id === 'status' ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: row.status === 'active' ? 'success.main' : 'error.main',
                              mr: 1
                            }}
                          />
                          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                            {row.status}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="body2">{row[column.id]}</Typography>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              variant="outlined"
              size="small"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              sx={{ minWidth: '32px', height: '32px' }}
            >
              <ChevronLeft size={16} />
            </Button>

            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                variant={page === index ? 'contained' : 'text'}
                size="small"
                onClick={() => setPage(index)}
                sx={{ minWidth: '32px', height: '32px' }}
              >
                {index + 1}
              </Button>
            ))}

            <Button
              variant="outlined"
              size="small"
              disabled={page >= totalPages - 1}
              onClick={() => setPage(page + 1)}
              sx={{ minWidth: '32px', height: '32px' }}
            >
              <ChevronRight size={16} />
            </Button>
          </Stack>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
