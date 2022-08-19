import { useCallback } from 'react'

// ** Next Import
// import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Store Imports
import { AppDispatch, RootState } from 'src/store'
import { hotelSlice, fetchHotel } from 'src/store/hotel'

interface TableHeaderProps {
  value: string

  // selectedRows: GridRowId[]
  handleFilter: (val: string) => void
  handleOpenDialog: () => void
}

const TableHeaderHotel = (props: TableHeaderProps) => {
  // ** Props
  const { value, handleFilter, handleOpenDialog } = props

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.hotel)

  const handleStatusChange = useCallback(
    async (e: SelectChangeEvent) => {
      const status = e.target.value == 'active' ? true : false
      await dispatch(hotelSlice.actions.handleChangeStatus(status))
      await dispatch(fetchHotel())
    },
    [dispatch]
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
        title='Hotel List'
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
        <TextField
          size='small'
          value={value}
          placeholder='Search Hotel'
          sx={{ mr: 4, mb: 2, maxWidth: '180px' }}
          onChange={e => handleFilter(e.target.value)}
        />

        <Button sx={{ mb: 2 }} variant='contained' onClick={handleOpenDialog}>
          Create Hotel
        </Button>
      </Box>
      {/* <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Create Hotel</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>Please fill in the information to create an Hotel.</DialogContentText>
          <Grid item xs={12}>
            <FormCreateHotelSchema handleClickCloseModal={handleClose} />
          </Grid>
        </DialogContent> */}
        {/* <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Cancel</Button>
          <Button size='large' type='submit' variant='contained'>
            Create
          </Button>
        </DialogActions> */}
      {/* </Dialog> */}
    </Box>
  )
}

export default TableHeaderHotel
