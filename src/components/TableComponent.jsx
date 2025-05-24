import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const TableComponent = () => {
  // Table state
  const [perPage, setPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  
  // Dropdown visibility states
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showColumnsDropdown, setShowColumnsDropdown] = useState(false);
  const [showAddClientDropdown, setShowAddClientDropdown] = useState(false);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [showBudgetCapDropdown, setShowBudgetCapDropdown] = useState(false);
  
  // Sample data
  const data = Array(10).fill().map((_, i) => ({
    id: i + 1,
    clientName: 'Client Name',
    clientType: i % 2 === 0 ? 'CPA' : 'CPC',
    status: '1000.00USD',
    budgetCap: '0.00USD',
    spend: '0.00',
    reconSpend: '0',
    clicks: '0',
    validClicks: '0',
    invalidClicks: '0'
  }));

  // Columns configuration
  const allColumns = [
    { name: 'Client Name', selector: row => row.clientName, sortable: true },
    { name: 'Client Type', selector: row => row.clientType, sortable: true },
    { name: 'Status', selector: row => row.status, sortable: true },
    { name: 'Budget Cap', selector: row => row.budgetCap, sortable: true },
    { name: 'Spend', selector: row => row.spend, sortable: true },
    { name: 'Recon Spend', selector: row => row.reconSpend, sortable: true },
    { name: 'Clicks', selector: row => row.clicks, sortable: true },
    { name: 'Valid Clicks', selector: row => row.validClicks, sortable: true },
    { name: 'Invalid Clicks', selector: row => row.invalidClicks, sortable: true }
  ];

  const [columns, setColumns] = useState(allColumns);

  const toggleColumn = (columnName) => {
    if (columns.some(col => col.name === columnName)) {
      setColumns(columns.filter(col => col.name !== columnName));
    } else {
      const columnToAdd = allColumns.find(col => col.name === columnName);
      if (columnToAdd) setColumns([...columns, columnToAdd]);
    }
  };

  return (
    <div className="container-fluid p-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="m-0">Action</h1>
        <div>
          <h2 className="m-0 d-inline me-3">Budget Cap</h2>
          <h2 className="m-0 d-inline">Margin</h2>
        </div>
      </div>

      <hr className="my-3" />

      {/* Date Range */}
      <div className="mb-3">
        <h3>Date Range:</h3>
        <p>01-01-2000 to 01-01-2020</p>
      </div>

      <hr className="my-3" />

      {/* Toolbar */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div className="d-flex align-items-center mb-2 mb-md-0">
          <span className="me-3">73 Records Found</span>
          <input 
            type="text" 
            className="form-control me-3" 
            placeholder="Search..." 
            style={{ width: '150px' }}
          />
        </div>
        
        <div className="d-flex align-items-center flex-wrap">
          {/* Currency Dropdown */}
          <div className="dropdown me-2">
            <button 
              className="btn btn-light dropdown-toggle" 
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
            >
              USD - $ ▼
            </button>
            {showCurrencyDropdown && (
              <div className="dropdown-menu show">
                <button className="dropdown-item">USD - $</button>
                <button className="dropdown-item">EUR - €</button>
                <button className="dropdown-item">GBP - £</button>
              </div>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="dropdown me-2">
            <button 
              className="btn btn-light dropdown-toggle" 
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            >
              Status ▼
            </button>
            {showStatusDropdown && (
              <div className="dropdown-menu show">
                <button className="dropdown-item">Active</button>
                <button className="dropdown-item">Paused</button>
                <button className="dropdown-item">Inactive</button>
              </div>
            )}
          </div>

          {/* Columns Dropdown */}
          <div className="dropdown me-2">
            <button 
              className="btn btn-light dropdown-toggle" 
              onClick={() => setShowColumnsDropdown(!showColumnsDropdown)}
            >
              Columns ▼
            </button>
            {showColumnsDropdown && (
              <div className="dropdown-menu show p-3" style={{ width: '250px' }}>
                {allColumns.map((column, index) => (
                  <div key={index} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={columns.some(c => c.name === column.name)}
                      onChange={() => toggleColumn(column.name)}
                      id={`col-${index}`}
                    />
                    <label className="form-check-label" htmlFor={`col-${index}`}>
                      {column.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="btn btn-primary me-3">Apply Filters</button>

          {/* Rows per page dropdown */}
          <div className="d-flex align-items-center">
            <span className="me-2">Rows per page:</span>
            <select 
              className="form-select" 
              style={{ width: '70px' }}
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationPerPage={perPage}
        selectableRows
        onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows)}
        highlightOnHover
        className="border"
      />

      {/* Action Dropdowns (shown when rows are selected) */}
      {selectedRows.length > 0 && (
        <div className="mt-3 d-flex flex-wrap gap-2">
          {/* Add Client Dropdown */}
          <div className="dropdown">
            <button 
              className="btn btn-secondary dropdown-toggle" 
              onClick={() => setShowAddClientDropdown(!showAddClientDropdown)}
            >
              Add Client
            </button>
            {showAddClientDropdown && (
              <div className="dropdown-menu show">
                <button className="dropdown-item">Add Client</button>
                <button className="dropdown-item">Add Client User</button>
              </div>
            )}
          </div>

          {/* Actions Dropdown */}
          <div className="dropdown">
            <button 
              className="btn btn-secondary dropdown-toggle" 
              onClick={() => setShowActionsDropdown(!showActionsDropdown)}
            >
              Actions
            </button>
            {showActionsDropdown && (
              <div className="dropdown-menu show">
                <button className="dropdown-item">Edit</button>
                <button className="dropdown-item">Enable</button>
                <button className="dropdown-item">Pause</button>
                <button className="dropdown-item">Deactivate</button>
                <button className="dropdown-item">Click Logs</button>
                <button className="dropdown-item">Daily Stats</button>
                <button className="dropdown-item">Inspect Feed</button>
              </div>
            )}
          </div>

          {/* Budget Cap Dropdown */}
          <div className="dropdown">
            <button 
              className="btn btn-secondary dropdown-toggle" 
              onClick={() => setShowBudgetCapDropdown(!showBudgetCapDropdown)}
            >
              Budget Cap
            </button>
            {showBudgetCapDropdown && (
              <div className="dropdown-menu show">
                <button className="dropdown-item">Pacing</button>
                <button className="dropdown-item">Threshold</button>
                <button className="dropdown-item">Budget Target</button>
              </div>
            )}
          </div>

          {/* Management Engagement Dropdown */}
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle">
              Management Engagement
            </button>
            <div className="dropdown-menu">
              <button className="dropdown-item">Mark Up</button>
              <button className="dropdown-item">Mark Down</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponent;