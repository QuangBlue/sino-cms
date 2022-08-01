// ** Icon imports

import EmailOutline from 'mdi-material-ui/EmailOutline'

// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Company',
    icon: EmailOutline,
    path: '/company',
    action: 'read',
    subject: 'agent-view'
  },
  {
    title: 'Event',
    icon: EmailOutline,
    path: '/event',
    action: 'read',
    subject: 'agent-view'
  },
  {
    title: 'Agent',
    icon: EmailOutline,
    path: '/agent'
  }
]

export default navigation
