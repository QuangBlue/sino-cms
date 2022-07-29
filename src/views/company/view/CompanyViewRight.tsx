// ** React Imports
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import UsersEventListTable from './CompanyEventListTable'

const UserViewOverview = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UsersEventListTable />
      </Grid>
    </Grid>
  )
}

export default UserViewOverview
