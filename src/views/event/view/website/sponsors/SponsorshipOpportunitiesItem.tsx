import React, { useState, useCallback } from 'react'

import {
  Box,
  Button,
  Card,
  CardHeader,
  Collapse,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Plus, ChevronDown, ChevronUp, Pencil } from 'mdi-material-ui'
import DialogAddSponsorship from './DialogAddSponsorship'
import MenuPopover from 'src/layouts/components/menu'
import MenuItem from '@mui/material/MenuItem'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import EditIcon from '@mui/icons-material/Edit'

import { updateSponsorShip } from 'src/@core/api/sponsor-api'
import toast from 'react-hot-toast'
import NumberFormat from 'react-number-format'

// * Types
import { SponsorShip } from 'src/types/website'
import { GridRowParams, GridActionsCellItem } from '@mui/x-data-grid'

interface SponsorshipOpportunitiesItemProps {
  name: string
  sponsorship: SponsorShip | any
  groupId: number | undefined
  handleDeleteSponsorGroup: (groupId: number) => void
  handleOpenEditSponsorGroup: (params: any) => void
  handleGetSponsors: () => void
}

const defaultColumns = [
  {
    flex: 2,
    field: 'name',
    minWidth: 150,
    headerName: 'Title',
    renderCell: ({ row }: GridRowParams) => (
      <Typography variant='body2'>{`${row.name || ''}`}</Typography>
    )
  },

  {
    flex: 1,
    field: 'slot',
    minWidth: 90,
    headerName: 'Quality',
    renderCell: ({ row }: GridRowParams) => (
      <Typography variant='body2'>{`${row.slot || ''}`}</Typography>
    )
  },
  {
    flex: 1,
    minWidth: 90,
    field: 'price',
    headerName: 'Price',
    renderCell: ({ row }: GridRowParams) => (
      <Typography variant='body2'>
        <NumberFormat
          value={row.price}
          displayType={'text'}
          prefix='$'
          thousandSeparator
        />
      </Typography>
    )
  }
]

function SponsorshipOpportunitiesItem({
  name,
  sponsorship = [],
  handleDeleteSponsorGroup,
  groupId,
  handleOpenEditSponsorGroup,
  handleGetSponsors
}: SponsorshipOpportunitiesItemProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [editParams, setEditParams] = useState<SponsorShip | null>(null)

  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => {
    setOpen(false)
    setEditParams(null)
  }

  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<number>(10)

  const [sponsorList, setSponsorList] = useState<SponsorShip[]>(sponsorship)

  const handleAddSponsor = useCallback(
    async (value: any) => {
      const params = { items: [...sponsorList, value] }
      const result = await updateSponsorShip(Number(groupId), params)

      if (result?.length > 0) {
        toast.success(`Added new Sponsorship to ${name} Group`)
        setSponsorList(result)
        handleGetSponsors()

        handleDialogClose()
      } else {
        toast.error('Something went wrong!')
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [groupId, name, sponsorList]
  )

  const handleDeleteSponsor = useCallback(
    async (values: any) => {
      const params = { deleteIds: [values.id] }
      const result = await updateSponsorShip(Number(groupId), params)

      const newSponsorShipList = sponsorList.filter(
        (item: any) => item.id !== values.id
      )
      setSponsorList(newSponsorShipList)

      if (result) {
        toast.success(`Deleted Sponsor ${values.name} from ${name} Group`)
        handleDialogClose()
      } else {
        toast.error('Something went wrong!')
      }
    },
    [groupId, name, sponsorList]
  )

  const handleEditSponsor = useCallback(
    async (value: SponsorShip) => {
      const items = sponsorList.map(sponsor =>
        sponsor.id === value.id ? value : sponsor
      )

      const params = { items }
      const result = await updateSponsorShip(Number(groupId), params)

      if (result?.length > 0) {
        toast.success(`Updated Sponsorship Successfully!`)
        setSponsorList(result)
        handleDialogClose()
      } else {
        toast.error('Something went wrong!')
      }
    },
    [groupId, sponsorList]
  )

  const columns = [
    ...defaultColumns,
    {
      flex: 1,
      width: 80,
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
          label='Edit Sponsorship'
        />,
        <GridActionsCellItem
          color='secondary'
          icon={
            <Tooltip title={'Delete Sponsorship'}>
              <HighlightOffIcon />
            </Tooltip>
          }
          onClick={() => handleDeleteSponsor(row)}
          label='Delete Sponsorship'
          showInMenu
          key='delete'
        />
      ]
    }
  ]

  return (
    <Card variant='outlined' sx={{ boxShadow: 0, mb: 4 }}>
      <CardHeader
        title={name}
        action={
          <Box sx={{ display: 'flex' }}>
            <MenuPopover>
              <MenuItem>
                <Button
                  sx={{ mr: 10 }}
                  size='small'
                  variant='text'
                  startIcon={<EditIcon fontSize='small' />}
                  onClick={() => handleOpenEditSponsorGroup({ groupId, name })}
                  color='secondary'
                >
                  Edit Sponsorship Group
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  sx={{ mr: 10 }}
                  size='small'
                  variant='text'
                  startIcon={<HighlightOffIcon fontSize='small' />}
                  onClick={() => handleDeleteSponsorGroup(Number(groupId))}
                  color='secondary'
                >
                  Delete Sponsorship Group
                </Button>
              </MenuItem>

              <MenuItem>
                <Button
                  sx={{ mr: 2 }}
                  size='small'
                  variant='text'
                  startIcon={<Plus fontSize='small' />}
                  onClick={handleClickOpen}
                  color='secondary'
                >
                  Add Sponsor to Group
                </Button>
              </MenuItem>
            </MenuPopover>

            <IconButton
              size='small'
              aria-label='collapse'
              sx={{ color: 'text.secondary' }}
              onClick={() => setCollapsed(!collapsed)}
            >
              {!collapsed ? (
                <ChevronDown fontSize='small' />
              ) : (
                <ChevronUp fontSize='small' />
              )}
            </IconButton>
          </Box>
        }
      />
      <Collapse in={collapsed}>
        <DataGrid
          autoHeight
          pagination
          rows={sponsorList}
          // @ts-ignore
          columns={columns}
          disableSelectionOnClick
          pageSize={Number(pageSize)}
          rowsPerPageOptions={[10, 25, 50]}
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        />
      </Collapse>
      {open && (
        <DialogAddSponsorship
          handleDialogClose={handleDialogClose}
          open={open}
          handleAddSponsor={handleAddSponsor}
          editParams={editParams}
          handleEditSponsor={handleEditSponsor}
        />
      )}
    </Card>
  )
}

export default React.memo(SponsorshipOpportunitiesItem)
