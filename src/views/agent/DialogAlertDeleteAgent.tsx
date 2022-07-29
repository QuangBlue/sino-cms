import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { AgentTypes } from 'src/types/agentTypes'

interface DialogAlertDeleteProps {
  open: boolean
  dataAgent: AgentTypes
  handleCloseAlert: () => void
  handleSubmit: () => void
}

const DialogAlertDelete = (props: DialogAlertDeleteProps) => {
  const { open, dataAgent, handleCloseAlert, handleSubmit } = props

  return (
    <Dialog
      open={open}
      onClose={handleCloseAlert}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {dataAgent.status ? `Are you sure you want to delete agent ` : `Are you sure you want to resume agent `}
        <b>{dataAgent.firstName + ' ' + dataAgent.lastName}</b> ?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {dataAgent.status
            ? `All events managed by this agent will shutdown. Make sure you understand what you're doing.`
            : `All events managed by this agent will resume. Make sure you understand what you're doing.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button onClick={handleCloseAlert}>Cancel</Button>
        <Button onClick={handleSubmit} color='secondary'>
          {dataAgent.status ? 'Delete' : 'Resume'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogAlertDelete
