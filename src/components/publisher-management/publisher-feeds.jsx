// "use client"

// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Copy } from "lucide-react"

// const publisherFeedsData = [
//   {
//     id: 1,
//     publisherName: "Publisher Name",
//     client: "Client Name - US - CPA",
//     feedUrl: "JobRapido - US, JopRapido - US (CPA)",
//     jobsCount: "0000",
//   },
//   {
//     id: 2,
//     publisherName: "Publisher Name",
//     client: "Client Name - US - CPA",
//     feedUrl: "JobRapido - US, JopRapido - US (CPA)",
//     jobsCount: "0000",
//   },
//   {
//     id: 3,
//     publisherName: "Publisher Name",
//     client: "Client Name - US - CPA",
//     feedUrl: "JobRapido - US, JopRapido - US (CPA)",
//     jobsCount: "0000",
//   },
// ]

// export function PublisherFeeds() {
//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text)
//     alert("Copied to clipboard!")
//   }

//   return (
//     <div className="p-6">
//       <div className="border rounded-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-muted/50">
//               <tr>
//                 <th className="p-4 text-left font-medium">Publisher Name</th>
//                 <th className="p-4 text-left font-medium">Client</th>
//                 <th className="p-4 text-left font-medium">Feed URL</th>
//                 <th className="p-4 text-left font-medium">Jobs Count</th>
//               </tr>
//             </thead>
//             <tbody>
//               {publisherFeedsData.map((feed) => (
//                 <tr key={feed.id} className="border-t hover:bg-muted/25">
//                   <td className="p-4">{feed.publisherName}</td>
//                   <td className="p-4">
//                     <Badge variant="secondary">{feed.client}</Badge>
//                   </td>
//                   <td className="p-4">
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => copyToClipboard(feed.feedUrl)}
//                           className="h-6 w-6 p-0"
//                         >
//                           <Copy className="h-3 w-3" />
//                         </Button>
//                         <span className="text-sm">{feed.feedUrl}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => copyToClipboard(feed.feedUrl)}
//                           className="h-6 w-6 p-0"
//                         >
//                           <Copy className="h-3 w-3" />
//                         </Button>
//                         <Badge variant="default" className="bg-green-500 text-white text-xs h-5">
//                           S3 URL
//                         </Badge>
//                         <span className="text-sm">{feed.feedUrl}</span>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-4 font-mono">{feed.jobsCount}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }
'use client';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Copy } from 'lucide-react';

const publisherFeedsData = [
  {
    id: 1,
    publisherName: 'Publisher Name',
    client: 'Client Name - US - CPA',
    feedUrl: 'JobRapido - US, JopRapido - US (CPA)',
    jobsCount: '0000'
  },
  {
    id: 2,
    publisherName: 'Publisher Name',
    client: 'Client Name - US - CPA',
    feedUrl: 'JobRapido - US, JopRapido - US (CPA)',
    jobsCount: '0000'
  },
  {
    id: 3,
    publisherName: 'Publisher Name',
    client: 'Client Name - US - CPA',
    feedUrl: 'JobRapido - US, JopRapido - US (CPA)',
    jobsCount: '0000'
  }
];

export function PublisherFeeds() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Publisher Name</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Client</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Feed URL</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Jobs Count</th>
            </tr>
          </thead>
          <tbody>
            {publisherFeedsData.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '12px' }}>
                  <Typography variant="body2">{row.publisherName}</Typography>
                </td>
                <td style={{ padding: '12px' }}>
                  <Chip label={row.client} size="small" sx={{ backgroundColor: '#e0e0e0', color: '#666' }} />
                </td>
                <td style={{ padding: '12px' }}>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton size="small" onClick={() => copyToClipboard(row.feedUrl)}>
                        <Copy size="16" color="#666" />
                      </IconButton>
                      <Typography variant="body2">{row.feedUrl}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton size="small" onClick={() => copyToClipboard(row.feedUrl)}>
                        <Copy size="16" color="#666" />
                      </IconButton>
                      <Chip
                        label="S3 URL"
                        size="small"
                        sx={{ backgroundColor: '#4caf50', color: 'white', fontSize: '10px', height: '20px' }}
                      />
                      <Typography variant="body2">{row.feedUrl}</Typography>
                    </Box>
                  </Stack>
                </td>
                <td style={{ padding: '12px' }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {row.jobsCount}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}
