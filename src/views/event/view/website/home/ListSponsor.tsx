import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText
} from '@mui/material'
import { useState } from 'react'

export default function HomeListSponsor() {
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
        title='List Sponsors'
        action={
          <Checkbox
            disableRipple
            onChange={checkAll}
            checked={checked.length === 3}
            inputProps={{ 'aria-labelledby': 'checkbox-list-label-2' }}
          />
        }
      />
      <CardContent>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleToggle(0)}>
              <ListItemAvatar>
                <Avatar src='/images/avatars/2.png' alt='Caroline Black' />
              </ListItemAvatar>
              <ListItemText
                id='checkbox-list-label-0'
                primary='DBS'
                secondary='Leading financial services group in Asia'
              />
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
              <ListItemText
                id='checkbox-list-label-1'
                primary='Singapore Exchange'
                secondary='Asia’s leading and trusted market infrastructure'
              />
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
              <ListItemText id='checkbox-list-label-2' primary='Sino Elite' secondary='Sino Elite' />
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
