import React, { useState } from 'react'

import {
    Box,
    Paper,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

function JobData() {
    const [activeTab, setActiveTab] = useState('jobData');
    const [feedDetails, setFeedDetails] = useState({
        jobs: [
            {
                id: 'Job Data 1',
                fields: {
                    '/source': 'JobStreet',
                    '/job_id': '361739158034579456386B0',
                    '/title': 'Interior Designer (Hospitality and F&B)',
                    '/company': 'Gough Recruitment (Hong Kong) Pty Limited',
                    '/city': 'Singapore',
                    '/state': 'Central',
                    '/country': 'SG',
                    '/zip_code': '068806',
                    '/description': 'We are seeking an experienced Interior Designer...',
                    '/apply_url': 'https://open.opp.jobstreet.com/sg/361739158034579456386B0',
                    '/posted_date': '2025-03-29',
                    '/modified_date': '2025-03-29',
                    '/job_type': 'Full Time',
                    '/category': 'Design',
                    '/cpc_bid': '0.50',
                    '/cpa_bid': '15.00'
                }
            },
            {
                id: 'Job Data 2',
                fields: {
                    '/source': 'JobStreet',
                    '/job_id': '361739158034579456386B1',
                    '/title': 'Software Engineer',
                    '/company': 'Tech Solutions Pte Ltd',
                    '/city': 'Singapore',
                    '/state': 'Raffles Place',
                    '/country': 'SG',
                    '/zip_code': '048623',
                    '/description': 'Join our dynamic team as a Software Engineer...',
                    '/apply_url': 'https://open.opp.jobstreet.com/sg/361739158034579456386B1',
                    '/posted_date': '2025-03-28',
                    '/modified_date': '2025-03-28',
                    '/job_type': 'Full Time',
                    '/category': 'Information Technology',
                    '/cpc_bid': '0.75',
                    '/cpa_bid': '25.00'
                }
            }
        ]
    });

    return (
        <>
            <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', borderBottom: '1px solid #eee', mb: 2 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            p: 1,
                            borderBottom: activeTab === 'jobData' ? '2px solid #000' : 'none',
                            fontWeight: 600,
                            mr: 3,
                            cursor: 'pointer',
                            color: activeTab === 'jobData' ? '#000' : '#999',
                            '&:hover': {
                                color: '#000'
                            }
                        }}
                        onClick={() => setActiveTab('jobData')}
                    >
                        Job data
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            p: 1,
                            borderBottom: activeTab === 'jobFeedExtract' ? '2px solid #000' : 'none',
                            fontWeight: 600,
                            cursor: 'pointer',
                            color: activeTab === 'jobFeedExtract' ? '#000' : '#999',
                            '&:hover': {
                                color: '#000'
                            }
                        }}
                        onClick={() => setActiveTab('jobFeedExtract')}
                    >
                        Job feed extract
                    </Typography>
                </Box>

                {/* Tab Content */}
                {activeTab === 'jobData' && (
                    <Box>
                        <TableContainer sx={{ maxHeight: 400 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>Jobs</TableCell>
                                        <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>Job fields</TableCell>
                                        <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {feedDetails?.jobs && feedDetails.jobs.length > 0 ? (
                                        feedDetails.jobs.map((job, jobIndex) => (
                                            Object.entries(job.fields).map(([field, value], fieldIndex) => (
                                                <TableRow key={`${jobIndex}-${fieldIndex}`}>
                                                    <TableCell sx={{ backgroundColor: '#f9f9f9', fontWeight: 500 }}>
                                                        {fieldIndex === 0 ? job.id : ''}
                                                    </TableCell>
                                                    <TableCell>{field}</TableCell>
                                                    <TableCell sx={{ maxWidth: 300, wordBreak: 'break-word' }}>
                                                        {value}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} sx={{ textAlign: 'center', py: 4 }}>
                                                <Typography variant="body2" color="textSecondary">
                                                    No job data available. Please check the feed URL or try refreshing.
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}

                {activeTab === 'jobFeedExtract' && (
                    <Box>
                        {/* Raw XML Display */}
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                                Raw XML Feed
                            </Typography>
                            <Box sx={{
                                backgroundColor: '#f8f9fa',
                                p: 2,
                                borderRadius: 1,
                                maxHeight: 500,
                                overflowY: 'auto',
                                border: '1px solid #e0e0e0',
                                fontFamily: 'monospace',
                                fontSize: '0.875rem',
                                lineHeight: 1.6
                            }}>
                                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                    {feedDetails?.rawXml || `<?xml version="1.0" encoding="UTF-8"?>
            <source>
              <publisher>Example Job Board</publisher>
              <publisherurl>https://example.com</publisherurl>
              <lastBuildDate>2024-01-15T10:30:00Z</lastBuildDate>
              <job>
                <title>Software Engineer</title>
                <date>2024-01-15</date>
                <referencenumber>JOB001</referencenumber>
                <url>https://example.com/jobs/software-engineer</url>
                <company>Tech Corp</company>
                <city>San Francisco</city>
                <state>California</state>
                <country>US</country>
                <postalcode>94105</postalcode>
                <description><![CDATA[We are looking for a talented Software Engineer...]]></description>
                <salary>120000</salary>
                <education>Bachelor's Degree</education>
                <jobtype>Full Time</jobtype>
                <category>Technology</category>
                <experience>3-5 years</experience>
              </job>
              <job>
                <title>Marketing Manager</title>
                <date>2024-01-14</date>
                <referencenumber>JOB002</referencenumber>
                <url>https://example.com/jobs/marketing-manager</url>
                <company>Marketing Solutions</company>
                <city>New York</city>
                <state>New York</state>
                <country>US</country>
                <postalcode>10001</postalcode>
                <description><![CDATA[Join our dynamic marketing team...]]></description>
                <salary>95000</salary>
                <education>Bachelor's Degree</education>
                <jobtype>Full Time</jobtype>
                <category>Marketing</category>
                <experience>5+ years</experience>
              </job>
            </source>`}
                                </pre>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    )
}

export default JobData