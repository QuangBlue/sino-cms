// ** Icon imports

import EmailOutline from 'mdi-material-ui/EmailOutline'

// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
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
    subject: 'agent-view'
  }
]

export default navigation
