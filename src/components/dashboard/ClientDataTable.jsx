import React, { useState, useMemo, useEffect } from 'react';
import DataTable from 'react-data-table-component';

const sampleData = [
  {
    id: 1,
    clientName: 'Alpha Corp',
    clientType: 'CPA',
    status: 'active',
    budgetCap: 1000.00,
    spend: 250.75,
    reconSpend: 245.30,
    clicks: 125,
    validClicks: 120,
    invalidClicks: 5,
    createdDate: '2023-01-15'
  },
  {
    id: 2,
    clientName: 'Beta Solutions',
    clientType: 'CPA',
    status: 'inactive',
    budgetCap: 1500.00,
    spend: 0.00,
    reconSpend: 0.00,
    clicks: 0,
    validClicks: 0,
    invalidClicks: 0,
    createdDate: '2023-02-20'
  },
  {
    id: 3,
    clientName: 'Gamma Digital',
    clientType: 'CPC',
    status: 'active',
    budgetCap: 2000.00,
    spend: 875.40,
    reconSpend: 860.15,
    clicks: 340,
    validClicks: 335,
    invalidClicks: 5,
    createdDate: '2023-03-10'
  },
  {
    id: 4,
    clientName: 'Delta Marketing',
    clientType: 'CPC',
    status: 'active',
    budgetCap: 800.00,
    spend: 450.25,
    reconSpend: 445.80,
    clicks: 180,
    validClicks: 175,
    invalidClicks: 5,
    createdDate: '2023-04-05'
  },
  {
    id: 5,
    clientName: 'Epsilon Tech',
    clientType: 'CPA',
    status: 'inactive',
    budgetCap: 1200.00,
    spend: 0.00,
    reconSpend: 0.00,
    clicks: 0,
    validClicks: 0,
    invalidClicks: 0,
    createdDate: '2023-05-12'
  },
  {
    id: 6,
    clientName: 'Zeta Enterprises',
    clientType: 'CPC',
    status: 'inactive',
    budgetCap: 900.00,
    spend: 0.00,
    reconSpend: 0.00,
    clicks: 0,
    validClicks: 0,
    invalidClicks: 0,
    createdDate: '2023-06-18'
  },
  {
    id: 7,
    clientName: 'Eta Consulting',
    clientType: 'CPA',
    status: 'paused',
    budgetCap: 1800.00,
    spend: 950.60,
    reconSpend: 940.25,
    clicks: 280,
    validClicks: 275,
    invalidClicks: 5,
    createdDate: '2023-07-22'
  },
  {
    id: 8,
    clientName: 'Theta Labs',
    clientType: 'CPC',
    status: 'inactive',
    budgetCap: 1100.00,
    spend: 0.00,
    reconSpend: 0.00,
    clicks: 0,
    validClicks: 0,
    invalidClicks: 0,
    createdDate: '2023-08-30'
  },
  {
    id: 9,
    clientName: 'Iota Systems',
    clientType: 'CPA',
    status: 'paused',
    budgetCap: 1300.00,
    spend: 720.15,
    reconSpend: 715.40,
    clicks: 210,
    validClicks: 205,
    invalidClicks: 5,
    createdDate: '2023-09-14'
  }
];

