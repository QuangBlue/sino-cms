import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material'
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useState } from 'react'
import { EditorState } from 'draft-js'

import DialogAddSponsorshipGroup from './DialogAddSponsorshipGroup'
import { Plus } from 'mdi-material-ui'
import SponsorshipOpportunitiesItem from './SponsorshipOpportunitiesItem'

export default function SponsorshipOpportunities() {
  const [value, setValue] = useState(EditorState.createEmpty())

  const [openGroup, setOpenGroup] = useState<boolean>(false)
  const handleClickOpenGroup = () => setOpenGroup(true)
  const handleDialogCloseGroup = () => setOpenGroup(false)

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 3 }}>
        Title
      </Typography>
      <TextField
        fullWidth
        id='title-sponsorship-opportunities'
        sx={{ '& .MuiInputBase-input': { color: 'text.secondary', fontWeight: 600 } }}
        placeholder='Title Header'
      />

      <Divider sx={{ my: 6 }} />
      <Typography variant='h6' sx={{ mb: 3 }}>
        Description
      </Typography>
      <EditorWrapper>
        <ReactDraftWysiwyg editorState={value} onEditorStateChange={data => setValue(data)} />
      </EditorWrapper>
      <Divider sx={{ my: 6 }} />

      <Typography variant='h6' sx={{ mb: 3 }}>
        Sponsorship Overview
      </Typography>

      <Grid container sx={{ mb: 6, display: 'flex', justifyContent: 'flex-end' }}>
        <Button size='small' variant='contained' startIcon={<Plus fontSize='small' />} onClick={handleClickOpenGroup}>
          Add Sponsorship Group
        </Button>
      </Grid>
      <SponsorshipOpportunitiesItem />
      <SponsorshipOpportunitiesItem />
      <DialogAddSponsorshipGroup handleDialogClose={handleDialogCloseGroup} open={openGroup} />
      <Divider sx={{ my: 6 }} />
      <Typography variant='h6' sx={{ mb: 3 }}>
        Contact Information
      </Typography>
      <EditorWrapper>
        <ReactDraftWysiwyg editorState={value} onEditorStateChange={data => setValue(data)} />
      </EditorWrapper>
    </Box>
  )
}
