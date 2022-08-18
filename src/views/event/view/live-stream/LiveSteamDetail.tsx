import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  InputLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import * as React from 'react'

import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'
import ChatLog from './ChatLog'
import {
  ChatsObj,
  ContactType,
  ProfileUserType
} from 'src/types/apps/chatTypes'
import SendMsgForm from './SendMsgForm'
import { Send } from 'mdi-material-ui'
import AreaChart from './AreaChart'

// export interface ILiveStreamDetailProps {}

const data: {
  chat: ChatsObj
  contact: ContactType
  userContact: ProfileUserType
} = {
  chat: {
    id: 1,
    userId: 1,
    unseenMsgs: 0,
    chat: [
      {
        message: "How can we help? We're here for you!",
        time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
        senderId: 11,
        feedback: {
          isSent: true,
          isDelivered: true,
          isSeen: true
        }
      },
      {
        message:
          'Hey John, I am looking for the best admin template. Could you please help me to find it out?',
        time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)',
        senderId: 1,
        feedback: {
          isSent: true,
          isDelivered: true,
          isSeen: true
        }
      },
      {
        message: 'It should be MUI v5 compatible.',
        time: 'Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)',
        senderId: 1,
        feedback: {
          isSent: true,
          isDelivered: true,
          isSeen: true
        }
      },
      {
        message: 'Absolutely!',
        time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)',
        senderId: 11,
        feedback: {
          isSent: true,
          isDelivered: true,
          isSeen: true
        }
      },
      {
        message: 'This admin template is built with MUI!',
        time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
        senderId: 11,
        feedback: {
          isSent: true,
          isDelivered: true,
          isSeen: true
        }
      },
      {
        message: 'Looks clean and fresh UI. 😍',
        time: 'Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)',
        senderId: 1,
        feedback: {
          isSent: true,
          isDelivered: true,
          isSeen: true
        }
      },
      {
        message: "It's perfect for my next project.",
        time: 'Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)',
        senderId: 1,
        feedback: {
          isSent: true,
          isDelivered: true,
          isSeen: true
        }
      },
      {
        message: 'How can I purchase it?',
        time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)',
        senderId: 1,
        feedback: {
          isSent: true,
          isDelivered: true,
          isSeen: true
        }
      },
      {
        message: 'Thanks, From our official site  😇',
        time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)',
        senderId: 11,
        feedback: {
          isSent: true,
          isDelivered: true,
          isSeen: true
        }
      },
      {
        message: 'I will purchase it for sure. 👍',
        time: '2022-08-17T04:06:19.651Z',
        senderId: 1,
        feedback: {
          isSent: true,
          isDelivered: true,
          isSeen: true
        }
      }
    ]
  },
  contact: {
    id: 1,
    fullName: 'Felecia Rower',
    role: 'Frontend Developer',
    about:
      'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
    avatar: '/images/avatars/2.png',
    status: 'offline'
  },
  userContact: {
    id: 11,
    avatar: '/images/avatars/1.png',
    fullName: 'John Doe',
    role: 'admin',
    about:
      'Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.',
    status: 'online',
    settings: {
      isTwoStepAuthVerificationEnabled: true,
      isNotificationsOn: false
    }
  }
}

interface DataType {
  content: string
  createAt: string
  lastSend: string
}

const data1: DataType[] = [
  {
    content: 'Hello Sino Elite',
    createAt: '10, Jan 2020 20:07',
    lastSend: '10, Jan 2020 20:07'
  },
  {
    content: 'Hello Sino Elite',
    createAt: '10, Jan 2020 20:07',
    lastSend: '10, Jan 2020 20:07'
  },
  {
    content: 'Hello Sino Elite',
    createAt: '10, Jan 2020 20:07',
    lastSend: '10, Jan 2020 20:07'
  },
  {
    content: 'Hello Sino Elite',
    createAt: '10, Jan 2020 20:07',
    lastSend: '10, Jan 2020 20:07'
  }
]

export default function LiveStreamDetail() {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Plyr
              source={{
                type: 'video',
                sources: [
                  {
                    src: 'yWtFb9LJs3o',
                    provider: 'youtube'
                  }
                ]
              }}
            />
          </CardContent>
          <CardContent className='card-action-dense'>
            <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={6}>
              <TextField
                fullWidth
                label='English Url'
                placeholder='English Url'
              />
              <TextField
                fullWidth
                label='Chinese Url'
                placeholder='Chinese Url'
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <InputLabel
                  htmlFor='go-live'
                  sx={{
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    color: 'text.secondary'
                  }}
                >
                  English / Chinese
                </InputLabel>
                <Switch id='go-live' />
              </Box>
              <Button variant='contained'>Save</Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} sx={{ height: 800 }}>
        <Card>
          <CardHeader
            title='Chat Box'
            titleTypographyProps={{ variant: 'h6' }}
            subheader='Manage chat of Live Stream'
          />
          <Divider sx={{ m: 0 }} />
          <Box
            sx={{
              flexGrow: 1,
              width: '100%',
              height: '100%',
              backgroundColor: theme => theme.palette.action.hover
            }}
          >
            <ChatLog data={data} />

            <SendMsgForm />
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Send notification'
            titleTypographyProps={{ variant: 'h6' }}
          />
          <Divider sx={{ m: 0 }} />
          <Box sx={{ display: 'flex', m: 4, gap: 4 }}>
            <TextField fullWidth label='Content' />
            <Button variant='contained' endIcon={<Send />}>
              Send
            </Button>
          </Box>
          <TableContainer>
            <Table sx={{ minWidth: 500 }}>
              <colgroup>
                <col style={{ width: '60%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '10%' }} />
              </colgroup>
              <TableHead
                sx={{
                  backgroundColor: theme =>
                    theme.palette.mode === 'light'
                      ? 'grey.50'
                      : 'background.default'
                }}
              >
                <TableRow>
                  <TableCell sx={{ py: 3 }}>Content</TableCell>
                  <TableCell sx={{ py: 3 }}>Created At</TableCell>
                  <TableCell sx={{ py: 3 }}>Last Send</TableCell>
                  <TableCell sx={{ py: 3 }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data1.map((item: DataType, index: number) => (
                  <TableRow
                    hover
                    key={index}
                    sx={{ '&:last-of-type td': { border: 0 } }}
                  >
                    <TableCell>
                      <Typography sx={{ ml: 2 }}>{item.content}</Typography>
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>
                      {item.createAt}
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>
                      {item.lastSend}
                    </TableCell>
                    <TableCell>
                      <Button size='small' variant='outlined' color='secondary'>
                        ReSend
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <AreaChart />
      </Grid>
    </Grid>
  )
}
