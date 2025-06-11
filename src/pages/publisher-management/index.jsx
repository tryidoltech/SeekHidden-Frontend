"use client"

import { useState } from "react"
import PropTypes from "prop-types"
import Box from "@mui/material/Box"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { Add } from "iconsax-react"
import { PublishersTable } from "../../components/publisher-management/publisher-table"
import { PublishersStats } from "../../components/publisher-management/publisher-stats"
import { PublisherFeeds } from "../../components/publisher-management/publisher-feeds"
import { TagManagement } from "../../components/publisher-management/tag-management"
import { PublisherGraphs } from "../../components/publisher-management/publisher-graphs"
import { AddPublisher } from "../../components/publisher-management/add-publisher"

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

export default function PublisherManagement() {
  const [value, setValue] = useState(0)
  const [showAddPublisher, setShowAddPublisher] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    setShowAddPublisher(false) // Hide add publisher when switching tabs
  }

  const handleAddPublisher = () => {
    setShowAddPublisher(true)
  }

  const handleBackToTabs = () => {
    setShowAddPublisher(false)
  }

  if (showAddPublisher) {
    return (
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <AddPublisher onBack={handleBackToTabs} />
      </Box>
    )
  }

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 3 }}>
          <Tabs value={value} onChange={handleChange} aria-label="publisher management tabs">
            <Tab label="All Publishers" {...a11yProps(0)} />
            <Tab label="Publishers Stats" {...a11yProps(1)} />
            <Tab label="Publisher Feeds" {...a11yProps(2)} />
            <Tab label="Tag Management" {...a11yProps(3)} />
            <Tab label="Stats" {...a11yProps(4)} />
          </Tabs>

          <Button
            variant="contained"
            startIcon={<Add size="16" />}
            onClick={handleAddPublisher}
            sx={{ mb: 1 }}
          >
            Add Publisher
          </Button>
        </Stack>
      </Box>

      <TabPanel value={value} index={0}>
        <PublishersTable />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <PublishersStats />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <PublisherFeeds />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <TagManagement />
      </TabPanel>

      <TabPanel value={value} index={4}>
        <PublisherGraphs />
      </TabPanel>
    </Box>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number,
  other: PropTypes.any,
}
