// ** Next Import
// ** Demo Components Imports
import { useRouter } from 'next/router'
import CompanyViewPage from 'src/views/company/view/CompanyViewPage'

const CompanyView = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) return null

  return <CompanyViewPage id={id} />
}

CompanyView.acl = {
  action: 'read',
  subject: 'agent-view'
}

export default CompanyView
