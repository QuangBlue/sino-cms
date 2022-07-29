// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types
import { UserLayoutType } from 'src/types/apps/userTypes'

// ** Demo Components Imports
import CompanyViewLeft from 'src/views/company/view/CompanyViewLeft'
import FallbackSpinner from 'src/@core/components/spinner'
import CompanyViewRight from './CompanyViewRight'

// ** Redux Imports
import { AppDispatch, RootState } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'
import { companyDetailSlice, fetchCompanyDetail } from 'src/store/company/view'

const CompanyView = ({ id }: UserLayoutType) => {
  // ** Redux
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.companyDetail)

  useEffect(() => {
    dispatch(fetchCompanyDetail(Number(id)))

    return () => {
      dispatch(companyDetailSlice.actions.handlePageChange())
    }
  }, [dispatch, id])

  if (!store.isLoading) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <CompanyViewLeft data={store.companyData} />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <CompanyViewRight />
        </Grid>
      </Grid>
    )
  } else {
    return <FallbackSpinner />
  }
}

export default CompanyView
