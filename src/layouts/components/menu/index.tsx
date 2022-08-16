// ** React Imports
import { MouseEvent, useState } from 'react'

// ** MUI Imports
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

const ITEM_HEIGHT = 48

interface MenuPopoverProps {
  children: React.ReactNode
}

const MenuPopover = ({ children }: MenuPopoverProps) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton aria-label='more' aria-controls='long-menu' aria-haspopup='true' onClick={handleClick}>
        <DotsVertical />
      </IconButton>
      <Menu
        keepMounted
        id='long-menu'
        anchorEl={anchorEl}
        onClose={handleClose}
        onBlur={handleClose}
        open={Boolean(anchorEl)}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5
          }
        }}
      >
        {children}
      </Menu>
    </div>
  )
}

export default MenuPopover
