// ** React Imports

import Box from '@mui/material/Box'

import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { EditorState } from 'draft-js'
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'

const AboutUsContent = () => {
  const [value, setValue] = useState(EditorState.createEmpty())

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 3 }}>
        Title
      </Typography>
      <TextField
        fullWidth
        id='title-speaker'
        sx={{ '& .MuiInputBase-input': { color: 'text.secondary', fontWeight: 600 } }}
        placeholder='Title'
      />

      <Divider sx={{ mt: 4, mb: 4 }} />
      <Typography variant='h6' sx={{ mb: 3 }}>
        Content
      </Typography>
      <EditorWrapper>
        <ReactDraftWysiwyg editorState={value} onEditorStateChange={data => setValue(data)} />
      </EditorWrapper>
    </Box>
  )
}

export default AboutUsContent
