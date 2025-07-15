'use client';

import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { ArrowLeft } from 'iconsax-react';

export function AddPublisher({ onBack }) {
  const [formData, setFormData] = useState({
    publisherName: '',
    currency: '',
    bidType: '',
    minBid: '',
    url: '',
    country: '',
    industry: '',
    publisherFeedExtraTags: '',
    contactName: '',
    mobileNumber: '',
    email: '',
    billing: '',
    ftpHost: '',
    ftpUsername: '',
    ftpPort: '',
    ftpPassword: '',
    alertRecipients: '',
    enablePerClientPlacements: false,
    showClientsOnDashboard: false,
    loginFullName: '',
    loginEmail: '',
    loginPassword: '',
    facebookEmail: '',
    facebookPassword: ''
  });

  const [contacts, setContacts] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddContact = () => {
    if (formData.contactName && formData.mobileNumber && formData.email) {
      setContacts((prev) => [
        ...prev,
        {
          name: formData.contactName,
          mobile: formData.mobileNumber,
          email: formData.email,
          billing: formData.billing
        }
      ]);

      // Clear contact fields
      setFormData((prev) => ({
        ...prev,
        contactName: '',
        mobileNumber: '',
        email: '',
        billing: ''
      }));

      alert('Contact added successfully!');
    } else {
      alert('Please fill in all required contact fields');
    }
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.publisherName || !formData.currency || !formData.bidType) {
      alert('Please fill in all required fields');
      return;
    }

    console.log('Submitting publisher data:', { ...formData, contacts });
    alert('Publisher added successfully!');

    // Reset form after successful submission
    handleCancel();
  };

  const handleCancel = () => {
    setFormData({
      publisherName: '',
      currency: '',
      bidType: '',
      minBid: '',
      url: '',
      country: '',
      industry: '',
      publisherFeedExtraTags: '',
      contactName: '',
      mobileNumber: '',
      email: '',
      billing: '',
      ftpHost: '',
      ftpUsername: '',
      ftpPort: '',
      ftpPassword: '',
      alertRecipients: '',
      enablePerClientPlacements: false,
      showClientsOnDashboard: false,
      loginFullName: '',
      loginEmail: '',
      loginPassword: '',
      facebookEmail: '',
      facebookPassword: ''
    });
    setContacts([]);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200 }}>
      {/* Back button */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <Button startIcon={<ArrowLeft size="16" />} onClick={onBack} variant="outlined" size="small">
          Back
        </Button>
        <Typography variant="h5">Add New Publisher</Typography>
      </Stack>

      {/* Basic Information */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Publisher Name"
                placeholder="eg. Marco Faloppa"
                size="small"
                value={formData.publisherName}
                onChange={(e) => handleInputChange('publisherName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Currency</InputLabel>
                <Select label="Currency" value={formData.currency} onChange={(e) => handleInputChange('currency', e.target.value)}>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Bid Type</InputLabel>
                <Select label="Bid Type" value={formData.bidType} onChange={(e) => handleInputChange('bidType', e.target.value)}>
                  <MenuItem value="CPA">CPA</MenuItem>
                  <MenuItem value="CPC">CPC</MenuItem>
                  <MenuItem value="CPM">CPM</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Min Bid"
                placeholder="0.25"
                size="small"
                value={formData.minBid}
                onChange={(e) => handleInputChange('minBid', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="URL"
                placeholder="https://example.com"
                size="small"
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Country</InputLabel>
                <Select label="Country" value={formData.country} onChange={(e) => handleInputChange('country', e.target.value)}>
                  <MenuItem value="US">United States</MenuItem>
                  <MenuItem value="UK">United Kingdom</MenuItem>
                  <MenuItem value="DE">Germany</MenuItem>
                  <MenuItem value="SG">Singapore</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Industry</InputLabel>
                <Select label="Industry" value={formData.industry} onChange={(e) => handleInputChange('industry', e.target.value)}>
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Healthcare">Healthcare</MenuItem>
                  <MenuItem value="Accounting">Accounting</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Publisher Feed Extra Tags</InputLabel>
                <Select
                  label="Publisher Feed Extra Tags"
                  value={formData.publisherFeedExtraTags}
                  onChange={(e) => handleInputChange('publisherFeedExtraTags', e.target.value)}
                >
                  <MenuItem value="tag1">Tag 1</MenuItem>
                  <MenuItem value="tag2">Tag 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Contact Details */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Contact Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Name"
                placeholder="eg. Marco Faloppa"
                size="small"
                value={formData.contactName}
                onChange={(e) => handleInputChange('contactName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Mobile Number"
                placeholder="+1234567890"
                size="small"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                placeholder="email@example.com"
                size="small"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Billing"
                placeholder="Billing info"
                size="small"
                value={formData.billing}
                onChange={(e) => handleInputChange('billing', e.target.value)}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" onClick={handleAddContact}>
              Add
            </Button>
          </Box>

          {/* Display added contacts */}
          {contacts.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Added Contacts:
              </Typography>
              <Stack spacing={1}>
                {contacts.map((contact, index) => (
                  <Chip
                    key={index}
                    label={`${contact.name} - ${contact.mobile} - ${contact.email} - ${contact.billing}`}
                    variant="outlined"
                    sx={{ justifyContent: 'flex-start' }}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* FTP Details */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            FTP Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Host"
                placeholder="ftp.example.com"
                size="small"
                value={formData.ftpHost}
                onChange={(e) => handleInputChange('ftpHost', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="User Name"
                placeholder="username"
                size="small"
                value={formData.ftpUsername}
                onChange={(e) => handleInputChange('ftpUsername', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Port"
                placeholder="21"
                size="small"
                value={formData.ftpPort}
                onChange={(e) => handleInputChange('ftpPort', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Alert Recipients"
                placeholder="email1@example.com, email2@example.com"
                size="small"
                value={formData.alertRecipients}
                onChange={(e) => handleInputChange('alertRecipients', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                placeholder="Password"
                size="small"
                value={formData.ftpPassword}
                onChange={(e) => handleInputChange('ftpPassword', e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h6">Feed Settings</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enable per Client Placements
                  </Typography>
                </Box>
                <Switch
                  checked={formData.enablePerClientPlacements}
                  onChange={(e) => handleInputChange('enablePerClientPlacements', e.target.checked)}
                />
              </Stack>
            </Box>
            <Divider />
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h6">Publisher Dashboard Settings</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Show Clients on Publisher Dashboard
                  </Typography>
                </Box>
                <Switch
                  checked={formData.showClientsOnDashboard}
                  onChange={(e) => handleInputChange('showClientsOnDashboard', e.target.checked)}
                />
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Publisher Login */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Publisher Login
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Full Name"
                placeholder="eg. Marco Faloppa"
                size="small"
                value={formData.loginFullName}
                onChange={(e) => handleInputChange('loginFullName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                placeholder="email@example.com"
                size="small"
                value={formData.loginEmail}
                onChange={(e) => handleInputChange('loginEmail', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                placeholder="Password"
                size="small"
                value={formData.loginPassword}
                onChange={(e) => handleInputChange('loginPassword', e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Facebook Credentials */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Publisher Facebook Credentials
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Registered Email / Number"
                placeholder="email@example.com"
                size="small"
                value={formData.facebookEmail}
                onChange={(e) => handleInputChange('facebookEmail', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Facebook Password"
                type="password"
                placeholder="Password"
                size="small"
                value={formData.facebookPassword}
                onChange={(e) => handleInputChange('facebookPassword', e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="outlined" color="error" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
