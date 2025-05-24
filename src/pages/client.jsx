// src/components/ClientUsersTable.jsx
import React, { useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Edit, Lock, Unlock, Trash2, Plus, Search, Users, User } from 'feather-icons-react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import { Link } from 'react-router-dom';

const sampleUsers = [
    {
        id: 1,
        name: 'Marco Faloppa',
        email: 'marco.faloppa@example.com',
        clients: 'JobRapido – US (CPA)',
        status: 'active'
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        clients: 'TechCorp – UK (CPL)',
        status: 'active'
    },
    {
        id: 3,
        name: 'Alex Chen',
        email: 'alex.chen@example.com',
        clients: 'GlobalAds – US (CPA)',
        status: 'locked'
    },
    {
        id: 4,
        name: 'Emma Wilson',
        email: 'emma.w@example.com',
        clients: 'JobRapido – UK (CPL), TechCorp – US (CPA)',
        status: 'active'
    },
    {
        id: 5,
        name: 'James Brown',
        email: 'james.b@example.com',
        clients: 'GlobalAds – UK (CPL)',
        status: 'active'
    },
    {
        id: 6,
        name: 'Lisa Wong',
        email: 'lisa.wong@example.com',
        clients: 'JobRapido – US (CPA), TechCorp – UK (CPL)',
        status: 'locked'
    },
    {
        id: 7,
        name: 'David Kim',
        email: 'david.kim@example.com',
        clients: 'GlobalAds – US (CPA)',
        status: 'active'
    },
    {
        id: 8,
        name: 'Olivia Smith',
        email: 'olivia.s@example.com',
        clients: 'JobRapido – UK (CPL)',
        status: 'active'
    },
    {
        id: 9,
        name: 'Michael Taylor',
        email: 'michael.t@example.com',
        clients: 'TechCorp – US (CPA)',
        status: 'active'
    }
];

const ClientBadge = ({ clients }) => {
    const clientList = clients.split(/,\s*/);
    return (
        <div className="d-flex flex-wrap gap-2">
            {clientList.map((client, index) => (
                <span
                    key={index}
                    className="badge rounded-pill bg-light text-dark"
                    style={{ fontSize: '12px', padding: '4px 8px' }}
                >
                    {client}
                </span>
            ))}
        </div>
    );
};

