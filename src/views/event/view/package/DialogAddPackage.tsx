// ** MUI Imports

import Dialog from '@mui/material/Dialog'

import DialogContent from '@mui/material/DialogContent'
import { Close } from 'mdi-material-ui'

// ** Third Party Styles Imports
import { Box, IconButton, Typography } from '@mui/material'

// ** Types

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import FormPackage from './FormPackage'
import { PackageTypesData } from 'src/types/eventTypes'

interface DialogAddAlbumProps {
  handleDialogClose: () => void
  open: boolean
  dataPackageSelect: PackageTypesData | null
}

const DialogAddPackage = (props: DialogAddAlbumProps) => {
  const { handleDialogClose, open, dataPackageSelect } = props

  return (
    <DatePickerWrapper>
      <Dialog
        fullWidth
        open={open}
        scroll='body'
        onClose={handleDialogClose}
        onBackdropClick={handleDialogClose}
      >
        <DialogContent sx={{ position: 'relative' }}>
          <IconButton
            size='small'
            onClick={handleDialogClose}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Close />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              {dataPackageSelect ? ' Edit Package' : ' Add Package'}
            </Typography>
          </Box>

          <FormPackage
            handleDialogClose={handleDialogClose}
            dataPackageSelect={dataPackageSelect}
          />
        </DialogContent>
      </Dialog>
    </DatePickerWrapper>
  )
}

export default DialogAddPackage
