import { Box, Menu, MenuItem, Typography } from '@mui/material'
import { MouseEvent, useState } from 'react'

export interface IMenuRightClickProps {
  chat: string
  isSender: boolean
}

interface ContextMenuTypes {
  mouseX: number
  mouseY: number
}

export default function ChatMessage(props: IMenuRightClickProps) {
  const { chat, isSender } = props

  const [contextMenu, setContextMenu] = useState<null | ContextMenuTypes>(null)

  const handleContextMenu = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    )
  }

  const handleClose = () => {
    setContextMenu(null)
  }

  return (
    <Box onContextMenu={handleContextMenu}>
      <Typography
        sx={{
          boxShadow: 1,
          borderRadius: 1,
          width: 'fit-content',
          fontSize: '0.875rem',
          p: theme => theme.spacing(3, 4),
          ml: isSender ? 'auto' : undefined,
          borderTopLeftRadius: !isSender ? 0 : undefined,
          borderTopRightRadius: isSender ? 0 : undefined,
          color: isSender ? 'common.white' : 'text.primary',
          backgroundColor: isSender ? 'primary.main' : 'background.paper'
        }}
      >
        {chat}
      </Typography>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference='anchorPosition'
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>Copy</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </Box>
  )
}
