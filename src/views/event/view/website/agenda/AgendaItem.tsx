/* eslint-disable react-hooks/exhaustive-deps */

// ** MUI Import
import Box from '@mui/material/Box'

import { styled } from '@mui/material/styles'

import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'

import { useCallback } from 'react'

// ** Icons Imports
import Button from '@mui/material/Button'
import Plus from 'mdi-material-ui/Plus'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import EditIcon from '@mui/icons-material/Edit'

import AgendaEventItem from './AgendaEventItem'
import AddEventSidebar from './AddEventSidebar'
import { useState } from 'react'
import {
  Card,
  IconButton,
  CardHeader,
  CardContent,
  Collapse
} from '@mui/material'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { updateAgendaStage } from 'src/@core/api/agenda-api'

import { formatTime } from 'src/@core/utils/dateTime'
import { getAgenda } from 'src/store/event/view/website/agendaStore'

import MenuPopover from 'src/layouts/components/menu'
import MenuItem from '@mui/material/MenuItem'

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
  stages: any[]
  handleDeleteAgenda: (agendaId: number) => void
  handleOpenEditModal: (params: any) => void
  agenda: any
}

const addEventSidebarWidth = 400

const AgendaItem = ({
  title,
  agendaId,
  stages,
  handleDeleteAgenda,
  handleOpenEditModal,
  agenda
}: AgendaItemProps) => {
  const store = useSelector((state: RootState) => state.eventDetail)
  const dispatch = useDispatch<AppDispatch>()

  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const [detailList, setDetailList] = useState<any[]>(stages)
  const [editParams, setEditParams] = useState(null)

  const handleAddEventSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen)
    setEditParams(null)
  }

  const handleAddAgendaDetail = useCallback(
    async ({ agendaId, params }: any) => {
      const items = [
        {
          title: params.title,
          timeStart: formatTime(params.timeStart),
          timeEnd: formatTime(params.timeEnd),
          ...(params.speakerId && { speakerId: params.speakerId }),
          ...(params.description && { description: params.description }),
          ...(params.id && { id: params.id })
        }
      ]
      const response = await updateAgendaStage(agendaId, { items })
      if (response?.[0]?.id) {
        setIsSidebarOpen(false)
        handleGetAgenda()
      }
    },
    []
  )

  const handleDeleteAgendaDetail = useCallback(
    async (id: number) => {
      const deleteIds = [id]

      // @ts-ignore
      const response = await updateAgendaStage(agendaId, { deleteIds })
      if (response) {
        const newList = detailList.filter(agenda => agenda.id !== id)
        setDetailList(newList)
        setIsSidebarOpen(false)
      }
    },
    [detailList]
  )

  const handleGetAgenda = () => {
    agendaId && dispatch(getAgenda(store.eventData.id))
  }

  const handleSetEditParams = (params: any) => {
    setEditParams(params)
    setIsSidebarOpen(true)
  }

  return (
    <Card variant='outlined' sx={{ boxShadow: 0, mb: 4 }}>
      <CardHeader
        title={title}
        action={
          <Box sx={{ display: 'flex' }}>
            <MenuPopover>
              <MenuItem>
                <Button
                  sx={{ mr: 10 }}
                  size='small'
                  variant='text'
                  startIcon={<EditIcon fontSize='small' />}
                  onClick={() => handleOpenEditModal(agenda)}
                  color='secondary'
                >
                  Edit Agenda
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  sx={{ mr: 10 }}
                  size='small'
                  variant='text'
                  startIcon={<HighlightOffIcon fontSize='small' />}
                  onClick={() => handleDeleteAgenda(Number(agendaId))}
                  color='secondary'
                >
                  Delete Agenda
                </Button>
              </MenuItem>

              <MenuItem>
                <Button
                  sx={{ mr: 10 }}
                  size='small'
                  variant='text'
                  startIcon={<Plus fontSize='small' />}
                  onClick={handleAddEventSidebarToggle}
                  color='secondary'
                >
                  Add Event
                </Button>
              </MenuItem>
            </MenuPopover>

            <IconButton
              size='small'
              aria-label='collapse'
              sx={{ color: 'text.secondary' }}
              onClick={() => setCollapsed(!collapsed)}
            >
              {!collapsed ? (
                <ChevronDown fontSize='small' />
              ) : (
                <ChevronUp fontSize='small' />
              )}
            </IconButton>
          </Box>
        }
      />
      <Collapse in={collapsed}>
        <CardContent sx={{ maxHeight: '40vh', overflowY: 'auto' }}>
          <Timeline>
            {detailList?.map((stage, idx) => {
              return (
                <AgendaEventItem
                  key={idx}
                  stage={stage}
                  handleDeleteAgendaDetail={handleDeleteAgendaDetail}
                  handleSetEditParams={handleSetEditParams}
                />
              )
            })}
          </Timeline>
          {isSidebarOpen && (
            <AddEventSidebar
              drawerWidth={addEventSidebarWidth}
              isSidebarOpen={isSidebarOpen}
              handleAddEventSidebarToggle={handleAddEventSidebarToggle}
              agendaId={agendaId}
              editParams={editParams}
              handleAddAgendaDetail={handleAddAgendaDetail}
            />
          )}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default AgendaItem
