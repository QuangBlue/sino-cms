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

import { PackageTypesData, PriceTypes } from 'src/types/eventTypes'
import FormAddPrice from './FormAddPrice'

interface DialogAddAlbumProps {
  handleDialogClose: () => void
  open: boolean
  dataPackageSelect: PackageTypesData | null
  priceSelected: PriceTypes | null
}

const DialogAddPackage = (props: DialogAddAlbumProps) => {
  const { handleDialogClose, open, dataPackageSelect, priceSelected } = props

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
              {priceSelected
                ? 'Edit Price'
                : `Add Price to Package ${dataPackageSelect?.name}`}
            </Typography>
          </Box>

          <FormAddPrice
            handleDialogClose={handleDialogClose}
            dataPackageSelect={dataPackageSelect}
            priceSelected={priceSelected}
          />
        </DialogContent>
      </Dialog>
    </DatePickerWrapper>
  )
}

export default DialogAddPackage
