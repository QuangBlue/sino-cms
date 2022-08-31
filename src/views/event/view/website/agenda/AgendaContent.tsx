import { useCallback } from 'react'
// ** React Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid
} from '@mui/material'

import { Plus } from 'mdi-material-ui'
import { useState } from 'react'

import AgendaItem from './AgendaItem'
import DialogAddAgenda from './DialogAddAgenda'

import { deleteAgenda, editAgenda } from 'src/@core/api/agenda-api'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'

import { getAgenda } from 'src/store/event/view/website/agendaStore'
import { getSpeaker } from 'src/store/event/view/website/speakerStore'
import toast from 'react-hot-toast'

import AgendaActions from './AgendaActions'
import { AGENDA } from 'src/constants/headers'
import {
  getHeaderByKey,
  editHeader
} from 'src/store/event/view/website/settingsStore'

import orderBy from 'lodash/orderBy'
import { formatDateFromTime } from 'src/@core/utils/dateTime'

const AgendaContent = ({}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [editParams, setEditParams] = useState<any>(null)

  const settingStore = useSelector((state: RootState) => state.settingWebsite)

  const [header, setHeader] = useState<any>({
    key: AGENDA,
    title: settingStore.header?.[0]?.title || '',
    isPublished: settingStore.header?.[0]?.isPublished || false
  })

  useEffect(() => {
    const header = {
      key: AGENDA,
      title: settingStore.header?.[0]?.title,
      isPublished: settingStore.header?.[0]?.isPublished || false
    }
    setHeader(header)
  }, [settingStore.header])

  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => {
    setOpen(false)
    setEditParams(null)
  }

  // ** Redux
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.eventDetail)
  const agendaStore = useSelector((state: RootState) => state.agendaWebsite)

  const { agendaList } = agendaStore
  const { id, baseName } = store?.eventData
  useEffect(() => {
    if (baseName) {
      handleFetchingDate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch, baseName])

  const handleDeleteAgenda = async (agendaId: number) => {
    const response = await deleteAgenda(agendaId)
    if (response) {
      dispatch(getAgenda(id))
      toast.success('Delete Agenda successfully!')
    } else {
      toast.error('Something went wrong!')
    }
  }

  const handleFetchingDate = () => {
    dispatch(getAgenda(id))
    dispatch(getSpeaker(baseName))
    dispatch(getHeaderByKey({ eventId: id, key: AGENDA }))
  }

  const handleEditAgenda = async (params: any) => {
    const response = await editAgenda(params.id, params)
    if (response.id) {
      dispatch(getAgenda(id))
      toast.success('Edit Agenda successfully!')
      handleDialogClose()
    } else {
      toast.error('Something went wrong!')
    }
  }

  const handleOpenEditModal = (params: any) => {
    setEditParams(params)
    setOpen(true)
  }

  // Header
  const handleToggleAgendaHeader = useCallback(
    (checked: boolean) => {
      setHeader({ ...header, isPublished: checked })
    },
    [header]
  )

  const handleSave = () => {
    dispatch(editHeader({ eventId: id, params: [header] }))
  }

  return (
    <Box sx={{ my: 4, mx: 4 }}>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={6}>
            <Card>
              <CardHeader
                title='List Agenda'
                action={
                  <Box>
                    <TextField
                      size='small'
                      placeholder='Search Agenda'
                      sx={{ mr: 4, mb: 2, maxWidth: '180px' }}
                    />
                    <Button
                      variant='contained'
                      startIcon={<Plus fontSize='small' />}
                      onClick={handleClickOpen}
                    >
                      Add Agenda
                    </Button>
                  </Box>
                }
              />

              <CardContent>
                {agendaList?.length > 0 &&
                  agendaList.map(agenda => {
                    const sortedStages = orderBy(
                      agenda.stages,
                      [
                        item => {
                          return formatDateFromTime(item.timeStart)
                        }
                      ],
                      ['asc']
                    )

                    return (
                      <AgendaItem
                        key={agenda.id}
                        title={agenda.name}
                        agendaId={agenda.id}
                        stages={sortedStages}
                        handleDeleteAgenda={handleDeleteAgenda}
                        handleOpenEditModal={handleOpenEditModal}
                        agenda={agenda}
                      />
                    )
                  })}
              </CardContent>
            </Card>
            {open && (
              <DialogAddAgenda
                handleDialogClose={handleDialogClose}
                open={open}
                editParams={editParams}
                handleEditAgenda={handleEditAgenda}
              />
            )}
          </Box>
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <AgendaActions
            handleSave={handleSave}
            agendaHeader={header}
            handleToggleAgendaHeader={handleToggleAgendaHeader}
            handleChangeLang={handleFetchingDate}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default AgendaContent
