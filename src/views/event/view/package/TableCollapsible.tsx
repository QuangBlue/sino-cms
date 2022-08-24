// ** React Imports
import { useState, Fragment, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { Chip, TablePagination, Tooltip } from '@mui/material'
import {
  BackupRestore,
  CheckCircle,
  CloseCircle,
  DeleteOutline,
  FormatListNumbered,
  Pencil,
  PlusBox
} from 'mdi-material-ui'
import {
  DeletePackageParams,
  PackageTypes,
  PackageTypesData,
  PriceTypes,
  ResumePackageParams
} from 'src/types/eventTypes'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { formatDate } from 'src/@core/utils/format'
import DialogAlertDelete from './DialogAlertDelete'
import { deletePackage, resumePackage } from 'src/store/event/view/packageStore'
import DialogShowBenefit from './DialogShowBenefit'

const createData = (data: PackageTypes[]) => {
  const d: PackageTypesData[] = []

  data.map(p => {
    if (p.priceType === 'normal') {
      d.push({
        id: p.id,
        name: p.name,
        benefits: p.benefits,
        status: p.status,
        listPrice: [
          {
            id: p.id,
            status: p.status,
            price: p.price,
            stockLimit: p.stockLimit,
            periodStart: p.periodStart,
            periodEnd: p.periodEnd,
            priceType: p.priceType
          }
        ],
        type: p.type
      })
    }
  })

  data.map(p => {
    if (p.priceType === 'early-bird') {
      const index = d.findIndex(item => item.name === p.name)
      if (index !== -1) {
        d[index].listPrice.push({
          id: p.id,
          price: p.price,
          status: p.status,
          stockLimit: p.stockLimit,
          periodStart: p.periodStart,
          periodEnd: p.periodEnd,
          priceType: p.priceType
        })
      }
    }
  })

  return d
}

interface TableCollapsibleProps {
  handleClickOpen: () => void
  handleClickOpenAddPrice: () => void
  dataPackageSelect: PackageTypesData | null
  setDataPackageSelect: (row: PackageTypesData) => void
  priceSelected: PriceTypes | null
  setPriceSelected: (price: PriceTypes | null) => void
}

const TableCollapsible = (props: TableCollapsibleProps) => {
  const {
    handleClickOpenAddPrice,
    handleClickOpen,
    priceSelected,
    setPriceSelected,
    setDataPackageSelect
  } = props

  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const store = useSelector((state: RootState) => state.packageEvent)

  const data = createData(store.packages)

  return (
    <Box>
      <TableContainer>
        <Table stickyHeader aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title Package</TableCell>
              <TableCell align='right'>Type</TableCell>
              <TableCell align='right'>Benefit</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map(row => (
              <Row
                key={row.id}
                row={row}
                handleClickOpen={handleClickOpen}
                handleClickOpenAddPrice={handleClickOpenAddPrice}
                setDataPackageSelect={setDataPackageSelect}
                setPriceSelected={setPriceSelected}
                priceSelected={priceSelected}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
          <Typography variant='inherit'> No package </Typography>
        </Box>
      )}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  )
}

const Row = (props: {
  row: PackageTypesData
  priceSelected: PriceTypes | null
  handleClickOpen: () => void
  handleClickOpenAddPrice: () => void
  setDataPackageSelect: (row: PackageTypesData) => void
  setPriceSelected: (price: PriceTypes | null) => void
}) => {
  // ** Props
  const {
    row,
    priceSelected,
    handleClickOpen,
    handleClickOpenAddPrice,
    setDataPackageSelect,
    setPriceSelected
  } = props

  // ** State
  const [open, setOpen] = useState<boolean>(false)

  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleCloseOpenDelete = () => setOpenDelete(false)

  const [openBenefit, setOpenBenefit] = useState<boolean>(false)
  const handleClickOpenBenefit = () => setOpenBenefit(true)
  const handleCloseOpenBenefit = () => setOpenBenefit(false)

  const dispatch = useDispatch<AppDispatch>()
  const storeEvent = useSelector((state: RootState) => state.eventDetail)

  const handleClickEdit = () => {
    setDataPackageSelect(row)
    handleClickOpen()
  }

  const handleClickEditPrice = (price: PriceTypes) => {
    setPriceSelected(price)
    handleClickOpenAddPrice()
  }

  const handleClickAddPrice = () => {
    setDataPackageSelect(row)
    setPriceSelected(null)
    handleClickOpenAddPrice()
  }

  const handleClickDeletePackage = () => {
    setPriceSelected(null)
    handleClickOpenDelete()
  }

  const handleClickDeletePrice = (price: PriceTypes) => {
    setPriceSelected(price)
    handleClickOpenDelete()
  }

  const handleSubmitDeletePackage = (props: DeletePackageParams) => {
    dispatch(deletePackage(props))
  }

  const handleSubmitResumePackage = (props: ResumePackageParams) => {
    dispatch(resumePackage(props))
  }

  return (
    <Fragment>
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell align='right'>
          {row.type === 'onsite' ? (
            <Chip label='Onsite' color='primary' variant='outlined' />
          ) : (
            <Chip label='Virtual' color='error' variant='outlined' />
          )}
        </TableCell>
        <TableCell align='right'>
          <Tooltip title={'View benefit'}>
            <IconButton size='small' onClick={handleClickOpenBenefit}>
              <FormatListNumbered />
            </IconButton>
          </Tooltip>
        </TableCell>

        <TableCell align='center'>
          {row.status ? (
            <CheckCircle color={'success'} />
          ) : (
            <CloseCircle color={'error'} />
          )}
        </TableCell>
        <TableCell align='right'>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title={'Add Price'}>
              <IconButton
                size='small'
                sx={{ mr: 0.5 }}
                onClick={handleClickAddPrice}
              >
                <PlusBox />
              </IconButton>
            </Tooltip>
            <Tooltip title={'Edit Package'}>
              <IconButton
                size='small'
                sx={{ mr: 0.5 }}
                onClick={handleClickEdit}
              >
                <Pencil />
              </IconButton>
            </Tooltip>
            <Tooltip title={row.status ? 'Delete Package' : 'Resume Package'}>
              <IconButton size='small' onClick={handleClickDeletePackage}>
                {row.status ? <DeleteOutline /> : <BackupRestore />}
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={7}
          sx={{
            py: '0 !important',
            backgroundColor: '#F3F3F8'
          }}
        >
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2, mb: 12 }}>
              <Typography variant='h6' gutterBottom component='div'>
                List Price
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell align='right'>Price</TableCell>
                    <TableCell align='right'>Limit</TableCell>
                    <TableCell align='right'>Price Type</TableCell>
                    <TableCell align='center'>Status</TableCell>
                    <TableCell align='right'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.listPrice.map((price: PriceTypes) => (
                    <TableRow key={price.periodStart}>
                      <TableCell component='th' scope='row'>
                        {formatDate(price.periodStart || '')}
                      </TableCell>
                      <TableCell>{formatDate(price.periodEnd || '')}</TableCell>
                      <TableCell align='right'>{price.price}</TableCell>
                      <TableCell align='right'>{price.stockLimit}</TableCell>
                      <TableCell align='right'>
                        {price.priceType === 'normal' ? (
                          <CustomChip
                            label='Normal'
                            skin='light'
                            color='secondary'
                          />
                        ) : (
                          <CustomChip
                            label='Early Bird'
                            skin='light'
                            color='info'
                          />
                        )}
                      </TableCell>
                      <TableCell align='center'>
                        {price.status ? (
                          <Chip label='Active' color='success' />
                        ) : (
                          <Chip label='Unactive' color='error' />
                        )}
                      </TableCell>
                      <TableCell align='right'>
                        <Box
                          sx={{ display: 'flex', justifyContent: 'flex-end' }}
                        >
                          <Tooltip title={'Edit Price'}>
                            <IconButton
                              size='small'
                              sx={{ mr: 0.5 }}
                              onClick={() => handleClickEditPrice(price)}
                            >
                              <Pencil />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            title={
                              price.status ? 'Delete Price' : 'Resume Price'
                            }
                          >
                            <IconButton
                              size='small'
                              onClick={() => handleClickDeletePrice(price)}
                            >
                              {price.status ? (
                                <DeleteOutline />
                              ) : (
                                <BackupRestore />
                              )}
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <DialogAlertDelete
        open={openDelete}
        dataPackage={row}
        priceSelected={priceSelected}
        handleCloseAlert={handleCloseOpenDelete}
        handleSubmit={() => {
          ;(priceSelected ? priceSelected.status : row.status)
            ? handleSubmitDeletePackage({
                eventName: storeEvent.eventData.baseName,
                packageId: priceSelected ? priceSelected.id : row.id,
                handleClickCloseModal: handleCloseOpenDelete
              })
            : handleSubmitResumePackage({
                eventName: storeEvent.eventData.baseName,
                packageId: priceSelected ? priceSelected.id : row.id,
                handleClickCloseModal: handleCloseOpenDelete
              })
        }}
      />
      <DialogShowBenefit
        open={openBenefit}
        handleDialogClose={handleCloseOpenBenefit}
        benefits={row.benefits}
      />
    </Fragment>
  )
}

export default TableCollapsible
