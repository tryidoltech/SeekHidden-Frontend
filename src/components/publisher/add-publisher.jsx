// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
// import { Separator } from "@/components/ui/separator"

// export function AddPublisher() {
//   const [formData, setFormData] = useState({
//     publisherName: "",
//     currency: "",
//     bidType: "",
//     minBid: "",
//     url: "",
//     country: "",
//     industry: "",
//     publisherFeedExtraTags: "",
//     contactName: "",
//     mobileNumber: "",
//     email: "",
//     billing: "",
//     ftpHost: "",
//     ftpUsername: "",
//     ftpPort: "",
//     ftpPassword: "",
//     alertRecipients: "",
//     enablePerClientPlacements: false,
//     showClientsOnDashboard: false,
//     loginFullName: "",
//     loginEmail: "",
//     loginPassword: "",
//     facebookEmail: "",
//     facebookPassword: "",
//   })

//   const [contacts, setContacts] = useState([])

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   const handleAddContact = () => {
//     if (formData.contactName && formData.mobileNumber && formData.email) {
//       setContacts((prev) => [
//         ...prev,
//         {
//           name: formData.contactName,
//           mobile: formData.mobileNumber,
//           email: formData.email,
//           billing: formData.billing,
//         },
//       ])

//       // Clear contact fields
//       setFormData((prev) => ({
//         ...prev,
//         contactName: "",
//         mobileNumber: "",
//         email: "",
//         billing: "",
//       }))

//       alert("Contact added successfully!")
//     } else {
//       alert("Please fill in all required contact fields")
//     }
//   }

//   const handleSubmit = () => {
//     // Basic validation
//     if (!formData.publisherName || !formData.currency || !formData.bidType) {
//       alert("Please fill in all required fields")
//       return
//     }

//     console.log("Submitting publisher data:", { ...formData, contacts })
//     alert("Publisher added successfully!")

//     // Reset form after successful submission
//     handleCancel()
//   }

//   const handleCancel = () => {
//     setFormData({
//       publisherName: "",
//       currency: "",
//       bidType: "",
//       minBid: "",
//       url: "",
//       country: "",
//       industry: "",
//       publisherFeedExtraTags: "",
//       contactName: "",
//       mobileNumber: "",
//       email: "",
//       billing: "",
//       ftpHost: "",
//       ftpUsername: "",
//       ftpPort: "",
//       ftpPassword: "",
//       alertRecipients: "",
//       enablePerClientPlacements: false,
//       showClientsOnDashboard: false,
//       loginFullName: "",
//       loginEmail: "",
//       loginPassword: "",
//       facebookEmail: "",
//       facebookPassword: "",
//     })
//     setContacts([])
//   }

//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-6">
//       <h2 className="text-2xl font-bold">Add New Publisher</h2>

//       {/* Basic Information */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Basic Information</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div>
//               <Label htmlFor="publisherName">Publisher Name *</Label>
//               <Input
//                 id="publisherName"
//                 placeholder="eg. Marco Faloppa"
//                 value={formData.publisherName}
//                 onChange={(e) => handleInputChange("publisherName", e.target.value)}
//               />
//             </div>

//             <div>
//               <Label htmlFor="currency">Currency *</Label>
//               <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select currency" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="USD">USD</SelectItem>
//                   <SelectItem value="EUR">EUR</SelectItem>
//                   <SelectItem value="GBP">GBP</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <Label htmlFor="bidType">Bid Type *</Label>
//               <Select value={formData.bidType} onValueChange={(value) => handleInputChange("bidType", value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select bid type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="CPA">CPA</SelectItem>
//                   <SelectItem value="CPC">CPC</SelectItem>
//                   <SelectItem value="CPM">CPM</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <Label htmlFor="minBid">Min Bid</Label>
//               <Input
//                 id="minBid"
//                 placeholder="0.25"
//                 value={formData.minBid}
//                 onChange={(e) => handleInputChange("minBid", e.target.value)}
//               />
//             </div>

//             <div>
//               <Label htmlFor="url">URL</Label>
//               <Input
//                 id="url"
//                 placeholder="https://example.com"
//                 value={formData.url}
//                 onChange={(e) => handleInputChange("url", e.target.value)}
//               />
//             </div>

//             <div>
//               <Label htmlFor="country">Country</Label>
//               <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select country" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="US">United States</SelectItem>
//                   <SelectItem value="UK">United Kingdom</SelectItem>
//                   <SelectItem value="DE">Germany</SelectItem>
//                   <SelectItem value="SG">Singapore</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <Label htmlFor="industry">Industry</Label>
//               <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select industry" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Technology">Technology</SelectItem>
//                   <SelectItem value="Finance">Finance</SelectItem>
//                   <SelectItem value="Healthcare">Healthcare</SelectItem>
//                   <SelectItem value="Accounting">Accounting</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="md:col-span-2 lg:col-span-4">
//               <Label htmlFor="publisherFeedExtraTags">Publisher Feed Extra Tags</Label>
//               <Select
//                 value={formData.publisherFeedExtraTags}
//                 onValueChange={(value) => handleInputChange("publisherFeedExtraTags", value)}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select tags" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="tag1">Tag 1</SelectItem>
//                   <SelectItem value="tag2">Tag 2</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Contact Details */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Contact Details</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//             <div>
//               <Label htmlFor="contactName">Name</Label>
//               <Input
//                 id="contactName"
//                 placeholder="eg. Marco Faloppa"
//                 value={formData.contactName}
//                 onChange={(e) => handleInputChange("contactName", e.target.value)}
//               />
//             </div>

//             <div>
//               <Label htmlFor="mobileNumber">Mobile Number</Label>
//               <Input
//                 id="mobileNumber"
//                 placeholder="+1234567890"
//                 value={formData.mobileNumber}
//                 onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
//               />
//             </div>

//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="email@example.com"
//                 value={formData.email}
//                 onChange={(e) => handleInputChange("email", e.target.value)}
//               />
//             </div>

//             <div>
//               <Label htmlFor="billing">Billing</Label>
//               <Input
//                 id="billing"
//                 placeholder="Billing info"
//                 value={formData.billing}
//                 onChange={(e) => handleInputChange("billing", e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="flex justify-end">
//             <Button onClick={handleAddContact}>Add Contact</Button>
//           </div>

//           {/* Display added contacts */}
//           {contacts.length > 0 && (
//             <div className="mt-4">
//               <h4 className="font-medium mb-2">Added Contacts:</h4>
//               <div className="space-y-2">
//                 {contacts.map((contact, index) => (
//                   <div key={index} className="p-2 bg-muted rounded text-sm">
//                     {contact.name} - {contact.mobile} - {contact.email} - {contact.billing}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* FTP Details */}
//       <Card>
//         <CardHeader>
//           <CardTitle>FTP Details</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div>
//               <Label htmlFor="ftpHost">Host</Label>
//               <Input
//                 id="ftpHost"
//                 placeholder="ftp.example.com"
//                 value={formData.ftpHost}
//                 onChange={(e) => handleInputChange("ftpHost", e.target.value)}
//               />
//             </div>

//             <div>
//               <Label htmlFor="ftpUsername">User Name</Label>
//               <Input
//                 id="ftpUsername"
//                 placeholder="username"
//                 value={formData.ftpUsername}
//                 onChange={(e) => handleInputChange("ftpUsername", e.target.value)}
//               />
//             </div>

//             <div>
//               <Label htmlFor="ftpPort">Port</Label>
//               <Input
//                 id="ftpPort"
//                 placeholder="21"
//                 value={formData.ftpPort}
//                 onChange={(e) => handleInputChange("ftpPort", e.target.value)}
//               />
//             </div>

//             <div className="md:col-span-2">
//               <Label htmlFor="alertRecipients">Alert Recipients</Label>
//               <Input
//                 id="alertRecipients"
//                 placeholder="email1@example.com, email2@example.com"
//                 value={formData.alertRecipients}
//                 onChange={(e) => handleInputChange("alertRecipients", e.target.value)}
//               />
//             </div>

//             <div>
//               <Label htmlFor="ftpPassword">Password</Label>
//               <Input
//                 id="ftpPassword"
//                 type="password"
//                 placeholder="Password"
//                 value={formData.ftpPassword}
//                 onChange={(e) => handleInputChange("ftpPassword", e.target.value)}
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Settings */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Settings</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="font-medium">Feed Settings</h4>
//               <p className="text-sm text-muted-foreground">Enable per Client Placements</p>
//             </div>
//             <Switch
//               checked={formData.enablePerClientPlacements}
//               onCheckedChange={(checked) => handleInputChange("enablePerClientPlacements", checked)}
//             />
//           </div>

//           <Separator />

//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="font-medium">Publisher Dashboard Settings</h4>
//               <p className="text-sm text-muted-foreground">Show Clients on Publisher Dashboard</p>
//             </div>
//             <Switch
//               checked={formData.showClientsOnDashboard}
//               onCheckedChange={(checked) => handleInputChange("showClientsOnDashboard", checked)}
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Publisher Login */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Publisher Login</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <Label htmlFor="loginFullName">Full Name</Label>
//               <Input
//                 id="loginFullName"
//                 placeholder="eg. Marco Faloppa"
//                 value={formData.loginFullName}
//                 onChange={(e) => handleInputChange("loginFullName", e.target.value)}
//               />
//             </div>

//             <div>
//               <Label htmlFor="loginEmail">Email</Label>
//               <Input
//                 id="loginEmail"
//                 type="email"
//                 placeholder="email@example.com"
//                 value={formData.loginEmail}
//                 onChange={(e) => handleInputChange("loginEmail", e.target.value)}
//               />
//             </div>

//             <div>
//               <Label htmlFor="loginPassword">Password</Label>
//               <Input
//                 id="loginPassword"
//                 type="password"
//                 placeholder="Password"
//                 value={formData.loginPassword}
//                 onChange={(e) => handleInputChange("loginPassword", e.target.value)}
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Facebook Credentials */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Publisher Facebook Credentials</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="facebookEmail">Registered Email / Number</Label>
//               <Input
//                 id="facebookEmail"
//                 placeholder="email@example.com"
//                 value={formData.facebookEmail}
//                 onChange={(e) => handleInputChange("facebookEmail", e.target.value)}
//               />
//             </div>

//             <div>
//               <Label htmlFor="facebookPassword">Facebook Password</Label>
//               <Input
//                 id="facebookPassword"
//                 type="password"
//                 placeholder="Password"
//                 value={formData.facebookPassword}
//                 onChange={(e) => handleInputChange("facebookPassword", e.target.value)}
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Action Buttons */}
//       <div className="flex justify-end gap-4">
//         <Button variant="outline" onClick={handleCancel} className="text-red-600 border-red-600 hover:bg-red-50">
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit}>Submit</Button>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Switch from "@mui/material/Switch"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import Chip from "@mui/material/Chip"