const StatusIndicator = ({ status }) => {
    const statusConfig = {
        active: { color: 'success', icon: <User size={14} className="me-1" /> },
        locked: { color: 'secondary', icon: <Lock size={14} className="me-1" /> }
    };
    const config = statusConfig[status] || statusConfig.active;

    return (
        <span className={`badge bg-${config.color}-subtle text-${config.color}`}>
            {config.icon}
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

const ClientUsersTable = () => {
    const [data, setData] = useState(sampleUsers);
    const [selectedRows, setSelectedRows] = useState([]);
    const [filterText, setFilterText] = useState('');

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.email.toLowerCase().includes(filterText.toLowerCase()) ||
        item.clients.toLowerCase().includes(filterText.toLowerCase())
    );

    const columns = useMemo(() => [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            minWidth: '80px',
            cell: row => (
                <div className="d-flex align-items-center gap-2">
                    {/* <StatusIndicator status={row.status} /> */}
                    {row.name}
                </div>
            )
        },
        {
            name: 'Email',
            selector: row => row.email,
            minWidth: '80px',
            cell: row => (
                <a href={`mailto:${row.email}`} className="text-decoration-none">
                    {row.email}
                </a>
            )
        },
        {
            name: 'Clients',
            selector: row => row.clients,
            cell: row => <ClientBadge clients={row.clients} />,
            minWidth: '150px'
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        title="Edit"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        className={`btn btn-sm ${row.status === 'active' ? 'btn-outline-secondary' : 'btn-outline-success'}`}
                        title={row.status === 'active' ? 'Lock' : 'Unlock'}
                        onClick={() => toggleLock(row.id)}
                    >
                        {row.status === 'active' ? <Lock size={16} /> : <Unlock size={16} />}
                    </button>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        title="Delete"
                        onClick={() => handleDelete(row.id)}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            minWidth: '100px'
        }
    ], []);

    // Custom styles for the DataTable
    const customStyles = {
        headRow: {
            style: {
                backgroundColor: '#f8f9fa',
                borderBottom: '1px solid #dee2e6',
                minHeight: '52px',
            }
        },
        headCells: {
            style: {
                fontSize: '14px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
            }
        },
        rows: {
            style: {
                minHeight: '56px',
                '&:hover': {
                    backgroundColor: '#f8f9fa'
                }
            },
            stripedStyle: {
                backgroundColor: '#fafafa'
            }
        },
        cells: {
            style: {
                fontSize: '14px',
                paddingTop: '12px',
                paddingBottom: '12px'
            }
        }
    };

    const handleRowSelected = state => {
        setSelectedRows(state.selectedRows);
    };

    const toggleLock = (id) => {
        setData(data.map(user =>
            user.id === id
                ? { ...user, status: user.status === 'active' ? 'locked' : 'active' }
                : user
        ));
    };

    const lockAll = () => {
        const updatedData = data.map(user =>
            selectedRows.some(row => row.id === user.id)
                ? { ...user, status: 'locked' }
                : user
        );
        setData(updatedData);
        setSelectedRows([]);
    };

    const unlockAll = () => {
        const updatedData = data.map(user =>
            selectedRows.some(row => row.id === user.id)
                ? { ...user, status: 'active' }
                : user
        );
        setData(updatedData);
        setSelectedRows([]);
    };

    const handleDelete = (id) => {
        setData(data.filter(user => user.id !== id));
    };

    const deleteAll = () => {
        const idsToDelete = selectedRows.map(row => row.id);
        setData(data.filter(user => !idsToDelete.includes(user.id)));
        setSelectedRows([]);
    };

    const addNewUser = () => {
        const newId = data.length > 0 ? Math.max(...data.map(user => user.id)) + 1 : 1;
        setData([...data, {
            id: newId,
            name: 'New User',
            email: `new.user${newId}@example.com`,
            clients: 'New Client',
            status: 'active'
        }]);
    };

    return (
        <>
            <PageHeader >
                {/* <PageHeaderDate /> */}

                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                    <Link className="btn btn-md btn-light-brand" style={{ paddingTop: "12px", paddingBottom: "12px" }} data-bs-toggle="dropdown" data-bs-offset="0, 10" data-bs-auto-close="outside">
                        <span>Job Stats</span>
                    </Link>

                    <Link className="btn btn-md btn-light-brand" style={{ paddingTop: "12px", paddingBottom: "12px" }} data-bs-toggle="dropdown" data-bs-offset="0, 10" data-bs-auto-close="outside">
                        <span>Conversion Tracking</span>
                    </Link>

                    <Link className="btn btn-md btn-light-brand" style={{ paddingTop: "12px", paddingBottom: "12px" }} data-bs-toggle="dropdown" data-bs-offset="0, 10" data-bs-auto-close="outside">
                        <span>Publisher Management</span>
                    </Link>
                </div>
            </PageHeader>
            <div className="container-fluid px-3 py-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="input-group" style={{ maxWidth: '300px' }}>
                        <span className="input-group-text">
                            <Search size={18} />
                        </span>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Search users..."
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)}
                        />
                    </div>

                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                            onClick={addNewUser}
                        >
                            <Plus size={16} />
                            Add Client User
                        </button>
                        {selectedRows.length > 0 && (
                            <>
                                <button
                                    className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                                    onClick={lockAll}
                                >
                                    <Lock size={16} />
                                    Lock All
                                </button>
                                <button
                                    className="btn btn-outline-success btn-sm d-flex align-items-center gap-1"
                                    onClick={unlockAll}
                                >
                                    <Unlock size={16} />
                                    Unlock All
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                                    onClick={deleteAll}
                                >
                                    <Trash2 size={16} />
                                    Delete All
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* DataTable */}
                <DataTable
                    columns={columns}
                    data={filteredData}
                    selectableRows
                    onSelectedRowsChange={handleRowSelected}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 25, 50]}
                    customStyles={customStyles}
                    striped
                    highlightOnHover
                    noHeader
                    responsive
                    selectableRowsHighlight
                    noDataComponent={
                        <div className="text-center py-4">
                            <Users size={48} className="text-muted mb-2" />
                            <p className="text-muted mb-0">No users found.</p>
                        </div>
                    }
                />
            </div>
        </>
    );
};

export default ClientUsersTable;