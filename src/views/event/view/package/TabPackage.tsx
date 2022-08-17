import { Box, Button, CardHeader } from '@mui/material'
import { Plus } from 'mdi-material-ui'
import * as React from 'react'
import { useState, useEffect } from 'react'
import DialogAddContactInfo from './DialogAddPackage'
import TableCollapsible from './TableCollapsible'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { getPackage, packageSlice } from 'src/store/event/view/packageStore'

export default function TabPackage() {
  const [open, setOpen] = useState<boolean>(false)
  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.eventDetail)

  useEffect(() => {
    dispatch(getPackage(store.eventData.baseName))

    return () => {
      dispatch(packageSlice.actions.handlePageChange())
    }
  }, [dispatch, store.eventData.baseName])

  return (
    <Box sx={{ boxShadow: 0, mb: 4 }}>
      <CardHeader
        title='List Package'
        action={
          <Box>
            <Button size='small' variant='contained' startIcon={<Plus fontSize='small' />} onClick={handleClickOpen}>
              Add Package
            </Button>
          </Box>
        }
      />

      <TableCollapsible />

      <DialogAddContactInfo handleDialogClose={handleDialogClose} open={open} />
    </Box>
  )
}
