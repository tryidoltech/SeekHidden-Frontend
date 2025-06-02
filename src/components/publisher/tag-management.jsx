// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// export function TagManagement() {
//   const [selectedClient, setSelectedClient] = useState("")
//   const [selectedCampaign, setSelectedCampaign] = useState("")
//   const [selectedJobs, setSelectedJobs] = useState("")
//   const [tagInput, setTagInput] = useState("")
//   const [placements, setPlacements] = useState([
//     { id: 1, name: "careerdays.io", checked: false, tags: [] },
//     { id: 2, name: "adzuna.com", checked: false, tags: [] },
//     { id: 3, name: "adzuna.com", checked: false, tags: [] },
//     { id: 4, name: "adzuna.com", checked: false, tags: [] },
//     { id: 5, name: "adzuna.com", checked: false, tags: [] },
//     { id: 6, name: "Google Awards", checked: false, tags: [] },
//     { id: 7, name: "adzuna.com", checked: false, tags: [] },
//     { id: 8, name: "adzuna.com", checked: false, tags: [] },
//   ])

//   const handlePlacementToggle = (id) => {
//     setPlacements((prev) =>
//       prev.map((placement) => (placement.id === id ? { ...placement, checked: !placement.checked } : placement)),
//     )
//   }

//   const handleSubmit = () => {
//     if (selectedClient && selectedCampaign && selectedJobs) {
//       console.log("Submitting:", { selectedClient, selectedCampaign, selectedJobs })
//       alert("Configuration submitted successfully!")
//     } else {
//       alert("Please select all required fields")
//     }
//   }

//   const handleApplyTag = () => {
//     if (tagInput.trim()) {
//       const selectedPlacements = placements.filter((p) => p.checked)
//       if (selectedPlacements.length === 0) {
//         alert("Please select at least one placement")
//         return
//       }

//       setPlacements((prev) =>
//         prev.map((placement) =>
//           placement.checked ? { ...placement, tags: [...placement.tags, tagInput.trim()], checked: false } : placement,
//         ),
//       )
//       setTagInput("")
//       alert(`Tag "${tagInput.trim()}" applied to ${selectedPlacements.length} placements`)
//     }
//   }

//   const handleRemoveTag = (placementId, tagIndex) => {
//     setPlacements((prev) =>
//       prev.map((placement) =>
//         placement.id === placementId
//           ? { ...placement, tags: placement.tags.filter((_, index) => index !== tagIndex) }
//           : placement,
//       ),
//     )
//   }

//   return (
//     <div className="p-6">
//       {/* Top Controls */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-4">
//           <Select value={selectedClient} onValueChange={setSelectedClient}>
//             <SelectTrigger className="w-48">
//               <SelectValue placeholder="Select Client" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="client1">Client 1</SelectItem>
//               <SelectItem value="client2">Client 2</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
//             <SelectTrigger className="w-48">
//               <SelectValue placeholder="Select Campaign" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="campaign1">Campaign 1</SelectItem>
//               <SelectItem value="campaign2">Campaign 2</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select value={selectedJobs} onValueChange={setSelectedJobs}>
//             <SelectTrigger className="w-48">
//               <SelectValue placeholder="Select Jobs" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="jobs1">Jobs 1</SelectItem>
//               <SelectItem value="jobs2">Jobs 2</SelectItem>
//             </SelectContent>
//           </Select>

//           <Button onClick={handleSubmit}>Submit</Button>
//         </div>
//       </div>

//       {/* Tab Navigation */}
//       <Tabs defaultValue="manage" className="w-full">
//         <TabsList>
//           <TabsTrigger value="manage">Manage Tags</TabsTrigger>
//           <TabsTrigger value="activity">Activity Log</TabsTrigger>
//         </TabsList>

//         <TabsContent value="manage" className="space-y-6">
//           {/* Create Tag Section */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Create Tag</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex items-center gap-4">
//                 <Input
//                   placeholder="eg. Marco Faloppa"
//                   value={tagInput}
//                   onChange={(e) => setTagInput(e.target.value)}
//                   className="flex-1"
//                 />
//                 <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
//                   Remove
//                 </Button>
//                 <Button onClick={handleApplyTag}>Apply Tag</Button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Placement and Tags Table */}
//           <div className="border rounded-lg overflow-hidden">
//             <table className="w-full">
//               <thead className="bg-muted/50">
//                 <tr>
//                   <th className="p-4 text-left font-medium">Placement</th>
//                   <th className="p-4 text-left font-medium">Tags</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {placements.map((placement) => (
//                   <tr key={placement.id} className="border-t hover:bg-muted/25">
//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <Checkbox
//                           checked={placement.checked}
//                           onCheckedChange={() => handlePlacementToggle(placement.id)}
//                         />
//                         <span>{placement.name}</span>
//                       </div>
//                     </td>
//                     <td className="p-4">
//                       {placement.tags.length > 0 ? (
//                         <div className="flex flex-wrap gap-2">
//                           {placement.tags.map((tag, index) => (
//                             <div
//                               key={index}
//                               className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
//                             >
//                               {tag}
//                               <button
//                                 onClick={() => handleRemoveTag(placement.id, index)}
//                                 className="ml-1 text-blue-600 hover:text-blue-800"
//                               >
//                                 ×
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <span className="text-muted-foreground">---</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </TabsContent>

