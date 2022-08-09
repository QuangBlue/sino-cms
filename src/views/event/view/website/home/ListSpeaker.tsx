import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Switch
} from '@mui/material'
import { useState } from 'react'

export default function HomeListSpeaker() {
  const [checked, setChecked] = useState<number[]>([])

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const checkAll = () => {
    if (checked.length === 3) {
      setChecked([])
    } else {
      setChecked([0, 1, 2])
    }
  }

  return (
    <Card>
      <CardHeader
        title='List Speaker'
        action={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <InputLabel htmlFor='go-live' sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}>
              Hide / Show
            </InputLabel>
            <Switch id='go-live' />
            <InputLabel htmlFor='check-all' sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}>
              Check All
            </InputLabel>
            <Checkbox
              id='check-all'
              disableRipple
              onChange={checkAll}
              checked={checked.length === 3}
              inputProps={{ 'aria-labelledby': 'checkbox-list-label-2' }}
            />
          </Box>
        }
      />
      <CardContent>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleToggle(0)}>
              <ListItemAvatar>
                <Avatar src='/images/avatars/2.png' alt='Caroline Black' />
              </ListItemAvatar>
              <ListItemText id='checkbox-list-label-0' primary='Caroline Black' secondary='CEO - Sino Elite' />
              <ListItemSecondaryAction>
                <Checkbox
                  edge='end'
                  tabIndex={-1}
                  disableRipple
                  onChange={handleToggle(0)}
                  checked={checked.indexOf(0) !== -1}
                  inputProps={{ 'aria-labelledby': 'checkbox-list-label-0' }}
                />
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleToggle(1)}>
              <ListItemAvatar>
                <Avatar src='/images/avatars/1.png' alt='Alfred Copeland' />
              </ListItemAvatar>
              <ListItemText id='checkbox-list-label-1' primary='Alfred Copeland' secondary='CEO - Sino Elite' />
              <ListItemSecondaryAction>
                <Checkbox
                  edge='end'
                  tabIndex={-1}
                  disableRipple
                  onChange={handleToggle(1)}
                  checked={checked.indexOf(1) !== -1}
                  inputProps={{ 'aria-labelledby': 'checkbox-list-label-1' }}
                />
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleToggle(2)}>
              <ListItemAvatar>
                <Avatar src='/images/avatars/8.png' alt='Celia Schneider' />
              </ListItemAvatar>
              <ListItemText id='checkbox-list-label-2' primary='Celia Schneider' secondary='CEO - Sino Elite' />
              <ListItemSecondaryAction>
                <Checkbox
                  edge='end'
                  tabIndex={-1}
                  disableRipple
                  onChange={handleToggle(2)}
                  checked={checked.indexOf(2) !== -1}
                  inputProps={{ 'aria-labelledby': 'checkbox-list-label-2' }}
                />
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
        </List>{' '}
      </CardContent>
    </Card>
  )
}
