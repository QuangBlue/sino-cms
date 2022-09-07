import {
  Box,
  Button,
  CardHeader,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Plus, Pencil, DeleteOutline } from 'mdi-material-ui'
import * as React from 'react'
import { useState } from 'react'
import DialogAddContactInfo from './DialogAddRegister'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { updateRegister } from 'src/@core/api/register-api'
import { getRegisters } from 'src/store/event/view/website/registerStore'
import toast from 'react-hot-toast'
import { GridRowParams, GridActionsCellItem } from '@mui/x-data-grid'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

const defaultColumns = [
  {
    flex: 1,
    field: 'companyName',
    minWidth: 150,
    headerName: 'Company Name',
    renderCell: ({ row }: any) => (
      <Typography variant='body2'>{`${row?.name || ''}`}</Typography>
    )
  }
]

export default function RegisterInfo() {
  const [open, setOpen] = useState<boolean>(false)
  const [editParams, setEditParams] = useState<any>(null)

  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => {
    setOpen(false)
    setEditParams(null)
  }
  const registerStore = useSelector((state: RootState) => state.registerWebsite)
  const eventStore = useSelector((state: RootState) => state.eventDetail)
  const dispatch = useDispatch<AppDispatch>()

  const { id } = eventStore?.eventData
  const { isLoading, registerList } = registerStore

  const [pageSize, setPageSize] = useState<number>(10)

  const columns = [
    ...defaultColumns,
    {
      field: 'actions',
      type: 'actions',
      getActions: ({ row }: GridRowParams) => [
        <GridActionsCellItem
          showInMenu
          color='secondary'
          key='edit'
          icon={<Pencil />}
          onClick={() => {
            setEditParams(row)
            handleClickOpen()
          }}
          label='Edit Contact'
        />,

        <GridActionsCellItem
          color='secondary'
          icon={
            <Tooltip title={'Delete Contact'}>
              <HighlightOffIcon />
            </Tooltip>
          }
          onClick={() => handleDeleteContact(row.id)}
          label='Delete Contact'
          showInMenu
          key='delete'
        />
      ]
    }
  ]

  const handleAddContact = async (name: string) => {
    const response = await updateRegister(id, { items: [name] })
    if (response?.[0]?.id) {
      handleDialogClose()
      dispatch(getRegisters(id))
    } else {
      toast.error('Something went wrong!')
    }
  }

  const handleEditContact = async (name: string) => {
    const response = await updateRegister(id, { items: [name] })
    if (response?.[0]?.id) {
      handleDialogClose()
      dispatch(getRegisters(id))
    } else {
      toast.error('Something went wrong!')
    }
  }

  const handleDeleteContact = async (contactId: number) => {
    const response = await updateRegister(id, { deleteIds: [contactId] })
    if (response) {
      dispatch(getRegisters(id))
    } else {
      toast.error('Something went wrong!')
    }
  }

  return (
    <Box sx={{ boxShadow: 0, mb: 4 }}>
      <CardHeader
        title='REGISTERED ORGANISATIONS'
        action={
          <Box>
            <Button
              size='small'
              variant='contained'
              startIcon={<Plus fontSize='small' />}
              onClick={handleClickOpen}
            >
              Add Registered Organisations
            </Button>
          </Box>
        }
      />

      <DataGrid
        autoHeight
        pagination
        rows={registerList}
        loading={isLoading}
        columns={columns}
        disableSelectionOnClick
        pageSize={Number(pageSize)}
        rowsPerPageOptions={[10, 25, 50]}
        sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
      />

      {open && (
        <DialogAddContactInfo
          handleDialogClose={handleDialogClose}
          handleEditContact={handleEditContact}
          open={open}
          handleAddContact={handleAddContact}
          editParams={editParams}
        />
      )}
    </Box>
  )
}
