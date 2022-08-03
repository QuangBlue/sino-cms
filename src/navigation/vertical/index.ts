// ** Icon imports
import CalendarStar from 'mdi-material-ui/CalendarStar'
import Domain from 'mdi-material-ui/Domain'
import FaceAgent from 'mdi-material-ui/FaceAgent'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Company',
      icon: Domain,
      path: '/company',
      action: 'read',
      subject: 'agent-view'
    },
    {
      title: 'Event',
      icon: CalendarStar,
      path: '/event',
      action: 'read',
      subject: 'host-view'
    },
    {
      title: 'Agent',
      icon: FaceAgent,
      path: '/agent'
    }
  ]
}

export default navigation
