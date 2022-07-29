// ** Icon imports
import EmailOutline from 'mdi-material-ui/EmailOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Company',
      icon: EmailOutline,
      path: '/company'
    },
    {
      title: 'Agent',
      icon: EmailOutline,
      path: '/agent',
      action: 'read',
      subject: 'admin-view'
    }
  ]
}

export default navigation
