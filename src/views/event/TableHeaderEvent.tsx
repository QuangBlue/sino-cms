// ** Next Import
// import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// import Select from '@mui/material/Select'
// import { GridRowId } from '@mui/x-data-grid'
// import MenuItem from '@mui/material/MenuItem'
// import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

// import DialogActions from '@mui/material/DialogActions'
import { useCallback, useState } from 'react'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { eventSlice, fetchEvent } from 'src/store/event'
import { useAuth } from 'src/hooks/useAuth'
import FormCreateEventSchema from './FormValidationSchema'

interface TableHeaderProps {
  value: string
  handleFilter: (val: string) => void
}

const TableHeaderEvent = (props: TableHeaderProps) => {
  // ** Props
  // const { value, handleFilter } = props

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.event)
  const auth = useAuth()

  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleStatusChange = useCallback(
    async (e: SelectChangeEvent) => {
      const status = e.target.value == 'active' ? true : false
      await dispatch(eventSlice.actions.handleChangeStatus(status))
      await dispatch(fetchEvent(auth.user?.id || 0))
    },
    [auth.user?.id, dispatch]
  )

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <CardHeader
        title='Event List'
        sx={{ '& .MuiCardHeader-action': { m: 0 } }}
        titleTypographyProps={{
          variant: 'h6',
          sx: { letterSpacing: '0.15px !important' }
        }}
      />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <FormControl size='small' sx={{ mr: 4, mb: 2, maxWidth: '180px', minWidth: '140px' }}>
          <InputLabel id='status-select'>Status</InputLabel>
          <Select
            fullWidth
            value={store.status ? 'active' : 'inactive'}
            id='select-status'
            label='Status'
            labelId='status-select'
            onChange={handleStatusChange}
            inputProps={{ placeholder: 'Select Role' }}
          >
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='inactive'>Inactive</MenuItem>
          </Select>
        </FormControl>
        {/* <TextField
          size='small'
          value={value}
          placeholder='Search Event'
          sx={{ mr: 4, mb: 2, maxWidth: '180px' }}
          onChange={e => handleFilter(e.target.value)}
        /> */}

        <Button sx={{ mb: 2 }} variant='contained' onClick={handleClickOpen}>
          Create Event
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Create Event</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>Please fill in the information to create an Event.</DialogContentText>
          <Grid item xs={12}>
            <FormCreateEventSchema handleClickCloseModal={handleClose} />
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default TableHeaderEvent