export function AddPublisher() {
  const [formData, setFormData] = useState({
    publisherName: "",
    currency: "",
    bidType: "",
    minBid: "",
    url: "",
    country: "",
    industry: "",
    publisherFeedExtraTags: "",
    contactName: "",
    mobileNumber: "",
    email: "",
    billing: "",
    ftpHost: "",
    ftpUsername: "",
    ftpPort: "",
    ftpPassword: "",
    alertRecipients: "",
    enablePerClientPlacements: false,
    showClientsOnDashboard: false,
    loginFullName: "",
    loginEmail: "",
    loginPassword: "",
    facebookEmail: "",
    facebookPassword: "",
  })

  const [contacts, setContacts] = useState([])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddContact = () => {
    if (formData.contactName && formData.mobileNumber && formData.email) {
      setContacts((prev) => [
        ...prev,
        {
          name: formData.contactName,
          mobile: formData.mobileNumber,
          email: formData.email,
          billing: formData.billing,
        },
      ])

      // Clear contact fields
      setFormData((prev) => ({
        ...prev,
        contactName: "",
        mobileNumber: "",
        email: "",
        billing: "",
      }))

      alert("Contact added successfully!")
    } else {
      alert("Please fill in all required contact fields")
    }
  }

  const handleSubmit = () => {
    // Basic validation
    if (!formData.publisherName || !formData.currency || !formData.bidType) {
      alert("Please fill in all required fields")
      return
    }

    console.log("Submitting publisher data:", { ...formData, contacts })
    alert("Publisher added successfully!")

    // Reset form after successful submission
    handleCancel()
  }

  const handleCancel = () => {
    setFormData({
      publisherName: "",
      currency: "",
      bidType: "",
      minBid: "",
      url: "",
      country: "",
      industry: "",
      publisherFeedExtraTags: "",
      contactName: "",
      mobileNumber: "",
      email: "",
      billing: "",
      ftpHost: "",
      ftpUsername: "",
      ftpPort: "",
      ftpPassword: "",
      alertRecipients: "",
      enablePerClientPlacements: false,
      showClientsOnDashboard: false,
      loginFullName: "",
      loginEmail: "",
      loginPassword: "",
      facebookEmail: "",
      facebookPassword: "",
    })
    setContacts([])
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Add New Publisher
      </Typography>

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
                onChange={(e) => handleInputChange("publisherName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Currency</InputLabel>
                <Select
                  label="Currency"
                  value={formData.currency}
                  onChange={(e) => handleInputChange("currency", e.target.value)}
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Bid Type</InputLabel>
                <Select
                  label="Bid Type"
                  value={formData.bidType}
                  onChange={(e) => handleInputChange("bidType", e.target.value)}
                >
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
                onChange={(e) => handleInputChange("minBid", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="URL"
                placeholder="https://example.com"
                size="small"
                value={formData.url}
                onChange={(e) => handleInputChange("url", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Country</InputLabel>
                <Select
                  label="Country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                >
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
                <Select
                  label="Industry"
                  value={formData.industry}
                  onChange={(e) => handleInputChange("industry", e.target.value)}
                >
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
                  onChange={(e) => handleInputChange("publisherFeedExtraTags", e.target.value)}
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
                onChange={(e) => handleInputChange("contactName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Mobile Number"
                placeholder="+1234567890"
                size="small"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
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
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Billing"
                placeholder="Billing info"
                size="small"
                value={formData.billing}
                onChange={(e) => handleInputChange("billing", e.target.value)}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
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
                    sx={{ justifyContent: "flex-start" }}
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
                onChange={(e) => handleInputChange("ftpHost", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="User Name"
                placeholder="username"
                size="small"
                value={formData.ftpUsername}
                onChange={(e) => handleInputChange("ftpUsername", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Port"
                placeholder="21"
                size="small"
                value={formData.ftpPort}
                onChange={(e) => handleInputChange("ftpPort", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Alert Recipients"
                placeholder="email1@example.com, email2@example.com"
                size="small"
                value={formData.alertRecipients}
                onChange={(e) => handleInputChange("alertRecipients", e.target.value)}
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
                onChange={(e) => handleInputChange("ftpPassword", e.target.value)}
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
                  onChange={(e) => handleInputChange("enablePerClientPlacements", e.target.checked)}
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
                  onChange={(e) => handleInputChange("showClientsOnDashboard", e.target.checked)}
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
                onChange={(e) => handleInputChange("loginFullName", e.target.value)}
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
                onChange={(e) => handleInputChange("loginEmail", e.target.value)}
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
                onChange={(e) => handleInputChange("loginPassword", e.target.value)}
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
                onChange={(e) => handleInputChange("facebookEmail", e.target.value)}
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
                onChange={(e) => handleInputChange("facebookPassword", e.target.value)}
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
  )
}
