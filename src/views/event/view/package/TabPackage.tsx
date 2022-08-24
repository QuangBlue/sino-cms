import { Box, Button, CardHeader } from '@mui/material'
import { Plus } from 'mdi-material-ui'
import * as React from 'react'
import { useState, useEffect } from 'react'
import DialogAddPackage from './DialogAddPackage'
import TableCollapsible from './TableCollapsible'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { getPackage, packageSlice } from 'src/store/event/view/packageStore'
import { PackageTypesData, PriceTypes } from 'src/types/eventTypes'
import DialogAddPrice from './DialogAddPrice'

export default function TabPackage() {
  const [open, setOpen] = useState<boolean>(false)
  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  const [openAddPrice, setOpenPrice] = useState<boolean>(false)
  const handleClickOpenAddPrice = () => setOpenPrice(true)
  const handleDialogCloseAddPrice = () => setOpenPrice(false)
  const [dataPackageSelect, setDataPackageSelect] =
    useState<PackageTypesData | null>(null)

  const [priceSelected, setPriceSelected] = useState<PriceTypes | null>(null)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.eventDetail)

  useEffect(() => {
    dispatch(getPackage(store.eventData.baseName))

    return () => {
      dispatch(packageSlice.actions.handlePageChange())
    }
  }, [dispatch, store.eventData.baseName])

  const handleClickAll = () => {
    setDataPackageSelect(null)
    handleClickOpen()
  }

  return (
    <Box sx={{ boxShadow: 0, mb: 4 }}>
      <CardHeader
        title='List Package'
        action={
          <Box>
            <Button
              size='small'
              variant='contained'
              startIcon={<Plus fontSize='small' />}
              onClick={handleClickAll}
            >
              Add Package
            </Button>
          </Box>
        }
      />

      <TableCollapsible
        handleClickOpen={handleClickOpen}
        handleClickOpenAddPrice={handleClickOpenAddPrice}
        dataPackageSelect={dataPackageSelect}
        setDataPackageSelect={setDataPackageSelect}
        priceSelected={priceSelected}
        setPriceSelected={setPriceSelected}
      />

      <DialogAddPackage
        open={open}
        handleDialogClose={handleDialogClose}
        dataPackageSelect={dataPackageSelect}
      />

      <DialogAddPrice
        open={openAddPrice}
        handleDialogClose={handleDialogCloseAddPrice}
        dataPackageSelect={dataPackageSelect}
        priceSelected={priceSelected}
      />
    </Box>
  )
}
