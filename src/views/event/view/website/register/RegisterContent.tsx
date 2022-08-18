// ** React Imports

import { Box, Divider, Grid, TextField, Typography } from '@mui/material'
import RegisterInfo from './RegisterInfo'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import { useState } from 'react'

const RegisterContent = () => {
  const [value, setValue] = useState(EditorState.createEmpty())

  return (
    <Box>
      <Grid>
        <Typography variant='h6' sx={{ mb: 3 }}>
          Title
        </Typography>
        <TextField
          fullWidth
          sx={{ '& .MuiInputBase-input': { color: 'text.secondary', fontWeight: 600 } }}
          placeholder='Title'
        />
      </Grid>

      <Divider sx={{ mt: 4, mb: 4 }} />
      <Typography variant='h6' sx={{ mb: 3 }}>
        Group Registration Promotion
      </Typography>
      <EditorWrapper>
        <ReactDraftWysiwyg editorState={value} onEditorStateChange={data => setValue(data)} />
      </EditorWrapper>
      <Divider sx={{ mt: 4, mb: 4 }} />
      <RegisterInfo />
    </Box>
  )
}

export default RegisterContent
