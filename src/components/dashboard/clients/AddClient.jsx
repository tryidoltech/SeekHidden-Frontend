import React, { useEffect, useState, useRef } from 'react';
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
  Chip,
  Alert,
  CircularProgress,
  Divider,
  Dialog, // Add this
  DialogTitle, // Add this
  DialogContent, // Add this
  DialogActions, // Add this
  Link
} from '@mui/material';
import { ArrowLeft, Eye, Download, RotateCcw, Link2, Plus, Save, X, Edit, MapPin, Trash2, Search, ExternalLink } from 'lucide-react';
import { toast } from 'react-toastify'; // Add this import
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddClient = () => {
  // State for form fields
  const [clientName, setClientName] = useState('');
  const [advertiserName, setAdvertiserName] = useState('');
  const [exportedName, setExportedName] = useState('');
  const [currency, setCurrency] = useState('');
  const [country, setCountry] = useState('');
  const [industry, setIndustry] = useState('');
  const [marginMode, setMarginMode] = useState('');
  const [markupType, setMarkupType] = useState('percentage');
  const [markdownType, setMarkdownType] = useState('percentage');

  // Settings section
  const [budget, setBudget] = useState('');
  const [markType, setMarkType] = useState('');
  const [markup, setMarkup] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [frequency, setFrequency] = useState('');
  const [customFrequency, setCustomFrequency] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [clientType, setClientType] = useState('');
  const [showDashboards, setShowDashboards] = useState('');
  const [clickFilters, setClickFilters] = useState('');
  const [clickFilterRedirectUrl, setClickFilterRedirectUrl] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [spendTypeCpa, setSpendTypeCpa] = useState('');

  // Feed URL and mapping states
  const [feedUrl, setFeedUrl] = useState('');
  const [isLoadingFeed, setIsLoadingFeed] = useState(false);
  const [feedData, setFeedData] = useState(null);
  const [feedError, setFeedError] = useState('');
  const [showFeedModal, setShowFeedModal] = useState(false);
  const [showInspectFeedModal, setShowInspectFeedModal] = useState(false);
  const [feedDetails, setFeedDetails] = useState(null);
  const [mappings, setMappings] = useState({
    Source: '',
    Jobs: '',
    Job: '',
    Company: '',
    Title: '',
    City: '',
    State: '',
    Country: '',
    Zip: '',
    Description: '',
    URL: '',
    Category: '',
    'JobId/Ref Number': '',
    'Published Date': '',
    'Modified Date': '',
    JobType: '',
    'CPC Bid': '',
    'CPA Bid': ''
  });

  // New state variables
  const [isAddingField, setIsAddingField] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');
  const [editingField, setEditingField] = useState(null);
  const [editingFieldName, setEditingFieldName] = useState('');

  // Add these state variables with your existing state declarations
  const [feeds, setFeeds] = useState([]);
  const [showAddFeedDialog, setShowAddFeedDialog] = useState(false);
  const [newFeedUrl, setNewFeedUrl] = useState('');
  const [isLoadingNewFeed, setIsLoadingNewFeed] = useState(false);
  const [newFeedError, setNewFeedError] = useState('');

  // Add state for header feed URL input
  const [headerFeedUrl, setHeaderFeedUrl] = useState('');

  // Add state for showing inline add feed section
  const [showAddFeedSection, setShowAddFeedSection] = useState(false);
  const [addFeedUrl, setAddFeedUrl] = useState('');
  const [isLoadingAddFeed, setIsLoadingAddFeed] = useState(false);
  const [newFeedData, setNewFeedData] = useState(null);
  const [newFeedMappings, setNewFeedMappings] = useState(() => {
    const defaultMappings = {};
    const fields = [
      'Source',
      'Jobs',
      'Job',
      'Company',
      'Title',
      'City',
      'State',
      'Country',
      'Zip',
      'Description',
      'URL',
      'Category',
      'JobId/Ref Number',
      'Published Date',
      'Modified Date',
      'JobType',
      'CPC Bid',
      'CPA Bid'
    ];
    fields.forEach((field) => {
      defaultMappings[field] = '';
    });
    return defaultMappings;
  });

  // State for default feed URL input
  const [defaultFeedUrl, setDefaultFeedUrl] = useState('');
  const [defaultFeedData, setDefaultFeedData] = useState(null);
  const [isLoadingDefaultFeed, setIsLoadingDefaultFeed] = useState(false);

  // Add this new state for tab functionality
  const [activeTab, setActiveTab] = useState('jobData');

  // Mock feed data structure for demonstration
  const [unmappedNodes] = useState([
    'Source',
    'Jobs',
    'Job',
    'Company',
    'Title',
    'City',
    'State',
    'Country',
    'Zip',
    'Description',
    'URL',
    'Category',
    'JobId/Ref Number',
    'Published Date',
    'Modified Date',
    'JobType',
    'CPC Bid',
    'CPA Bid'
  ]);

  // Available feed nodes (would come from parsed XML)
  const [availableNodes, setAvailableNodes] = useState([]);

  // Add a new state to track default fields
  const [defaultFields] = useState([
    'Source',
    'Jobs',
    'Job',
    'Company',
    'Title',
    'City',
    'State',
    'Country',
    'Zip',
    'Description',
    'URL',
    'Category',
    'JobId/Ref Number',
    'Published Date',
    'Modified Date',
    'JobType',
    'CPC Bid',
    'CPA Bid'
  ]);

  // Helper function to create default mappings object
  const createDefaultMappings = () => {
    return defaultFields.reduce((acc, field) => {
      acc[field] = '';
      return acc;
    }, {});
  };

  // Ref for add feed input auto-focus
  const addFeedInputRef = useRef(null);

  // Ref for custom frequency input auto-focus
  const customFrequencyInputRef = useRef(null);

  const handleBack = () => {
    window.history.back();
  };

  // Auto-extract feed data when URL changes
  useEffect(() => {
    if (feedUrl && feedUrl.trim()) {
      const timeoutId = setTimeout(() => {
        extractFeedData();
      }, 1000); // Debounce for 1 second

      return () => clearTimeout(timeoutId);
    } else {
      setFeedData(null);
      setAvailableNodes([]);
    }
  }, [feedUrl]);

  // Auto-focus add feed input when section is shown
  useEffect(() => {
    if (showAddFeedSection && addFeedInputRef.current) {
      setTimeout(() => {
        addFeedInputRef.current.focus();
      }, 100); // Small delay to ensure the input is rendered
    }
  }, [showAddFeedSection]);

  // Auto-focus custom frequency input when frequency is set to 'custom'
  useEffect(() => {
    if (frequency === 'custom' && customFrequencyInputRef.current) {
      setTimeout(() => {
        customFrequencyInputRef.current.focus();
      }, 100); // Small delay to ensure the input is rendered
    }
  }, [frequency]);

  const extractFeedData = async () => {
    if (!feedUrl.trim()) {
      setFeedError('Please enter a valid feed URL');
      return;
    }

    setIsLoadingFeed(true);
    setFeedError('');

    try {
      // Simulate API call to extract feed data
      // In real implementation, this would call your backend service
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock extracted data with realistic feed nodes
      const mockFeedData = {
        totalJobs: 1247,
        lastUpdated: new Date().toISOString(),
        feedType: 'XML',
        encoding: 'UTF-8',
        nodes: [
          'job_id',
          'title',
          'description',
          'company',
          'location',
          'salary',
          'job_type',
          'posted_date',
          'expiry_date',
          'apply_url',
          'category',
          'requirements',
          'benefits',
          'experience_level',
          'city',
          'state',
          'country',
          'zip_code',
          'source',
          'modified_date',
          'cpc_bid',
          'cpa_bid',
          'publisher',
          'job_reference'
        ]
      };

      setFeedData(mockFeedData);
      setAvailableNodes(mockFeedData.nodes);

      // Update mock detailed feed data for modal with more realistic structure
      setFeedDetails({
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
    } catch (error) {
      setFeedError('Failed to extract feed data. Please check the URL and try again.');
    } finally {
      setIsLoadingFeed(false);
    }
  };

  // Add these missing functions after your other handler functions

  // Function to handle mapping fields
  const handleMapFields = () => {
    const mappedFields = Object.entries(mappings).filter(([key, value]) => value.trim() !== '');

    if (mappedFields.length === 0) {
      alert('Please map at least one field before proceeding.');
      return;
    }

    console.log('Mappings saved:', mappings);
    // Here you would typically send the mappings to your backend
    alert(`Successfully mapped ${mappedFields.length} field(s)!`);
  };

  // Function to reset all mappings
  const handleResetMappings = () => {
    const resetMappings = Object.keys(mappings).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});

    setMappings(resetMappings);
    console.log('Mappings reset');
  };

  // Function to handle viewing feed details
  const handleViewFeedDetails = () => {
    if (feedData) {
      setShowFeedModal(true);
    }
  };

  const handleMappingChange = (field, value) => {
    setMappings((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem('accessToken');

    // Convert mappings (object) → feed_node_mapping (array)
    const feed_node_mapping = Object.entries(mappings).reduce((acc, [internalField, clientNode]) => {
      if (clientNode?.trim()) {
        acc.push({
          client_node: clientNode,
          internal_field: internalField,
          sample_value: '' // optionally fill or ignore if backend handles it
        });
      }
      return acc;
    }, []);

    const payload = {
      internal_name: clientName,
      external_name: exportedName,
      advertiser_name: advertiserName,
      currency: currency,
      budget: {
        threshold: Number(budget)
      },
      start_date: startDate,
      end_date: endDate,
      timezone: timeZone,
      feed_refresh_frequency: frequency,
      bid_margin: {
        markup: {
          type: markupType === 'percentage' ? '%' : '$',
          value: Number(markup)
        },
        markdown: {
          type: markdownType === 'percentage' ? '%' : '$', // or "$"
          value: Number(markdown)
        }
      },
      feed_source_url: feedUrl, // or defaultFeedUrl if that's the main one
      feed_bid_type: clientType, // like "CPA"
      industry: industry,
      country: country,
      show_dashboard: showDashboards === 'Yes',
      feed_node_mapping: feed_node_mapping
    };

    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/clients`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('Success:', response.data);
      })
      .catch((error) => {
        console.error('Error submitting data:', error?.response?.data || error.message);
      });
  };

  // New functions for adding fields and mapping
  const handleAddField = () => {
    setIsAddingField(true);
    setNewFieldName('');
  };

  // New function to confirm adding field
  const handleConfirmAddField = () => {
    if (newFieldName.trim() && !mappings.hasOwnProperty(newFieldName.trim())) {
      setMappings((prev) => ({
        ...prev,
        [newFieldName.trim()]: ''
      }));
      setNewFieldName('');
      setIsAddingField(false);
    }
  };

  // New function to cancel adding field
  const handleCancelAddField = () => {
    setNewFieldName('');
    setIsAddingField(false);
  };

  const handleEditField = (fieldName) => {
    setEditingField(fieldName);
    setEditingFieldName(fieldName);
  };

  // New function to confirm editing field
  const handleConfirmEditField = () => {
    if (editingFieldName.trim() && editingFieldName.trim() !== editingField) {
      // Check if new name already exists
      if (mappings.hasOwnProperty(editingFieldName.trim())) {
        return; // Don't allow duplicate names
      }

      // Create new mappings with updated field name
      const newMappings = {};
      Object.keys(mappings).forEach((key) => {
        if (key === editingField) {
          newMappings[editingFieldName.trim()] = mappings[key];
        } else {
          newMappings[key] = mappings[key];
        }
      });

      setMappings(newMappings);
    }

    setEditingField(null);
    setEditingFieldName('');
  };

  // New function to cancel editing field
  const handleCancelEditField = () => {
    setEditingField(null);
    setEditingFieldName('');
  };

  // New function to delete field
  const handleDeleteField = (fieldName) => {
    // Prevent deleting default fields
    if (defaultFields.includes(fieldName)) {
      alert('Cannot delete default fields');
      return;
    }

    const newMappings = { ...mappings };
    delete newMappings[fieldName];
    setMappings(newMappings);
  };

  // Modify the Add Feed button click handler
  const handleAddFeed = () => {
    setShowAddFeedSection(true);
    setAddFeedUrl('');
  };

  // Function to add a new feed from header input
  const handleHeaderFeedUrlKeyPress = async (event) => {
    if (event.key === 'Enter') {
      if (!headerFeedUrl.trim()) {
        toast.error('Please enter a valid feed URL');
        return;
      }

      // Check if URL already exists in feeds array or main feedUrl
      const urlExists = feeds.some((feed) => feed.url === headerFeedUrl.trim()) || feedUrl.trim() === headerFeedUrl.trim();

      if (urlExists) {
        toast.error('This feed URL already exists');
        return;
      }

      toast.info('Adding new feed...');

      try {
        // Simulate API call to extract feed data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock extracted data for new feed
        const mockNewFeedData = {
          id: Date.now(),
          url: headerFeedUrl.trim(),
          totalJobs: Math.floor(Math.random() * 2000) + 500,
          lastUpdated: new Date().toISOString(),
          feedType: 'XML',
          encoding: 'UTF-8',
          nodes: [
            'job_id',
            'title',
            'description',
            'company',
            'location',
            'salary',
            'job_type',
            'posted_date',
            'expiry_date',
            'apply_url',
            'category',
            'requirements',
            'benefits',
            'experience_level',
            'city',
            'state',
            'country',
            'zip_code',
            'source',
            'modified_date',
            'cpc_bid',
            'cpa_bid',
            'publisher',
            'job_reference',
            'contact_email'
          ],
          mappings: createDefaultMappings()
        };

        // Add to feeds array
        setFeeds((prev) => [...prev, mockNewFeedData]);
        setHeaderFeedUrl(''); // Clear the input
        toast.success(`New feed added successfully! Found ${mockNewFeedData.totalJobs} jobs`);
      } catch (error) {
        toast.error('Failed to extract feed data. Please check the URL and try again.');
      }
    }
  };

  // Function to remove a feed
  const handleRemoveFeed = (feedId) => {
    setFeeds((prev) => prev.filter((feed) => feed.id !== feedId));
  };

  // Function to handle mapping changes for additional feeds
  const handleAdditionalFeedMappingChange = (feedId, field, value) => {
    setFeeds((prev) =>
      prev.map((feed) =>
        feed.id === feedId
          ? {
              ...feed,
              mappings: {
                ...feed.mappings,
                [field]: value
              }
            }
          : feed
      )
    );
  };

  // Function to add field to specific feed
  const handleAddFieldToFeed = (feedId, fieldName) => {
    setFeeds((prev) =>
      prev.map((feed) =>
        feed.id === feedId
          ? {
              ...feed,
              mappings: {
                ...feed.mappings,
                [fieldName]: ''
              }
            }
          : feed
      )
    );
  };

  const navigate = useNavigate();

  // --- add to your useState declarations ---
  const [editingFeedId, setEditingFeedId] = useState(null);
  const [editingFeedUrl, setEditingFeedUrl] = useState('');

  // when “Edit Feed” is clicked
  const handleEditFeed = (feedId) => {
    const toEdit = feeds.find((f) => f.id === feedId);
    if (!toEdit) return;

    setEditingFeedId(feedId);
    setEditingFeedUrl(toEdit.url);
  };

  // when “Save” is clicked
  const handleSaveFeedUrl = (feedId) => {
    // Check if URL already exists in other feeds or main feedUrl (excluding current feed being edited)
    const urlExists =
      feeds.some((feed) => feed.id !== feedId && feed.url === editingFeedUrl.trim()) || feedUrl.trim() === editingFeedUrl.trim();

    if (urlExists) {
      toast.error('This feed URL already exists');
      return;
    }

    setFeeds(feeds.map((f) => (f.id === feedId ? { ...f, url: editingFeedUrl } : f)));
    setEditingFeedId(null);
    setEditingFeedUrl('');
    toast.success('Feed URL updated successfully');
  };

  // Show the Feed Details modal for an existing feed
  const handleViewFeedNodes = (feedId) => {
    const selected = feeds.find((f) => f.id === feedId);
    if (!selected) return;

    setFeedData({
      url: selected.url, // ← add this
      totalJobs: selected.totalJobs,
      nodes: selected.nodes,
      lastUpdated: selected.lastUpdated,
      feedType: selected.feedType,
      encoding: selected.encoding
    });

    // Create mock job data for the selected feed
    const mockJobsData = [
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
          '/apply_url': selected.url + '/job1',
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
          '/apply_url': selected.url + '/job2',
          '/posted_date': '2025-03-28',
          '/modified_date': '2025-03-28',
          '/job_type': 'Full Time',
          '/category': 'Information Technology',
          '/cpc_bid': '0.75',
          '/cpa_bid': '25.00'
        }
      },
      {
        id: 'Job Data 3',
        fields: {
          '/source': 'Custom Feed',
          '/job_id': 'CF001',
          '/title': 'Marketing Manager',
          '/company': 'Digital Marketing Co',
          '/city': 'New York',
          '/state': 'New York',
          '/country': 'US',
          '/zip_code': '10001',
          '/description': 'Looking for an experienced Marketing Manager...',
          '/apply_url': selected.url + '/job3',
          '/posted_date': '2025-03-27',
          '/modified_date': '2025-03-27',
          '/job_type': 'Full Time',
          '/category': 'Marketing',
          '/cpc_bid': '0.65',
          '/cpa_bid': '20.00'
        }
      }
    ];

    setFeedDetails({ jobs: mockJobsData });
    setShowFeedModal(true);
  };

  // Handle Inspect Feed modal
  const handleInspectFeed = (feedId) => {
    const selected = feeds.find((f) => f.id === feedId);
    if (!selected) return;

    // Set the selected feed data for inspection
    setFeedData({
      id: selected.id,
      url: selected.url,
      totalJobs: selected.totalJobs,
      nodes: selected.nodes,
      lastUpdated: selected.lastUpdated,
      feedType: selected.feedType,
      encoding: selected.encoding
    });

    setShowInspectFeedModal(true);
  };

  const [mappingFeedId, setMappingFeedId] = useState(null);
  const [toggleMapSection, setToggleMapSection] = useState(true);

  // replace your existing handleMapFeed
  const handleMapFeed = (feedId) => {
    const selected = feeds.find((f) => f.id === feedId);
    if (!selected) return;

    if (toggleMapSection) {
      // set the feed we’re mapping
      setMappingFeedId(feedId);

      // load that feed’s nodes into the dropdown
      setAvailableNodes(selected.nodes);

      // initialize the mapping selects with whatever the feed already has (or blanks)
      setMappings({ ...selected.mappings });
    } else {
      setMappingFeedId(null);
      setAvailableNodes([]);
      setMappings(createDefaultMappings());
    }
    setToggleMapSection(!toggleMapSection);
  };

  // Function to handle default feed URL input change
  const handleDefaultFeedUrlChange = async (event) => {
    const url = event.target.value;
    setDefaultFeedUrl(url);

    // If URL is valid and has content, load feed data
    if (url.trim() && isValidUrl(url.trim())) {
      setIsLoadingDefaultFeed(true);

      try {
        // Simulate API call to extract feed data
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock extracted data for default feed
        const mockDefaultFeedData = {
          totalJobs: Math.floor(Math.random() * 2000) + 500,
          lastUpdated: new Date().toISOString(),
          feedType: 'XML',
          encoding: 'UTF-8',
          nodes: [
            'job_id',
            'title',
            'description',
            'company',
            'location',
            'salary',
            'job_type',
            'posted_date',
            'expiry_date',
            'apply_url',
            'category',
            'requirements',
            'benefits',
            'experience_level',
            'city',
            'state',
            'country',
            'zip_code',
            'source',
            'modified_date',
            'cpc_bid',
            'cpa_bid',
            'publisher',
            'job_reference',
            'contact_email'
          ]
        };

        setDefaultFeedData(mockDefaultFeedData);
      } catch (error) {
        console.error('Error loading default feed:', error);
        setDefaultFeedData(null);
      } finally {
        setIsLoadingDefaultFeed(false);
      }
    } else {
      setDefaultFeedData(null);
    }
  };

  // Helper function to validate URL
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Function to handle adding feed from inline section
  const handleAddFeedFromSection = async (event) => {
    if (event.key === 'Enter') {
      if (!addFeedUrl.trim()) {
        toast.error('Please enter a valid feed URL');
        return;
      }

      // Check if URL already exists in feeds array or main feedUrl
      const urlExists = feeds.some((feed) => feed.url === addFeedUrl.trim()) || feedUrl.trim() === addFeedUrl.trim();

      if (urlExists) {
        toast.error('This feed URL already exists');
        return;
      }

      setIsLoadingAddFeed(true);
      toast.info('Loading feed data...');

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const mockNewFeedData = {
          id: Date.now(),
          url: addFeedUrl.trim(),
          totalJobs: Math.floor(Math.random() * 2000) + 500,
          lastUpdated: new Date().toISOString(),
          feedType: 'XML',
          encoding: 'UTF-8',
          nodes: [
            'job_id',
            'title',
            'description',
            'company',
            'location',
            'salary',
            'job_type',
            'posted_date',
            'expiry_date',
            'apply_url',
            'category',
            'requirements',
            'benefits',
            'experience_level',
            'city',
            'state',
            'country',
            'zip_code',
            'source',
            'modified_date',
            'cpc_bid',
            'cpa_bid',
            'publisher',
            'job_reference'
          ],
          mappings: { ...newFeedMappings }
        };

        // Automatically add the feed to the feeds list
        setFeeds((prev) => [...prev, mockNewFeedData]);

        // Reset the add feed section
        setShowAddFeedSection(false);
        setAddFeedUrl('');
        setNewFeedData(null);
        setNewFeedMappings(createDefaultMappings());

        toast.success(`Feed added successfully! Found ${mockNewFeedData.totalJobs} jobs`);
      } catch (error) {
        toast.error('Failed to extract feed data. Please check the URL and try again.');
      } finally {
        setIsLoadingAddFeed(false);
      }
    }
  };

  const handleCancelAddFeed = () => {
    setShowAddFeedSection(false);
    setAddFeedUrl('');
    setNewFeedData(null);
    setNewFeedMappings(createDefaultMappings());
  };

  // New feed mapping handler
  const handleNewFeedMappingChange = (field, value) => {
    setNewFeedMappings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={handleBack}
        >
          <ArrowLeft size={20} color="#000" />
          <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
            Add/Update Client
          </Typography>
        </Box>
      </Box>

      <div style={{ marginBottom: '20px' }}>
        {/* Show each feed as a separate section */}
        {feeds.length === 0 ? (
          // Default feed URL input when no feeds exist
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <TextField
              label="Feed URL"
              type="url"
              size="small"
              sx={{ flexGrow: 1 }}
              value={headerFeedUrl}
              onChange={(e) => {
                setHeaderFeedUrl(e.target.value);
                console.log(headerFeedUrl);
              }}
              onKeyPress={handleHeaderFeedUrlKeyPress}
              placeholder="Enter feed URL and press Enter"
            />
            <>
              {/* Add a submit button which will work like it is working when I enter url in text field */}
              <IconButton
                size="small"
                sx={{
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#45a049' },
                  border: '1px solid #ddd',
                  height: '36px',
                  width: '100px'
                }}
                onClick={() => handleHeaderFeedUrlKeyPress({ key: 'Enter' })}
                disabled={isLoadingFeed || !headerFeedUrl.trim()}
                title="Submit Feed URL"
              >
                Submit
              </IconButton>
              <IconButton
                size="small"
                disabled={true}
                sx={{
                  border: '1px solid #ddd',
                  color: '#ccc',
                  backgroundColor: '#f9f9f9'
                }}
                title="Edit Feed"
              >
                <Edit size={16} />
              </IconButton>
              <IconButton
                size="small"
                disabled={true}
                sx={{
                  border: '1px solid #ddd',
                  color: '#ccc',
                  backgroundColor: '#f9f9f9'
                }}
                title="View Nodes"
              >
                <Eye size={16} />
              </IconButton>
              <IconButton
                size="small"
                disabled={true}
                sx={{
                  border: '1px solid #ddd',
                  color: '#ccc',
                  backgroundColor: '#f9f9f9'
                }}
                title="Inspect Feed"
              >
                <Search size={16} />
              </IconButton>
              <IconButton
                size="small"
                disabled={true}
                sx={{
                  border: '1px solid #ddd',
                  color: '#ccc',
                  backgroundColor: '#f9f9f9'
                }}
                title="Map Feed"
              >
                <MapPin size={16} />
              </IconButton>
              <IconButton
                size="small"
                disabled={true}
                sx={{
                  border: '1px solid #ddd',
                  color: '#ccc',
                  backgroundColor: '#f9f9f9'
                }}
                title="Delete"
              >
                <Trash2 size={16} />
              </IconButton>
              <IconButton
                size="small"
                disabled={true}
                onClick={handleAddFeed}
                sx={{
                  border: '1px solid #4caf50',
                  color: '#4caf50',
                  '&:hover': { backgroundColor: '#e8f5e8' }
                }}
                title="Add Feed"
              >
                <Plus size={16} />
              </IconButton>
            </>
          </Box>
        ) : (
          // Show individual feed sections
          feeds.map((feed, index) => (
            <Paper key={feed.id} elevation={1} sx={{ mb: 3, p: 2, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <TextField
                  label="Feed URL"
                  type="url"
                  size="small"
                  sx={{ flexGrow: 1 }}
                  value={editingFeedId === feed.id ? editingFeedUrl : feed.url}
                  onChange={(e) => editingFeedId === feed.id && setEditingFeedUrl(e.target.value)}
                  InputProps={{ readOnly: editingFeedId !== feed.id }}
                  placeholder="Enter feed URL"
                />

                {editingFeedId === feed.id ? (
                  <>
                    <IconButton
                      size="small"
                      onClick={() => handleSaveFeedUrl(feed.id)}
                      disabled={!editingFeedUrl.trim()}
                      sx={{
                        backgroundColor: '#4caf50',
                        color: '#fff',
                        '&:hover': { backgroundColor: '#45a049' },
                        '&:disabled': { backgroundColor: '#ccc', color: '#666' }
                      }}
                      title="Save"
                    >
                      <Save size={16} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setEditingFeedId(null)}
                      sx={{
                        backgroundColor: '#f44336',
                        color: '#fff',
                        '&:hover': { backgroundColor: '#da190b' }
                      }}
                      title="Cancel"
                    >
                      <X size={16} />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton
                      size="small"
                      onClick={() => handleEditFeed(feed.id)}
                      sx={{
                        border: '1px solid #ddd',
                        color: '#666',
                        '&:hover': { backgroundColor: '#f5f5f5' }
                      }}
                      title="Edit Feed"
                    >
                      <Edit size={16} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleViewFeedNodes(feed.id)}
                      sx={{
                        border: '1px solid #ddd',
                        color: '#666',
                        '&:hover': { backgroundColor: '#f5f5f5' }
                      }}
                      title="View Nodes"
                    >
                      <Eye size={16} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleInspectFeed(feed.id)}
                      sx={{
                        border: '1px solid #ddd',
                        color: '#666',
                        '&:hover': { backgroundColor: '#f5f5f5' }
                      }}
                      title="Inspect Feed"
                    >
                      <Search size={16} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleMapFeed(feed.id)}
                      sx={{
                        border: '1px solid #ddd',
                        color: '#666',
                        '&:hover': { backgroundColor: '#f5f5f5' }
                      }}
                      title="Map Feed"
                    >
                      <MapPin size={16} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemoveFeed(feed.id)}
                      sx={{
                        border: '1px solid #f44336',
                        color: '#f44336',
                        '&:hover': { backgroundColor: '#ffebee' }
                      }}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={handleAddFeed}
                      sx={{
                        border: '1px solid #4caf50',
                        color: '#4caf50',
                        '&:hover': { backgroundColor: '#e8f5e8' }
                      }}
                      title="Add Feed"
                    >
                      <Plus size={16} />
                    </IconButton>
                  </>
                )}
              </Box>

              {/* Feed stats for each feed */}
              {feed.url && (
                <>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={3}>
                      <Typography variant="body2" color="textSecondary">
                        Total Jobs: <strong>{feed.totalJobs}</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2" color="textSecondary">
                        Feed Type: <strong>{feed.feedType}</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2" color="textSecondary">
                        Last Updated: <strong>{new Date(feed.lastUpdated).toLocaleDateString()}</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2" color="textSecondary">
                        Nodes Found: <strong>{feed.nodes.length}</strong>
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />
                </>
              )}

              {/* Mapping section for each feed */}
              {feed.url && mappingFeedId === feed.id && (
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                      Default Career Fields
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {Object.keys(mappings).map((field) => {
                        const isDefaultField = defaultFields.includes(field);

                        return (
                          <Box key={field} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {editingField === field && !isDefaultField ? (
                              <TextField
                                fullWidth
                                size="small"
                                value={editingFieldName}
                                onChange={(e) => setEditingFieldName(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    handleConfirmEditField();
                                  } else if (e.key === 'Escape') {
                                    handleCancelEditField();
                                  }
                                }}
                                sx={{ backgroundColor: 'white' }}
                                autoFocus
                              />
                            ) : (
                              <TextField
                                fullWidth
                                size="small"
                                label={field}
                                value={field}
                                InputProps={{ readOnly: true }}
                                sx={{
                                  backgroundColor: isDefaultField ? '#f9f9f9' : '#fff3e0'
                                }}
                              />
                            )}

                            <Box sx={{ display: 'flex', gap: 0.5, minWidth: 'fit-content' }}>
                              {editingField === field && !isDefaultField ? (
                                <>
                                  <IconButton
                                    size="small"
                                    onClick={handleConfirmEditField}
                                    disabled={
                                      !editingFieldName.trim() ||
                                      (editingFieldName.trim() !== editingField && mappings.hasOwnProperty(editingFieldName.trim()))
                                    }
                                    sx={{ color: 'green' }}
                                  >
                                    ✓
                                  </IconButton>
                                  <IconButton size="small" onClick={handleCancelEditField} sx={{ color: 'red' }}>
                                    ✕
                                  </IconButton>
                                </>
                              ) : (
                                !isDefaultField && (
                                  <>
                                    <IconButton size="small" onClick={() => handleEditField(field)} sx={{ color: '#666' }}>
                                      ✏️
                                    </IconButton>
                                    <IconButton size="small" onClick={() => handleDeleteField(field)} sx={{ color: 'red' }}>
                                      🗑️
                                    </IconButton>
                                  </>
                                )
                              )}
                            </Box>
                          </Box>
                        );
                      })}

                      {isAddingField && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter field name"
                            value={newFieldName}
                            onChange={(e) => setNewFieldName(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleConfirmAddField();
                              } else if (e.key === 'Escape') {
                                handleCancelAddField();
                              }
                            }}
                            sx={{ backgroundColor: 'white' }}
                            autoFocus
                          />
                          <Box sx={{ display: 'flex', gap: 0.5, minWidth: 'fit-content' }}>
                            <IconButton
                              size="small"
                              onClick={handleConfirmAddField}
                              disabled={!newFieldName.trim() || mappings.hasOwnProperty(newFieldName.trim())}
                              sx={{ color: 'green' }}
                            >
                              ✓
                            </IconButton>
                            <IconButton size="small" onClick={handleCancelAddField} sx={{ color: 'red' }}>
                              ✕
                            </IconButton>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                      Feed Nodes
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {Object.keys(mappings).map((field) => (
                        <FormControl key={field} fullWidth size="small">
                          <InputLabel>Select Node</InputLabel>
                          <Select value={mappings[field]} label="Select Node" onChange={(e) => handleMappingChange(field, e.target.value)}>
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {availableNodes.map((node) => {
                              const takenByOther = Object.entries(mappings).some(
                                ([otherField, val]) => val === node && otherField !== field
                              );

                              return (
                                <MenuItem key={node} value={node} disabled={takenByOther}>
                                  {node}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      ))}

                      {isAddingField && (
                        <FormControl fullWidth size="small" disabled>
                          <InputLabel>Select Node</InputLabel>
                          <Select value="" label="Select Node" sx={{ backgroundColor: '#f5f5f5' }}>
                            <MenuItem value="">
                              <em>Add field first</em>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, my: 3 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleAddField}
                        disabled={isAddingField || editingField !== null}
                        sx={{
                          textTransform: 'none',
                          borderColor: '#ddd',
                          color: '#666'
                        }}
                      >
                        Add Field
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleMapFields}
                        sx={{
                          backgroundColor: '#000',
                          textTransform: 'none',
                          '&:hover': { backgroundColor: '#333' }
                        }}
                      >
                        Map
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleResetMappings}
                        sx={{
                          textTransform: 'none',
                          borderColor: '#ddd',
                          color: '#666'
                        }}
                        startIcon={<RotateCcw size={16} />}
                      >
                        Reset
                      </Button>
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                      Unmapped Feed Nodes
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: '#f9f9f9',
                        p: 2,
                        borderRadius: 1,
                        maxHeight: 300,
                        overflowY: 'auto'
                      }}
                    >
                      {availableNodes
                        .filter((node) => !Object.values(mappings).includes(node))
                        .map((node) => (
                          <Chip key={node} label={node} size="small" sx={{ m: 0.5 }} variant="outlined" />
                        ))}
                    </Box>
                  </Grid>
                </Grid>
              )}

              {/* Divider between feeds except for the last one */}
            </Paper>
          ))
        )}
      </div>

      {/* Add Feed Section */}
      {showAddFeedSection && (
        <Paper elevation={1} sx={{ mb: 3, p: 2, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <TextField
              label="Feed URL"
              type="url"
              size="small"
              sx={{ flexGrow: 1 }}
              value={addFeedUrl}
              onChange={(e) => setAddFeedUrl(e.target.value)}
              onKeyPress={handleAddFeedFromSection}
              placeholder="Enter feed URL and press Enter"
              disabled={isLoadingAddFeed}
              inputRef={addFeedInputRef} // Add ref here
            />
            <>
              <IconButton
                size="small"
                sx={{
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#45a049' },
                  border: '1px solid #ddd',
                  height: '36px',
                  width: '100px'
                }}
                onClick={() => handleAddFeedFromSection({ key: 'Enter' })}
                disabled={isLoadingAddFeed}
              >
                Submit
              </IconButton>
              <IconButton
                size="small"
                disabled={true}
                sx={{
                  border: '1px solid #ddd',
                  color: '#ccc',
                  backgroundColor: '#f9f9f9'
                }}
                title="Edit Feed"
              >
                <Edit size={16} />
              </IconButton>
              <IconButton
                size="small"
                disabled={true}
                sx={{
                  border: '1px solid #ddd',
                  color: '#ccc',
                  backgroundColor: '#f9f9f9'
                }}
                title="View Nodes"
              >
                <Eye size={16} />
              </IconButton>
              <IconButton
                size="small"
                disabled={true}
                sx={{
                  border: '1px solid #ddd',
                  color: '#ccc',
                  backgroundColor: '#f9f9f9'
                }}
                title="Inspect Feed"
              >
                <Search size={16} />
              </IconButton>
              <IconButton
                size="small"
                disabled={true}
                sx={{
                  border: '1px solid #ddd',
                  color: '#ccc',
                  backgroundColor: '#f9f9f9'
                }}
                title="Map Feed"
              >
                <MapPin size={16} />
              </IconButton>
              <IconButton
                size="small"
                disabled={isLoadingAddFeed}
                sx={{
                  border: '1px solid #f44336',
                  color: '#f44336',
                  '&:hover': { backgroundColor: '#ffebee' }
                }}
                title="Delete"
                onClick={handleCancelAddFeed}
              >
                <Trash2 size={16} />
              </IconButton>
              <IconButton
                size="small"
                disabled={true}
                onClick={handleAddFeed}
                sx={{
                  border: '1px solid #4caf50',
                  color: '#4caf50',
                  '&:hover': { backgroundColor: '#e8f5e8' }
                }}
                title="Add Feed"
              >
                <Plus size={16} />
              </IconButton>
            </>
            {isLoadingAddFeed && <CircularProgress size={20} />}
          </Box>
        </Paper>
      )}

      {/* Add Feed Dialog */}

      <Box component="form" onSubmit={handleSubmit}>
        {/* Feed Details Modal */}
        {showFeedModal && feedDetails && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1300
            }}
            onClick={() => setShowFeedModal(false)}
          >
            <Paper
              sx={{
                width: '90%',
                maxWidth: 800,
                maxHeight: '90%',
                overflow: 'hidden',
                borderRadius: 2
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Box sx={{ p: 3, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Feed details
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Link
                    href={'/clients/add-client/feed-details'}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      textDecoration: 'none',
                      color: '#1976d2',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    <ExternalLink size={18} />
                  </Link>

                  <IconButton onClick={() => setShowFeedModal(false)}>
                    <Box sx={{ fontSize: 18, color: '#999' }}>×</Box>
                  </IconButton>
                </Box>
              </Box>

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
                            feedDetails.jobs.flatMap((job, jobIndex) =>
                              Object.entries(job.fields).map(([field, value], fieldIndex) => (
                                <TableRow key={`${jobIndex}-${fieldIndex}`}>
                                  <TableCell sx={{ backgroundColor: '#f9f9f9', fontWeight: 500 }}>
                                    {fieldIndex === 0 ? job.id : ''}
                                  </TableCell>
                                  <TableCell>{field}</TableCell>
                                  <TableCell sx={{ maxWidth: 300, wordBreak: 'break-word' }}>{value}</TableCell>
                                </TableRow>
                              ))
                            )
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
                      <Box
                        sx={{
                          backgroundColor: '#f8f9fa',
                          p: 2,
                          borderRadius: 1,
                          maxHeight: 500,
                          overflowY: 'auto',
                          border: '1px solid #e0e0e0',
                          fontFamily: 'monospace',
                          fontSize: '0.875rem',
                          lineHeight: 1.6
                        }}
                      >
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                          {feedDetails?.rawXml ||
                            `<?xml version="1.0" encoding="UTF-8"?>
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
            </Paper>
          </Box>
        )}

        {/* Inspect Feed Modal */}
        {showInspectFeedModal && feedData && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1300
            }}
            onClick={() => setShowInspectFeedModal(false)}
          >
            <Paper
              sx={{
                width: '95%',
                maxWidth: 1200,
                maxHeight: '95%',
                overflow: 'hidden',
                borderRadius: 2
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Box sx={{ p: 3, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Inspect Feed
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Link
                    href={'/clients/add-client/inspect-feed'}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      textDecoration: 'none',
                      color: '#1976d2',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    <ExternalLink size={18} />
                  </Link>

                  <IconButton onClick={() => setShowInspectFeedModal(false)}>
                    <Box sx={{ fontSize: 18, color: '#999' }}>×</Box>
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ p: 3, maxHeight: 'calc(95vh - 120px)', overflowY: 'auto' }}>
                {/* Feed Selection Info */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    backgroundColor: '#e3f2fd',
                    borderRadius: 2,
                    mb: 3,
                    border: '1px solid #bbdefb'
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Inspecting: <strong>Feed {feedData.id}</strong>
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        URL: {feedData.url}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'right' }}>
                      <Typography variant="body2">
                        <strong>{feedData.totalJobs?.toLocaleString()}</strong> total jobs
                      </Typography>
                      <Typography variant="body2">
                        <strong>{feedData.nodes?.length}</strong> nodes available
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Feed Summary Statistics */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Feed Overview
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper
                        sx={{
                          p: 3,
                          textAlign: 'center',
                          backgroundColor: '#f8f9fa',
                          border: '1px solid #e9ecef',
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: '#e9ecef',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                          }
                        }}
                      >
                        <Typography variant="h3" sx={{ fontWeight: 700, color: '#2e7d32', mb: 1 }}>
                          {feedData.totalJobs?.toLocaleString() || 0}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                          Total Jobs
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper
                        sx={{
                          p: 3,
                          textAlign: 'center',
                          backgroundColor: '#f8f9fa',
                          border: '1px solid #e9ecef',
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: '#e9ecef',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                          }
                        }}
                      >
                        <Typography variant="h3" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>
                          {feedData.nodes?.length || 0}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                          Feed Nodes
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper
                        sx={{
                          p: 3,
                          textAlign: 'center',
                          backgroundColor: '#f8f9fa',
                          border: '1px solid #e9ecef',
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: '#e9ecef',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                          }
                        }}
                      >
                        <Typography variant="h3" sx={{ fontWeight: 700, color: '#ed6c02', mb: 1 }}>
                          {Math.floor(feedData.nodes?.length * 0.7) || 0}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                          Active Nodes
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper
                        sx={{
                          p: 3,
                          textAlign: 'center',
                          backgroundColor: '#f8f9fa',
                          border: '1px solid #e9ecef',
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: '#e9ecef',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                          }
                        }}
                      >
                        <Typography variant="h3" sx={{ fontWeight: 700, color: '#d32f2f', mb: 1 }}>
                          {Math.floor(feedData.nodes?.length * 0.3) || 0}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                          Inactive Nodes
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>

                {/* Feed Node Analysis */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Node Analysis
                  </Typography>
                  <TableContainer
                    component={Paper}
                    sx={{
                      maxHeight: 500,
                      borderRadius: 2,
                      border: '1px solid #e0e0e0',
                      '& .MuiTableHead-root': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5', py: 2 }}>Node Name</TableCell>
                          <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5', py: 2 }}>Data Type</TableCell>
                          <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5', py: 2 }}>Sample Value</TableCell>
                          <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5', py: 2 }}>Record Count</TableCell>
                          <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5', py: 2 }}>Status</TableCell>
                          <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5', py: 2 }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {feedData.nodes?.map((node, index) => {
                          const isActive = Math.random() > 0.3;
                          const sampleValues = [
                            'Software Engineer',
                            'Marketing Manager',
                            'Data Analyst',
                            'Product Designer',
                            'Sales Representative',
                            'Full Time',
                            'Part Time',
                            'Contract',
                            'Remote',
                            'New York, NY',
                            'San Francisco, CA',
                            'Austin, TX',
                            'Singapore',
                            'London, UK',
                            '2024-12-15',
                            '$75,000 - $95,000',
                            'https://apply.company.com',
                            'Technology'
                          ];
                          const dataTypes = ['String', 'Number', 'Date', 'URL', 'Text', 'Currency'];
                          const recordCount = Math.floor(Math.random() * 1000) + 100;

                          return (
                            <TableRow
                              key={node}
                              sx={{
                                '&:hover': { backgroundColor: '#f8f9fa' },
                                '&:nth-of-type(odd)': { backgroundColor: '#fafafa' }
                              }}
                            >
                              <TableCell sx={{ fontWeight: 500, py: 2 }}>
                                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                  {node}
                                </Typography>
                              </TableCell>
                              <TableCell sx={{ py: 2 }}>
                                <Chip
                                  label={dataTypes[index % dataTypes.length]}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                    backgroundColor: '#fff'
                                  }}
                                />
                              </TableCell>
                              <TableCell sx={{ maxWidth: 250, wordBreak: 'break-word', py: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                  {sampleValues[index % sampleValues.length]}
                                </Typography>
                              </TableCell>
                              <TableCell sx={{ fontWeight: 500, py: 2 }}>
                                <Typography variant="body2">{recordCount.toLocaleString()}</Typography>
                              </TableCell>
                              <TableCell sx={{ py: 2 }}>
                                <Chip
                                  label={isActive ? 'Active' : 'Inactive'}
                                  size="small"
                                  color={isActive ? 'success' : 'default'}
                                  sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                                />
                              </TableCell>
                              <TableCell sx={{ py: 2 }}>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                  <Button
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                      textTransform: 'none',
                                      fontSize: '0.75rem',
                                      minWidth: 'auto',
                                      px: 1.5,
                                      py: 0.5
                                    }}
                                  >
                                    View
                                  </Button>
                                  <Button
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                      textTransform: 'none',
                                      fontSize: '0.75rem',
                                      minWidth: 'auto',
                                      px: 1.5,
                                      py: 0.5
                                    }}
                                  >
                                    Export
                                  </Button>
                                </Box>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>

                {/* Feed Metadata */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Feed Metadata
                  </Typography>
                  <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid #e0e0e0' }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Feed URL"
                          value={feedData.url}
                          disabled
                          size="small"
                          sx={{
                            mb: 2,
                            '& .MuiInputBase-input': {
                              fontFamily: 'monospace',
                              fontSize: '0.875rem'
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField fullWidth label="Feed Type" value={feedData.feedType || 'XML'} disabled size="small" />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField fullWidth label="Encoding" value={feedData.encoding || 'UTF-8'} disabled size="small" />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField fullWidth label="File Size" value="2.4 MB" disabled size="small" />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          label="Last Updated"
                          value={feedData.lastUpdated ? new Date(feedData.lastUpdated).toLocaleString() : new Date().toLocaleString()}
                          disabled
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>

                {/* Processing Log */}
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Processing Log
                  </Typography>
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      border: '1px solid #e0e0e0',
                      backgroundColor: '#fafafa'
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: '#fff',
                        p: 2,
                        borderRadius: 1,
                        maxHeight: 250,
                        overflowY: 'auto',
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        lineHeight: 1.6,
                        border: '1px solid #e0e0e0'
                      }}
                    >
                      <Typography variant="body2" sx={{ color: '#28a745', mb: 0.5, fontWeight: 500 }}>
                        ✓ Feed URL validated successfully
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#28a745', mb: 0.5, fontWeight: 500 }}>
                        ✓ XML structure parsed - {feedData.nodes?.length || 0} nodes discovered
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#28a745', mb: 0.5, fontWeight: 500 }}>
                        ✓ Job data extracted - {feedData.totalJobs?.toLocaleString() || 0} jobs processed
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#17a2b8', mb: 0.5, fontWeight: 500 }}>
                        ℹ Data types identified and categorized
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#ffc107', mb: 0.5, fontWeight: 500 }}>
                        ⚠ {Math.floor(feedData.nodes?.length * 0.3) || 0} nodes have low activity
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#28a745', mb: 0.5, fontWeight: 500 }}>
                        ✓ Data validation completed successfully
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6c757d', fontWeight: 500 }}>
                        📊 Analysis completed at: {new Date().toLocaleString()}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </Box>
            </Paper>
          </Box>
        )}

        {/* Add Feed Dialog removed - now using inline section */}

        {/* Feed Mapping Section */}
        {/* {feeds.map(feed => (
          <Paper key={feed.id} elevation={1} sx={{ mb: 3, p: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <TextField
                label="Feed URL"
                type="url"
                size="small"
                value={editingFeedId === feed.id ? editingFeedUrl : feed.url}
                onChange={e => editingFeedId === feed.id && setEditingFeedUrl(e.target.value)}
                disabled={editingFeedId !== feed.id}
                sx={{ flexGrow: 1 }}
              />

              {editingFeedId === feed.id
                ? <>
                  <Button
                    size="small"
                    onClick={() => handleSaveFeedUrl(feed.id)}
                    disabled={!editingFeedUrl.trim()}
                  >
                    Save
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setEditingFeedId(null)}
                  >
                    Cancel
                  </Button>
                </>
                : <>
                  <Button
                    size="small"
                    onClick={() => handleEditFeed(feed.id)}
                  >
                    Edit Feed
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleViewFeedNodes(feed.id)}
                  >
                    View Nodes
                  </Button>
                  <Button
                    size="small"
                    onClick={() => navigate('/clients/add-client/inspect-feed', { state: { feed } })}
                  >
                    Inspect Feed
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleMapFeed(feed.id)}
                  >
                    Map Feed
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleRemoveFeed(feed.id)}
                  >
                    Delete
                  </Button>
                </>
              }
            </Box>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={3}>
                <Typography variant="body2" color="textSecondary">
                  Total Jobs: <strong>{feed.totalJobs}</strong>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2" color="textSecondary">
                  Feed Type: <strong>{feed.feedType}</strong>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2" color="textSecondary">
                  Last Updated:{' '}
                  <strong>{new Date(feed.lastUpdated).toLocaleDateString()}</strong>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2" color="textSecondary">
                  Nodes Found: <strong>{feed.nodes.length}</strong>
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {mappingFeedId === feed.id && (
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                    Default Career Fields
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {Object.keys(mappings).map((field) => {
                      const isDefaultField = defaultFields.includes(field);

                      return (
                        <Box key={field} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {editingField === field && !isDefaultField ? (
                            <TextField
                              fullWidth
                              size="small"
                              value={editingFieldName}
                              onChange={(e) => setEditingFieldName(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleConfirmEditField();
                                } else if (e.key === 'Escape') {
                                  handleCancelEditField();
                                }
                              }}
                              sx={{ backgroundColor: 'white' }}
                              autoFocus
                            />
                          ) : (
                            <TextField
                              fullWidth
                              size="small"
                              label={field}
                              value={field}
                              InputProps={{ readOnly: true }}
                              sx={{
                                backgroundColor: isDefaultField ? '#f9f9f9' : '#fff3e0'
                              }}
                            />
                          )}

                          <Box sx={{ display: 'flex', gap: 0.5, minWidth: 'fit-content' }}>
                            {editingField === field && !isDefaultField ? (
                              <>
                                <IconButton
                                  size="small"
                                  onClick={handleConfirmEditField}
                                  disabled={!editingFieldName.trim() || (editingFieldName.trim() !== editingField && mappings.hasOwnProperty(editingFieldName.trim()))}
                                  sx={{ color: 'green' }}
                                >
                                  ✓
                                </IconButton>
                                <IconButton
                                  size="small"
                                  onClick={handleCancelEditField}
                                  sx={{ color: 'red' }}
                                >
                                  ✕
                                </IconButton>
                              </>
                            ) : (
                              !isDefaultField && (
                                <>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleEditField(field)}
                                    sx={{ color: '#666' }}
                                  >
                                    ✏️
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleDeleteField(field)}
                                    sx={{ color: 'red' }}
                                  >
                                    🗑️
                                  </IconButton>
                                </>
                              )
                            )}
                          </Box>
                        </Box>
                      );
                    })}

                    {isAddingField && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="Enter field name"
                          value={newFieldName}
                          onChange={(e) => setNewFieldName(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {

                              handleConfirmAddField();
                            } else if (e.key === 'Escape') {
                              handleCancelAddField();
                            }
                          }}
                          sx={{ backgroundColor: 'white' }}
                          autoFocus
                        />
                        <Box sx={{ display: 'flex', gap: 0.5, minWidth: 'fit-content' }}>
                          <IconButton
                            size="small"
                            onClick={handleConfirmAddField}
                            disabled={!newFieldName.trim() || mappings.hasOwnProperty(newFieldName.trim())}
                            sx={{ color: 'green' }}
                          >
                            ✓
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={handleCancelAddField}
                            sx={{ color: 'red' }}
                          >
                            ✕
                         
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                    Feed Nodes
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {Object.keys(mappings).map((field) => (
                      <FormControl key={field} fullWidth size="small">
                        <InputLabel>Select Node</InputLabel>
                        <Select
                          value={mappings[field]}
                          label="Select Node"
                          onChange={(e) => handleMappingChange(field, e.target.value)}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {availableNodes.map((node) => {
                            const takenByOther = Object.entries(mappings)
                              .some(([otherField, val]) => val === node && otherField !== field);

                            return (
                              <MenuItem
                                key={node}
                                value={node}
                                disabled={takenByOther}
                              >
                                {node}
                              </MenuItem>
                            )
                          })}
                        </FormControl>
                      </Box>
                    ))}

                    {isAddingField && (
                      <FormControl fullWidth size="small" disabled>
                        <InputLabel>Select Node</InputLabel>
                        <Select
                          value=""
                          label="Select Node"
                          sx={{ backgroundColor: '#f5f5f5' }}
                        >
                          <MenuItem value="">
                            <em>Add field first</em>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, my: 3 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleAddField}
                      disabled={isAddingField || editingField !== null}
                      sx={{
                        textTransform: 'none',
                        borderColor: '#ddd',
                        color: '#666'
                      }}
                    >
                      Add Field
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleMapFields}
                      sx={{
                        backgroundColor: '#000',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#333' }
                      }}
                    >
                      Map
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleResetMappings}
                      sx={{
                        textTransform: 'none',
                        borderColor: '#ddd',
                        color: '#666'
                      }}
                      startIcon={<RotateCcw size={16} />}
                    >
                      Reset
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                    Unmapped Feed Nodes
                    </Typography>
                  <Box sx={{
                    backgroundColor: '#f9f9f9',
                    p: 2,
                    borderRadius: 1,
                    maxHeight: 300,
                    overflowY: 'auto'
                  }}>
                    {availableNodes
                      .filter(node => !Object.values(mappings).includes(node))
                      .map((node) => (
                        <Chip
                          key={node}
                          label={node}
                          size="small"
                          sx={{ m: 0.5 }}
                          variant="outlined"
                        />
                      ))}
                  </Box>
                </Grid>
              </Grid>
            )}
          </Paper>
        ))}

        {/* Client Details Section */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: '#ffffff',
            borderRadius: 2,
            mb: 3
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Client Details
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} size="small" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Advertiser Name"
                value={advertiserName}
                onChange={(e) => setAdvertiserName(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Exported Name"
                value={exportedName}
                onChange={(e) => setExportedName(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Currency</InputLabel>
                <Select value={currency} label="Currency" onChange={(e) => setCurrency(e.target.value)}>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                  <MenuItem value="SGD">SGD</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Country</InputLabel>
                <Select value={country} label="Country" onChange={(e) => setCountry(e.target.value)}>
                  <MenuItem value="US">United States</MenuItem>
                  <MenuItem value="UK">United Kingdom</MenuItem>
                  <MenuItem value="SG">Singapore</MenuItem>
                  <MenuItem value="AU">Australia</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Industry</InputLabel>
                <Select value={industry} label="Industry" onChange={(e) => setIndustry(e.target.value)}>
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Healthcare">Healthcare</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Settings Section */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: '#ffffff',
            borderRadius: 2,
            mb: 3
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Settings
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} size="small" type="number" />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField fullWidth label="Markup" value={markup} onChange={(e) => setMarkup(e.target.value)} size="small" type="number" />

              <Select
                size="small"
                value={markupType}
                onChange={(e) => setMarkupType(e.target.value)}
                sx={{
                  height: '100%',
                  minWidth: 45,
                  maxWidth: 45,
                  '& .MuiSelect-select': {
                    fontSize: '0.75rem',
                    padding: '4px 8px',
                    paddingRight: '20px !important'
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '1rem'
                  }
                }}
                placeholder="Mode"
              >
                <MenuItem value="percentage" sx={{ fontSize: '0.75rem' }} selected>
                  %
                </MenuItem>
                <MenuItem value="value" sx={{ fontSize: '0.75rem' }}>
                  $
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                fullWidth
                label="Markdown"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                size="small"
                type="number"
              />

              <Select
                size="small"
                value={markdownType}
                onChange={(e) => setMarkdownType(e.target.value)}
                sx={{
                  height: '100%',
                  minWidth: 45,
                  maxWidth: 45,
                  '& .MuiSelect-select': {
                    fontSize: '0.75rem',
                    padding: '4px 8px',
                    paddingRight: '20px !important'
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '1rem'
                  }
                }}
                placeholder="Mode"
              >
                <MenuItem value="percentage" sx={{ fontSize: '0.75rem' }} selected>
                  %
                </MenuItem>
                <MenuItem value="value" sx={{ fontSize: '0.75rem' }}>
                  $
                </MenuItem>
              </Select>
            </Grid>
            {frequency === 'custom' ? (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Custom Frequency"
                  value={customFrequency}
                  onChange={(e) => setCustomFrequency(e.target.value)}
                  size="small"
                  type="number"
                  placeholder="Enter custom frequency"
                  inputProps={{ min: 1 }}
                  inputRef={customFrequencyInputRef}
                />
              </Grid>
            ) : (
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Frequency</InputLabel>
                  <Select value={frequency} label="Frequency" onChange={(e) => setFrequency(e.target.value)}>
                    <MenuItem value="one">1</MenuItem>
                    <MenuItem value="two">2</MenuItem>
                    <MenuItem value="three">3</MenuItem>
                    <MenuItem value="four">4</MenuItem>
                    <MenuItem value="five">5</MenuItem>
                    <MenuItem value="six">6</MenuItem>
                    <MenuItem value="custom">Custom</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Time Zone</InputLabel>
                <Select value={timeZone} label="Time Zone" onChange={(e) => setTimeZone(e.target.value)}>
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="EST">EST</MenuItem>
                  <MenuItem value="PST">PST</MenuItem>
                  <MenuItem value="SGT">SGT</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Client Type</InputLabel>
                <Select value={clientType} label="Client Type" onChange={(e) => setClientType(e.target.value)}>
                  <MenuItem value="CPA">CPA</MenuItem>
                  <MenuItem value="CPC">CPC</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Show Dashboards</InputLabel>
                <Select value={showDashboards} label="Show Dashboards" onChange={(e) => setShowDashboards(e.target.value)}>
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Click Filters"
                value={clickFilters}
                onChange={(e) => setClickFilters(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Click Filter Redirect URL"
                value={clickFilterRedirectUrl}
                onChange={(e) => setClickFilterRedirectUrl(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                size="small"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                size="small"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Spend Type CPA"
                value={spendTypeCpa}
                onChange={(e) => setSpendTypeCpa(e.target.value)}
                size="small"
                type="number"
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Submit Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#000',
              textTransform: 'none',
              px: 4,
              py: 1.5,
              '&:hover': { backgroundColor: '#333' }
            }}
          >
            Save Client Configuration
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddClient;
