import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import { Avatar, Box, Divider, IconButton, Typography } from '@mui/material'
import { Pencil, DeleteForever } from 'mdi-material-ui'
import { formatDisplayTime } from 'src/@core/utils/dateTime'

interface AgendaEventItemProps {
  stage: any
  handleDeleteAgendaDetail: (id: number) => void
  handleSetEditParams: (params: any) => void
}

export default function AgendaEventItem({
  stage,
  handleDeleteAgendaDetail,
  handleSetEditParams
}: AgendaEventItemProps) {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color='primary' />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            variant='body2'
            sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}
          >
            {`${formatDisplayTime(stage?.timeStart)} - ${formatDisplayTime(
              stage?.timeEnd
            )}`}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <IconButton
                sx={{ color: 'text.secondary' }}
                onClick={() => handleSetEditParams(stage)}
              >
                <Pencil fontSize='small' />
              </IconButton>
              <IconButton
                sx={{ color: 'text.secondary' }}
                onClick={() => handleDeleteAgendaDetail(stage.id)}
              >
                <DeleteForever fontSize='small' />
              </IconButton>
            </div>
          </Box>
        </Box>

        <Box
          sx={{
            mb: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            variant='body2'
            sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}
          >
            {stage.title}
          </Typography>
        </Box>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {stage.description}
        </Typography>

        {stage?.speaker && (
          <>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex' }}>
                <Avatar
                  src={stage?.speaker?.avatar}
                  sx={{ width: '2rem', height: '2rem', mr: 2 }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    {stage?.speaker?.name}
                  </Typography>
                  <Typography variant='caption'>
                    {stage?.speaker?.jobTitle}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </TimelineContent>
    </TimelineItem>
  )
}