//         <TabsContent value="activity">
//           <Card>
//             <CardContent className="p-6">
//               <p className="text-muted-foreground">Activity log will be displayed here...</p>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Checkbox from "@mui/material/Checkbox"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Chip from "@mui/material/Chip"

export function TagManagement() {
  const [selectedClient, setSelectedClient] = useState("")
  const [selectedCampaign, setSelectedCampaign] = useState("")
  const [selectedJobs, setSelectedJobs] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [placements, setPlacements] = useState([
    { id: 1, name: "careerdays.io", checked: false, tags: [] },
    { id: 2, name: "adzuna.com", checked: false, tags: [] },
    { id: 3, name: "adzuna.com", checked: false, tags: [] },
    { id: 4, name: "adzuna.com", checked: false, tags: [] },
    { id: 5, name: "adzuna.com", checked: false, tags: [] },
    { id: 6, name: "Google Awards", checked: false, tags: [] },
    { id: 7, name: "adzuna.com", checked: false, tags: [] },
    { id: 8, name: "adzuna.com", checked: false, tags: [] },
  ])

  const handlePlacementToggle = (id) => {
    setPlacements((prev) =>
      prev.map((placement) => (placement.id === id ? { ...placement, checked: !placement.checked } : placement)),
    )
  }

  const handleSubmit = () => {
    if (selectedClient && selectedCampaign && selectedJobs) {
      console.log("Submitting:", { selectedClient, selectedCampaign, selectedJobs })
      alert("Configuration submitted successfully!")
    } else {
      alert("Please select all required fields")
    }
  }

  const handleApplyTag = () => {
    if (tagInput.trim()) {
      const selectedPlacements = placements.filter((p) => p.checked)
      if (selectedPlacements.length === 0) {
        alert("Please select at least one placement")
        return
      }

      setPlacements((prev) =>
        prev.map((placement) =>
          placement.checked ? { ...placement, tags: [...placement.tags, tagInput.trim()], checked: false } : placement,
        ),
      )
      setTagInput("")
      alert(`Tag "${tagInput.trim()}" applied to ${selectedPlacements.length} placements`)
    }
  }

  const handleRemoveTag = (placementId, tagIndex) => {
    setPlacements((prev) =>
      prev.map((placement) =>
        placement.id === placementId
          ? { ...placement, tags: placement.tags.filter((_, index) => index !== tagIndex) }
          : placement,
      ),
    )
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* Top Controls */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          mb: 3,
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Select Client</InputLabel>
            <Select label="Select Client" value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
              <MenuItem value="client1">Client 1</MenuItem>
              <MenuItem value="client2">Client 2</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Select Campaign</InputLabel>
            <Select
              label="Select Campaign"
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
            >
              <MenuItem value="campaign1">Campaign 1</MenuItem>
              <MenuItem value="campaign2">Campaign 2</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Select Jobs</InputLabel>
            <Select label="Select Jobs" value={selectedJobs} onChange={(e) => setSelectedJobs(e.target.value)}>
              <MenuItem value="jobs1">Jobs 1</MenuItem>
              <MenuItem value="jobs2">Jobs 2</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Stack>

      {/* Tab Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Stack direction="row" spacing={4}>
          <Button
            sx={{
              textTransform: "none",
              borderBottom: "2px solid #1976d2",
              color: "#1976d2",
              borderRadius: 0,
              pb: 1,
            }}
          >
            Manage Tags
          </Button>
          <Button sx={{ textTransform: "none", color: "text.secondary", pb: 1 }}>Activity Log</Button>
        </Stack>
      </Box>

      {/* Create Tag Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Create Tag
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              placeholder="eg. Marco Faloppa"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              size="small"
              sx={{ flex: 1 }}
            />
            <Button variant="outlined" color="error">
              Remove
            </Button>
            <Button variant="contained" onClick={handleApplyTag}>
              Apply Tag
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Placement and Tags Table */}
      <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 1, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th style={{ padding: "16px", textAlign: "left", fontWeight: 600 }}>Placement</th>
              <th style={{ padding: "16px", textAlign: "left", fontWeight: 600 }}>Tags</th>
            </tr>
          </thead>
          <tbody>
            {placements.map((placement) => (
              <tr key={placement.id} style={{ borderTop: "1px solid #e0e0e0" }}>
                <td style={{ padding: "16px" }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Checkbox checked={placement.checked} onChange={() => handlePlacementToggle(placement.id)} />
                    <Typography variant="body2">{placement.name}</Typography>
                  </Stack>
                </td>
                <td style={{ padding: "16px" }}>
                  {placement.tags.length > 0 ? (
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {placement.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          onDelete={() => handleRemoveTag(placement.id, index)}
                          sx={{ backgroundColor: "#e3f2fd", color: "#1976d2" }}
                        />
                      ))}
                    </Stack>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      ---
                    </Typography>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  )
}