const CustomDropdown = ({ title, options, onSelect, variant = "outline-secondary", value }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="dropdown position-relative">
      <button
        className={`btn btn-${variant} dropdown-toggle d-flex align-items-center gap-2`}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        style={{ fontSize: '14px', padding: '6px 12px' }}
      >
        {value || title}
      </button>
      {isOpen && (
        <div 
          className="dropdown-menu show position-absolute" 
          style={{ 
            minWidth: '200px', 
            zIndex: 1050,
            top: '100%',
            left: '0'
          }}
        >
          {options.map((option, index) => (
            <React.Fragment key={index}>
              {option.divider ? (
                <hr className="dropdown-divider" />
              ) : option.header ? (
                <h6 className="dropdown-header text-muted small">{option.header}</h6>
              ) : (
                <button
                  className="dropdown-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect && onSelect(option);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'active':
        return { color: 'success', icon: '●' };
      case 'inactive':
        return { color: 'danger', icon: '●' };
      case 'paused':
        return { color: 'secondary', icon: '●' };
      default:
        return { color: 'secondary', icon: '●' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`text-${config.color}`} style={{ fontSize: '18px' }}>
      {config.icon}
    </span>
  );
};

const ClientTypeBadge = ({ type }) => {
  const bgColor = type === 'CPA' ? '#e1c4fd' : '#c4d5fd';
  const textColor = type === 'CPA' ? '#6b46c1' : '#3b82f6';

  return (
    <span
      className="badge"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontSize: '12px',
        fontWeight: '500',
        padding: '4px 8px'
      }}
    >
      {type}
    </span>
  );
};

const CurrencyDisplay = ({ amount, currency = 'USD' }) => {
  const color = amount > 0 ? '#10b981' : '#6b7280';

  return (
    <span style={{ color, fontWeight: '500' }}>
      {amount.toFixed(2)}{currency.toLowerCase()}
    </span>
  );
};

const DateRangePicker = ({ value, onChange }) => {
  const [startDate, setStartDate] = useState('2000-01-01');
  const [endDate, setEndDate] = useState('2025-01-01');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.date-picker-container')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleApply = () => {
    const newRange = `${startDate} to ${endDate}`;
    onChange(newRange, { startDate, endDate });
    setIsOpen(false);
  };

  return (
    <div className="date-picker-container position-relative">
      <div className="input-group" style={{ width: '200px' }}>
        <input
          type="text"
          className="form-control form-control-sm"
          value={value}
          readOnly
          onClick={() => setIsOpen(!isOpen)}
          style={{ fontSize: '13px', cursor: 'pointer' }}
        />
        <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
          📅
        </span>
      </div>
      {isOpen && (
        <div 
          className="card position-absolute p-3 shadow-sm"
          style={{ 
            zIndex: 1050, 
            top: '100%', 
            left: '0',
            minWidth: '300px',
            marginTop: '2px'
          }}
        >
          <div className="mb-2">
            <label className="form-label small">Start Date:</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label small">End Date:</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={handleApply}>
              Apply
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ClientDataTable = ({
  data = sampleData,
  onRowSelect,
  customColumns = [],
  title = "Client Management"
}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [dateRange, setDateRange] = useState('2000-01-01 to 2025-01-01');
  const [dateFilter, setDateFilter] = useState({ startDate: '2000-01-01', endDate: '2025-01-01' });
  const [currency, setCurrency] = useState('USD - $');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [budgetCapFilter, setBudgetCapFilter] = useState('All Budget');
  const [marginFilter, setMarginFilter] = useState('All Margin');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const isDateInRange = (dateStr, startDate, endDate) => {
    const date = new Date(dateStr);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return date >= start && date <= end;
  };

  const filteredData = useMemo(() => {
    let filtered = [...data];

    if (searchText) {
      filtered = filtered.filter(item =>
        item.clientName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.clientType.toLowerCase().includes(searchText.toLowerCase()) ||
        item.status.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (dateFilter.startDate && dateFilter.endDate) {
      filtered = filtered.filter(item =>
        item.createdDate && isDateInRange(item.createdDate, dateFilter.startDate, dateFilter.endDate)
      );
    }

    if (statusFilter && statusFilter !== 'All Status') {
      filtered = filtered.filter(item =>
        item.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (budgetCapFilter && budgetCapFilter !== 'All Budget') {
      const budgetValue = parseInt(budgetCapFilter.replace(/[$,]/g, ''));
      filtered = filtered.filter(item => item.budgetCap <= budgetValue);
    }

    return filtered;
  }, [data, searchText, dateFilter, statusFilter, budgetCapFilter]);

  const actionOptions = [
    { label: 'Add Client' },
    { label: 'Add Client User' },
    { divider: true },
    { header: 'ACTIONS' },
    { label: 'Edit' },
    { label: 'Enable' },
    { label: 'Pause' },
    { label: 'Deactivate' },
    { label: 'Click Logs' },
    { label: 'Daily Stats' },
    { label: 'Inspect Feed' },
    { divider: true },
    { label: 'Pricing' },
    { label: 'Threshold' },
    { label: 'Budget Target' },
    { divider: true },
    { label: 'Mark Up' },
    { label: 'Mark Down' }
  ];

  const budgetCapOptions = [
    { label: 'All Budget' },
    { label: '$500' },
    { label: '$1000' },
    { label: '$1500' },
    { label: '$2000' },
    { label: '$5000' }
  ];

  const marginOptions = [
    { label: 'All Margin' },
    { label: '5%' },
    { label: '10%' },
    { label: '15%' },
    { label: '20%' },
    { label: '25%' }
  ];

  const statusOptions = [
    { label: 'All Status' },
    { label: 'Active' },
    { label: 'Inactive' },
    { label: 'Paused' }
  ];

  const currencyOptions = [
    { label: 'USD - $' },
    { label: 'EUR - €' },
    { label: 'GBP - £' }
  ];

  const columnsOptions = [
    { label: 'Client Name' },
    { label: 'Client Type' },
    { label: 'Status' },
    { label: 'Budget Cap' },
    { label: 'Advertiser Name' },
    { label: 'Spend' },
    { label: 'Recon Spend' },
    { label: 'Recon Net Spend' },
    { label: 'Clicks' },
    { label: 'Valid Clicks' },
    { label: 'Invalid Clicks' },
    { label: 'Bot Clicks' },
    { label: 'Latent Clicks' },
    { label: 'Duplicate Clicks' },
    { label: 'Foreign Clicks' },
    { label: 'Recon Clicks' },
    { label: 'Recon Valid Clicks' },
    { label: 'Recon Bot Clicks' },
    { label: 'Recon Invalid Clicks' }
  ];

  const columns = [
    {
      name: 'Client Name',
      selector: row => row.clientName,
      sortable: true,
      width: '140px'
    },
    {
      name: 'Client Type',
      selector: row => row.clientType,
      cell: row => <ClientTypeBadge type={row.clientType} />,
      width: '100px'
    },
    {
      name: 'Status',
      selector: row => row.status,
      cell: row => <StatusBadge status={row.status} />,
      width: '80px'
    },
    {
      name: 'Budget Cap',
      selector: row => row.budgetCap,
      cell: row => <CurrencyDisplay amount={row.budgetCap} />,
      sortable: true,
      width: '120px'
    },
    {
      name: 'Spend',
      selector: row => row.spend,
      cell: row => <CurrencyDisplay amount={row.spend} />,
      sortable: true,
      width: '100px'
    },
    {
      name: 'Recon Spend',
      selector: row => row.reconSpend,
      cell: row => <span style={{ color: '#6b7280' }}>{row.reconSpend.toFixed(2)}</span>,
      sortable: true,
      width: '140px'
    },
    {
      name: 'Clicks',
      selector: row => row.clicks,
      sortable: true,
      width: '100px'
    },
    {
      name: 'Valid Clicks',
      selector: row => row.validClicks,
      sortable: true,
      width: '120px'
    },
    {
      name: 'Invalid Clicks',
      selector: row => row.invalidClicks,
      sortable: true,
      width: '130px'
    },
    ...customColumns
  ];

  const customStyles = {
    header: {
      style: {
        minHeight: '56px',
        backgroundColor: '#f8f9fa'
      },
    },
    headRow: {
      style: {
        backgroundColor: '#f8f9fa',
        borderBottomWidth: '1px',
        borderBottomColor: '#dee2e6',
        borderBottomStyle: 'solid',
        minHeight: '52px'
      },
    },
    headCells: {
      style: {
        fontSize: '13px',
        fontWeight: '600',
        color: '#495057',
        paddingLeft: '12px',
        paddingRight: '12px',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
        paddingLeft: '12px',
        paddingRight: '12px',
        color: '#212529'
      },
    },
    rows: {
      style: {
        minHeight: '48px',
        '&:hover': {
          backgroundColor: '#f8f9fa',
        },
      },
      stripedStyle: {
        backgroundColor: '#f8f9fa',
      },
    },
  };

  const handleRowSelection = (state) => {
    setSelectedRows(state.selectedRows);
    onRowSelect && onRowSelect(state.selectedRows);
  };

  const handleDateRangeChange = (range, dates) => {
    setDateRange(range);
    setDateFilter(dates);
  };

  const clearAllFilters = () => {
    setSearchText('');
    setStatusFilter('All Status');
    setBudgetCapFilter('All Budget');
    setMarginFilter('All Margin');
    setDateRange('2000-01-01 to 2025-01-01');
    setDateFilter({ startDate: '2000-01-01', endDate: '2025-01-01' });
  };

  return (
    <div className="container-fluid px-3">
      <div className="row mb-3 align-items-center">
        <div className="col-lg-6 col-md-12 mb-2 mb-lg-0">
          <div className="d-flex gap-2 flex-wrap">
            <CustomDropdown
              title="Action"
              options={actionOptions}
              onSelect={(option) => console.log('Action selected:', option)}
            />
            <CustomDropdown
              title="Budget Cap"
              value={budgetCapFilter}
              options={budgetCapOptions}
              onSelect={(option) => setBudgetCapFilter(option.label)}
            />
            <CustomDropdown
              title="Margin"
              value={marginFilter}
              options={marginOptions}
              onSelect={(option) => setMarginFilter(option.label)}
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="d-flex justify-content-lg-end justify-content-start align-items-center">
            <div className="d-flex align-items-center gap-2">
              <span style={{ fontSize: '14px', color: '#6b7280', whiteSpace: 'nowrap' }}>Date Range:</span>
              <DateRangePicker
                value={dateRange}
                onChange={handleDateRangeChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3 align-items-center">
        <div className="col-lg-4 col-md-6 mb-2 mb-lg-0">
          <div className="d-flex align-items-center gap-3">
            <span className="text-muted" style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>
              {filteredData.length} Records Found
            </span>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search clients..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ fontSize: '14px' }}
              />
              <span className="input-group-text">🔍</span>
            </div>
          </div>
        </div>

        <div className="col-lg-8 col-md-6">
          <div className="d-flex gap-2 justify-content-lg-end justify-content-start flex-wrap align-items-center">
            <CustomDropdown
              title="Currency"
              value={currency}
              options={currencyOptions}
              onSelect={(option) => setCurrency(option.label)}
              variant="outline-secondary"
            />
            <CustomDropdown
              title="Status"
              value={statusFilter}
              options={statusOptions}
              onSelect={(option) => setStatusFilter(option.label)}
              variant="outline-secondary"
            />
            <CustomDropdown
              title="Columns"
              options={columnsOptions}
              onSelect={(option) => console.log('Column selected:', option)}
              variant="outline-secondary"
            />
            <button className="btn btn-primary btn-sm px-3 py-2">
              Apply Filters
            </button>
            <button className="btn btn-outline-secondary btn-sm" onClick={clearAllFilters}>
              Clear All
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-12">
          <div className="d-flex justify-content-end align-items-center gap-2">
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Rows per page:</span>
            <select
              className="form-select form-select-sm"
              style={{ width: 'auto' }}
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <DataTable
              columns={columns}
              data={filteredData}
              selectableRows
              onSelectedRowsChange={handleRowSelection}
              pagination
              paginationPerPage={rowsPerPage}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              customStyles={customStyles}
              striped
              responsive
              highlightOnHover
              noDataComponent={
                <div className="text-center py-4">
                  <p className="text-muted mb-0">No records found matching your criteria</p>
                  <small className="text-muted">Try adjusting your search or filters</small>
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* Selected Rows Info */}
      {selectedRows.length > 0 && (
        <div className="row mt-3">
          <div className="col-12">
            <div className="alert alert-info d-flex justify-content-between align-items-center">
              <span>
                <strong>{selectedRows.length}</strong> row(s) selected
              </span>
              <button 
                className="btn btn-sm btn-outline-primary"
                onClick={() => console.log('Selected rows:', selectedRows)}
              >
                View Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {(searchText || statusFilter !== 'All Status' || budgetCapFilter !== 'All Budget' || marginFilter !== 'All Margin') && (
        <div className="row mt-2">
          <div className="col-12">
            <div className="d-flex gap-2 flex-wrap align-items-center">
              <small className="text-muted">Active filters:</small>
              {searchText && (
                <span className="badge bg-primary">
                  Search: {searchText}
                  <button 
                    className="btn-close btn-close-white ms-1" 
                    style={{ fontSize: '10px' }}
                    onClick={() => setSearchText('')}
                  ></button>
                </span>
              )}
              {statusFilter !== 'All Status' && (
                <span className="badge bg-success">
                  Status: {statusFilter}
                  <button 
                    className="btn-close btn-close-white ms-1" 
                    style={{ fontSize: '10px' }}
                    onClick={() => setStatusFilter('All Status')}
                  ></button>
                </span>
              )}
              {budgetCapFilter !== 'All Budget' && (
                <span className="badge bg-info">
                  Budget: {budgetCapFilter}
                  <button 
                    className="btn-close btn-close-white ms-1" 
                    style={{ fontSize: '10px' }}
                    onClick={() => setBudgetCapFilter('All Budget')}
                  ></button>
                </span>
              )}
              {marginFilter !== 'All Margin' && (
                <span className="badge bg-warning">
                  Margin: {marginFilter}
                  <button 
                    className="btn-close btn-close-white ms-1" 
                    style={{ fontSize: '10px' }}
                    onClick={() => setMarginFilter('All Margin')}
                  ></button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDataTable;