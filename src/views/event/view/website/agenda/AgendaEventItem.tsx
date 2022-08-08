import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import { Avatar, Box, Divider, IconButton, Typography } from '@mui/material'
import { Pencil, DeleteForever } from 'mdi-material-ui'

interface AgendaEventItemProps {
  handleAddEventSidebarToggle: () => void
}

export default function AgendaEventItem(props: AgendaEventItemProps) {
  const { handleAddEventSidebarToggle } = props

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color='primary' />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
            8:30am - 9:30am
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <IconButton sx={{ color: 'text.secondary' }} onClick={handleAddEventSidebarToggle}>
                <Pencil fontSize='small' />
              </IconButton>
              <IconButton sx={{ color: 'text.secondary' }}>
                <DeleteForever fontSize='small' />
              </IconButton>
            </div>
          </Box>
        </Box>

        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
            Registration
          </Typography>
        </Box>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus quos, voluptates voluptas rem.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <Avatar src='/images/avatars/2.png' sx={{ width: '2rem', height: '2rem', mr: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Main Speaker
              </Typography>
              <Typography variant='caption'>CEO - Sino Elite</Typography>
            </Box>
          </Box>
        </Box>
      </TimelineContent>
    </TimelineItem>
  )
}
