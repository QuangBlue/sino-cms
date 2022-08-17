import React, { useCallback, useState } from 'react'
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import DialogAddSponsorshipGroup from './DialogAddSponsorshipGroup'
import { Plus } from 'mdi-material-ui'
import SponsorshipOpportunitiesItem from './SponsorshipOpportunitiesItem'

import { AppDispatch, RootState } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'

import {
  getSponsorGroup,
  addSponsorGroup,
  editSponsorGroup,
  deleteSponsorGroup,
  getSponsorsType
} from 'src/store/event/view/website/sponsorStore'

interface SponsorshipOpportunitiesProps {
  title: string
  description: any
  contactInfo: any
  handleChangeValue: (name: string, params: any) => void
}

function SponsorshipOpportunities({
  title,
  description,
  contactInfo,
  handleChangeValue
}: SponsorshipOpportunitiesProps) {
  const dispatch = useDispatch<AppDispatch>()
  const sponsorStore = useSelector((state: RootState) => state.sponsorWebsite)
  const eventStore = useSelector((state: RootState) => state.eventDetail)

  const { id } = eventStore?.eventData

  const [openGroup, setOpenGroup] = useState<boolean>(false)
  const [editParams, setEditParams] = useState<any>(null)
  const handleClickOpenGroup = () => setOpenGroup(true)

  const handleDialogCloseGroup = () => {
    setOpenGroup(false)
    setEditParams(null)
  }

  const handleAddSponsorGroup = useCallback(
    async (params: any) => {
      const result = await dispatch(addSponsorGroup({ eventId: id, params }))

      if (result?.payload?.id) {
        dispatch(getSponsorGroup(id))

        handleDialogCloseGroup()
      }
    },
    [dispatch, id]
  )

  const handleDeleteSponsorGroup = useCallback(
    async (groupId: number) => {
      const result = await dispatch(deleteSponsorGroup(groupId))

      if (!result?.payload?.id) {
        dispatch(getSponsorGroup(id))
        handleDialogCloseGroup()
      }
    },
    [dispatch, id]
  )

  const handleEditSponsorGroup = useCallback(
    async (params: any) => {
      const result = await dispatch(editSponsorGroup({ ...params }))

      if (result?.payload?.id) {
        dispatch(getSponsorGroup(id))
        handleDialogCloseGroup()
      }
    },
    [dispatch, id]
  )

  const handleOpenEditSponsorGroup = (params: any) => {
    setEditParams(params)
    handleClickOpenGroup()
  }

  const handleGetSponsors = () => {
    dispatch(getSponsorsType(id))
  }

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 3 }}>
        Title
      </Typography>
      <TextField
        fullWidth
        id='title-sponsorship-opportunities'
        sx={{
          '& .MuiInputBase-input': { color: 'text.secondary', fontWeight: 600 }
        }}
        placeholder='Title Header'
        value={title}
        onChange={e => handleChangeValue('title', e.target.value)}
      />

      <Divider sx={{ my: 6 }} />
      <Typography variant='h6' sx={{ mb: 3 }}>
        Description
      </Typography>
      <EditorWrapper>
        <ReactDraftWysiwyg
          editorState={description}
          onEditorStateChange={data => handleChangeValue('description', data)}
        />
      </EditorWrapper>
      <Divider sx={{ my: 6 }} />

      <Grid
        container
        sx={{ mb: 6, display: 'flex', justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography variant='h6' sx={{ mb: 3 }}>
            Sponsorship Overview
          </Typography>
        </Grid>
        <Grid>
          <Button
            size='small'
            variant='contained'
            startIcon={<Plus fontSize='small' />}
            onClick={handleClickOpenGroup}
          >
            Add Sponsorship Group
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ maxHeight: '55vh', overflowY: 'auto' }}>
        {sponsorStore.sponsorGroup.length > 0 &&
          sponsorStore.sponsorGroup.map(sponsor => {
            return (
              <SponsorshipOpportunitiesItem
                key={sponsor.id}
                groupId={Number(sponsor.id)}
                name={sponsor.name}
                sponsorship={sponsor.levels || []}
                handleDeleteSponsorGroup={handleDeleteSponsorGroup}
                handleOpenEditSponsorGroup={handleOpenEditSponsorGroup}
                handleGetSponsors={handleGetSponsors}
              />
            )
          })}
      </Box>

      <DialogAddSponsorshipGroup
        handleAddSponsorGroup={handleAddSponsorGroup}
        handleDialogClose={handleDialogCloseGroup}
        open={openGroup}
        editParams={editParams}
        handleEditSponsorGroup={handleEditSponsorGroup}
      />
      <Divider sx={{ my: 6 }} />
      <Typography variant='h6' sx={{ mb: 3 }}>
        Contact Information
      </Typography>
      <EditorWrapper>
        <ReactDraftWysiwyg
          editorState={contactInfo}
          onEditorStateChange={data => handleChangeValue('contactInfo', data)}
        />
      </EditorWrapper>
    </Box>
  )
}

export default React.memo(SponsorshipOpportunities)
