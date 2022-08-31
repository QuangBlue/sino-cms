import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import Typography from '@mui/material/Typography'

import Chip from '@mui/material/Chip'
import MenuPopover from 'src/layouts/components/menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import EditIcon from '@mui/icons-material/Edit'
import { SUCCESS } from 'src/constants/upload-status'

import ReactPlayer from 'react-player'

export default function VideoCard({
  video,
  handleDeleteVideo,
  handleOpenEditModal
}: any) {
  const title =
    video.process.status !== SUCCESS ? (
      <Typography>
        {video.name} <Chip label='Video is being processed' />
      </Typography>
    ) : (
      video.name
    )

  const isCompleted = video.process.status === SUCCESS

  return (
    <Card>
      <CardHeader
        action={
          <MenuPopover>
            <MenuItem>
              <Button
                sx={{ mr: 10 }}
                size='small'
                variant='text'
                startIcon={<EditIcon fontSize='small' />}
                onClick={() => handleOpenEditModal(video)}
                color='secondary'
              >
                Edit Video
              </Button>
            </MenuItem>
            <MenuItem>
              <Button
                sx={{ mr: 10 }}
                size='small'
                variant='text'
                startIcon={<HighlightOffIcon fontSize='small' />}
                onClick={() => handleDeleteVideo(Number(video.id))}
                color='secondary'
              >
                Delete Title
              </Button>
            </MenuItem>
          </MenuPopover>
        }
        title={title}
      />
      <CardContent>
        <ReactPlayer url={video.link} controls={isCompleted ? true : false} />
      </CardContent>
    </Card>
  )
}
