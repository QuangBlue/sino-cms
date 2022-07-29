// ** Next Import
// import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// import Select from '@mui/material/Select'
// import { GridRowId } from '@mui/x-data-grid'
// import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

// import DialogActions from '@mui/material/DialogActions'
import { useState } from 'react'
import Grid from '@mui/material/Grid'
import FormValidationSchema from './FormValidationSchema'
import CardHeader from '@mui/material/CardHeader'

interface TableHeaderProps {
  value: string

  // selectedRows: GridRowId[]
  handleFilter: (val: string) => void
}

const TableHeaderAgent = (props: TableHeaderProps) => {
  // ** Props
  const { value, /* selectedRows */ handleFilter } = props

  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

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
        title='Agent List'
        sx={{ '& .MuiCardHeader-action': { m: 0 } }}
        titleTypographyProps={{
          variant: 'h6',
          sx: { letterSpacing: '0.15px !important' }
        }}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          placeholder='Search Agent'
          sx={{ mr: 4, mb: 2, maxWidth: '180px' }}
          onChange={e => handleFilter(e.target.value)}
        />

        <Button sx={{ mb: 2 }} variant='contained' onClick={handleClickOpen}>
          Create Agent
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Create Agent</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>Please fill in the information to create an Agent.</DialogContentText>
          <Grid item xs={12}>
            <FormValidationSchema handleClickCloseModal={handleClose} />
          </Grid>
        </DialogContent>
        {/* <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Disagree</Button>
          <Button size='large' type='submit' variant='contained'>
            Create
          </Button>
        </DialogActions> */}
      </Dialog>
    </Box>
  )
}

export default TableHeaderAgent
