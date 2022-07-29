// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types
import { UserLayoutType } from 'src/types/apps/userTypes'

// ** Demo Components Imports
import UserViewLeft from 'src/views/agent/view/UserViewLeft'
import UserViewRight from 'src/views/agent/view/UserViewRight'
import FallbackSpinner from 'src/@core/components/spinner'

// ** Redux Imports
import { agentDetailSlice, fetchAgentDetail } from 'src/store/agent/view'
import { AppDispatch, RootState } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'

const UserView = ({ id }: UserLayoutType) => {
  // ** Redux
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.agentDetail)

  useEffect(() => {
    dispatch(fetchAgentDetail(Number(id)))

    return () => {
      dispatch(agentDetailSlice.actions.handlePageChange())
    }
  }, [dispatch, id])

  if (!store.isLoading) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <UserViewLeft data={store.agentData} />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <UserViewRight />
        </Grid>
      </Grid>
    )
  } else {
    return <FallbackSpinner />
  }
}

export default UserView
