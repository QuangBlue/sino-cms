// ** Next Import
// ** Demo Components Imports
import { useRouter } from 'next/router'
import UserViewPage from 'src/views/agent/view/UserViewPage'

const UserView = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) return null

  return <UserViewPage id={id} />
}

export default UserView
