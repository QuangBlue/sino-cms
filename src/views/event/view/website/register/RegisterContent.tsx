// ** React Imports

import { Box, Divider, Typography } from '@mui/material'
import RegisterInfo from './RegisterInfo'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

const RegisterContent = ({ value, handleChangeValue }: any) => {
  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 3 }}>
        Group Registration Promotion
      </Typography>
      <EditorWrapper>
        <ReactDraftWysiwyg
          editorState={value}
          onEditorStateChange={data => handleChangeValue(data)}
        />
      </EditorWrapper>
      <Divider sx={{ mt: 4, mb: 4 }} />
      <RegisterInfo />
    </Box>
  )
}

export default RegisterContent
