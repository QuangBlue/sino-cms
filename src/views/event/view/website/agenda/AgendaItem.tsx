import { useEffect } from 'react'

// ** MUI Import
import Box from '@mui/material/Box'

import { styled } from '@mui/material/styles'

import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'

// ** Icons Imports
import Button from '@mui/material/Button'
import Plus from 'mdi-material-ui/Plus'

import AgendaEventItem from './AgendaEventItem'
import AddEventSidebar from './AddEventSidebar'
import { useState } from 'react'
import { Card, IconButton, CardHeader, CardContent, Collapse } from '@mui/material'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import { getAgendaDetail } from 'src/store/event/view/website/agendaStore'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

interface AgendaItemProps {
  title: string
  agendaId: number | undefined
}

const AgendaItem = ({ title, agendaId }: AgendaItemProps) => {
  // ** Vars

  const addEventSidebarWidth = 400
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()
  const agendaStore = useSelector((state: RootState) => state.agendaWebsite)

  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)


  useEffect(() => {
    if (agendaId && collapsed) {
      dispatch(getAgendaDetail(agendaId))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agendaId, collapsed])

  return (
    <Card variant='outlined' sx={{ boxShadow: 0, mb: 4 }}>
      <CardHeader
        title={title}
        action={
          <Box>
            {collapsed && (
              <Button
                size='small'
                variant='contained'
                sx={{ mr: 10 }}
                startIcon={<Plus fontSize='small' />}
                onClick={handleAddEventSidebarToggle}
              >
                Add Event
              </Button>
            )}

            <IconButton
              size='small'
              aria-label='collapse'
              sx={{ color: 'text.secondary' }}
              onClick={() => setCollapsed(!collapsed)}
            >
              {!collapsed ? <ChevronDown fontSize='small' /> : <ChevronUp fontSize='small' />}
            </IconButton>
          </Box>
        }
      />
      <Collapse in={collapsed}>
        <CardContent>
          <Timeline>
            <AgendaEventItem handleAddEventSidebarToggle={handleAddEventSidebarToggle} />
            <AgendaEventItem handleAddEventSidebarToggle={handleAddEventSidebarToggle} />
          </Timeline>
          <AddEventSidebar
            drawerWidth={addEventSidebarWidth}
            addEventSidebarOpen={addEventSidebarOpen}
            handleAddEventSidebarToggle={handleAddEventSidebarToggle}
            agendaId={agendaId}
          />
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default AgendaItem
