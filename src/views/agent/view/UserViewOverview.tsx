// ** React Imports
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import UsersCompanyListTable from './UsersCompanyListTable'
import UsersEventListTable from './UsersEventListTable'

const UserViewOverview = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UsersCompanyListTable />
      </Grid>
      <Grid item xs={12}>
        <UsersEventListTable />
      </Grid>
    </Grid>
  )
}

export default UserViewOverview
