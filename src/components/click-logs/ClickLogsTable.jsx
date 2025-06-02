import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DynamicTable from '../tables/datatable';
import { DocumentDownload } from 'iconsax-react';

const ClickLogsTable = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);

    const clicksData = [
        { id: 1, clickId: '66ff6ffgfg65556fg', ipAddress: '75.258.258.24', publisherName: 'ATTB US CPA', jobGroupName: '+12 CPA', source: 'XML', redirectUrl: 'www.redirecturl.com' },
        { id: 2, clickId: '66ff6ffgfg65556fg', ipAddress: '75.258.258.24', publisherName: 'ATTB US CPA', jobGroupName: '+12 CPA', source: 'XML', redirectUrl: 'www.redirecturl.com' },
        { id: 3, clickId: '66ff6ffgfg65556fg', ipAddress: '75.258.258.24', publisherName: 'ATTB US CPA', jobGroupName: '+12 CPA', source: 'XML', redirectUrl: 'www.redirecturl.com' },
        { id: 4, clickId: '66ff6ffgfg65556fg', ipAddress: '75.258.258.24', publisherName: 'ATTB US CPA', jobGroupName: '+12 CPA', source: 'XML', redirectUrl: 'www.redirecturl.com' },
        { id: 5, clickId: '66ff6ffgfg65556fg', ipAddress: '75.258.258.24', publisherName: 'ATTB US CPA', jobGroupName: '+12 CPA', source: 'XML', redirectUrl: 'www.redirecturl.com' },
        { id: 6, clickId: '66ff6ffgfg65556fg', ipAddress: '75.258.258.24', publisherName: 'ATTB US CPA', jobGroupName: '+12 CPA', source: 'XML', redirectUrl: 'www.redirecturl.com' },
        { id: 7, clickId: '66ff6ffgfg65556fg', ipAddress: '75.258.258.24', publisherName: 'ATTB US CPA', jobGroupName: '+12 CPA', source: 'XML', redirectUrl: 'www.redirecturl.com' },
        { id: 8, clickId: '66ff6ffgfg65556fg', ipAddress: '75.258.258.24', publisherName: 'ATTB US CPA', jobGroupName: '+12 CPA', source: 'XML', redirectUrl: 'www.redirecturl.com' },
        { id: 9, clickId: '66ff6ffgfg65556fg', ipAddress: '75.258.258.24', publisherName: 'ATTB US CPA', jobGroupName: '+12 CPA', source: 'XML', redirectUrl: 'www.redirecturl.com' },
    ];

    const columns = [
        {
            id: 'clickId',
            label: 'Click ID',
            disablePadding: true
        },
        {
            id: 'ipAddress',
            label: 'IP Address',
            disablePadding: false
        },
        {
            id: 'publisherName',
            label: 'Publisher Name',
            disablePadding: false
        },
        {
            id: 'jobGroupName',
            label: 'Job Group Name',
            disablePadding: false
        },
        {
            id: 'source',
            label: 'Source',
            disablePadding: false
        },
        {
            id: 'redirectUrl',
            label: 'Redirect URL',
            type: 'link',
            disablePadding: false,
            getLinkProps: (url) => ({
                href: `https://${url}`,
                target: '_blank',
                rel: 'noopener noreferrer',
                style: { color: '#1976d2', textDecoration: 'underline' }
            })
        }
    ];

    const handleActionChange = (action) => {
        if (!action) return; // Ignore empty selection

        switch (action) {
            case 'edit':
                if (selected.length === 1) {
                    navigate(`/dashboard/clicks/edit`);
                } else if (selected.length === 0) {
                    toast.error('Please select a click record to edit');
                } else {
                    toast.error('Please select only one click record to edit');
                }
                break;
            case 'delete':
                if (selected.length === 0) {
                    toast.error('Please select click records to delete');
                } else {
                    // Handle delete logic
                    toast.success(`${selected.length} click record(s) will be deleted`);
                }
                break;
            case 'export':
                if (selected.length === 0) {
                    toast.error('Please select click records to export');
                } else {
                    // Handle export logic
                    toast.success(`${selected.length} click record(s) will be exported`);
                }
                break;
            default:
                break;
        }
    };

    const handleDownloadReport = () => {
        // Handle download report logic
        toast.success('Report download initiated');
    };

    const filterConfig = [
        {
            leftFilters: [
                {
                    type: 'recordCount'
                },
                {
                    type: 'search',
                    placeholder: 'Search...',
                    minWidth: 200
                }
            ],
            rightFilters: [
                {
                    type: 'dateRange',
                    label: 'Date Range',
                    placeholder: '01-01-2000 to 01-01-2020',
                    minWidth: 200
                },
                {
                    type: 'select',
                    key: 'columns',
                    placeholder: 'Columns',
                    minWidth: 100,
                    options: [
                        { value: 'all', label: 'Show All' },
                        { value: 'basic', label: 'Basic View' },
                        { value: 'detailed', label: 'Detailed View' }
                    ]
                },
                {
                    type: 'button',
                    label: 'Download Report',
                    icon: <DocumentDownload size="20" />,
                    variant: 'contained',
                    color: 'primary',
                    onClick: handleDownloadReport,
                    style: { backgroundColor: '#000', color: '#fff' }
                },
                {
                    type: 'select',
                    key: 'rowsPerPage',
                    placeholder: '10',
                    minWidth: 70,
                    options: [
                        { value: '10', label: '10' },
                        { value: '25', label: '25' },
                        { value: '50', label: '50' },
                        { value: '100', label: '100' }
                    ]
                }
            ]
        }
    ];

    const customFilter = (row, filters) => {
        // Publisher filter
        if (filters.publisher && row.publisherName !== filters.publisher) {
            return false;
        }

        // Job Group filter
        if (filters.jobGroup && row.jobGroupName !== filters.jobGroup) {
            return false;
        }

        // Source filter
        if (filters.source && row.source !== filters.source) {
            return false;
        }

        return true;
    };

    const handleRowSelect = (selectedIds) => {
        setSelected(selectedIds);
    };

    return (
        <DynamicTable
            data={clicksData}
            columns={columns}
            filterConfig={filterConfig}
            customFilter={customFilter}
            onRowSelect={handleRowSelect}
            searchEnabled={true}
            searchFields={['clickId', 'ipAddress', 'publisherName', 'jobGroupName', 'source', 'redirectUrl']}
            title="Click Tracking"
            onRowClick={(row) => navigate(`/dashboard/click-details/${row.clickId}`)}
            selectable={true}
            actionsEnabled={false}
        />
    );
};

export default ClickLogsTable;