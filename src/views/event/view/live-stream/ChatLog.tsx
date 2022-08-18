// ** React Imports
import { useRef, useEffect, Ref, ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import Check from 'mdi-material-ui/Check'
import CheckAll from 'mdi-material-ui/CheckAll'

// ** Third Party Components
import PerfectScrollbarComponent, {
  ScrollBarProps
} from 'react-perfect-scrollbar'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Imports
import { getInitials } from 'src/@core/utils/get-initials'

// ** Types Imports
import {
  ChatLogType,
  MessageType,
  MsgFeedbackType,
  ChatLogChatType,
  MessageGroupType,
  FormattedChatsType
} from 'src/types/apps/chatTypes'
import ChatMessage from './ChatMessage'

const PerfectScrollbar = styled(PerfectScrollbarComponent)<
  ScrollBarProps & { ref: Ref<unknown> }
>(({ theme }) => ({
  padding: theme.spacing(5)
}))

const ChatLog = (props: ChatLogType) => {
  // ** Props
  const { data } = props

  // ** Ref
  const chatArea = useRef(null)

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    if (chatArea.current) {
      // @ts-ignore
      chatArea.current._container.scrollTop = Number.MAX_SAFE_INTEGER
    }
  }

  // ** Formats chat data based on sender
  const formattedChatData = () => {
    let chatLog: MessageType[] | [] = []
    if (data.chat) {
      chatLog = data.chat.chat
    }

    const formattedChatLog: FormattedChatsType[] = []
    let chatMessageSenderId = chatLog[0] ? chatLog[0].senderId : 11
    let msgGroup: MessageGroupType = {
      senderId: chatMessageSenderId,
      messages: []
    }
    chatLog.forEach((msg: MessageType, index: number) => {
      if (chatMessageSenderId === msg.senderId) {
        msgGroup.messages.push({
          time: msg.time,
          msg: msg.message,
          feedback: msg.feedback
        })
      } else {
        chatMessageSenderId = msg.senderId

        formattedChatLog.push(msgGroup)
        msgGroup = {
          senderId: msg.senderId,
          messages: [
            {
              time: msg.time,
              msg: msg.message,
              feedback: msg.feedback
            }
          ]
        }
      }

      if (index === chatLog.length - 1) formattedChatLog.push(msgGroup)
    })

    return formattedChatLog
  }

  const renderMsgFeedback = (isSender: boolean, feedback: MsgFeedbackType) => {
    if (isSender) {
      if (feedback.isSent && !feedback.isDelivered) {
        return (
          <Check sx={{ mr: 2, fontSize: '1rem', color: 'text.secondary' }} />
        )
      } else if (feedback.isSent && feedback.isDelivered) {
        return (
          <CheckAll
            sx={{
              mr: 2,
              fontSize: '1rem',
              color: feedback.isSeen ? 'success.main' : 'text.secondary'
            }}
          />
        )
      } else {
        return null
      }
    }
  }

  useEffect(() => {
    if (data && data.chat && data.chat.chat.length) {
      scrollToBottom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  // ** Renders user chat
  const renderChats = () => {
    return formattedChatData().map(
      (item: FormattedChatsType, index: number) => {
        const isSender = item.senderId === data.userContact.id

        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: !isSender ? 'row' : 'row-reverse',
              mb: index !== formattedChatData().length - 1 ? 9.75 : undefined
            }}
          >
            <Box
              className='chat-body'
              sx={{ maxWidth: ['calc(100% - 5.75rem)', '75%', '65%'] }}
            >
              {item.messages.map(
                (
                  chat: ChatLogChatType,
                  index: number,
                  { length }: { length: number }
                ) => {
                  const time = new Date(chat.time)

                  return (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        flexDirection: !isSender ? 'row' : 'row-reverse',
                        mb:
                          index !== formattedChatData().length - 1
                            ? 3.75
                            : undefined
                      }}
                    >
                      <Box>
                        <CustomAvatar
                          skin='light'
                          color={
                            data.contact.avatarColor
                              ? data.contact.avatarColor
                              : undefined
                          }
                          sx={{
                            width: '2rem',
                            height: '2rem',
                            fontSize: '0.875rem',
                            ml: isSender ? 4 : undefined,
                            mr: !isSender ? 4 : undefined
                          }}
                          {...(data.contact.avatar && !isSender
                            ? {
                                src: data.contact.avatar,
                                alt: data.contact.fullName
                              }
                            : {})}
                          {...(isSender
                            ? {
                                src: data.userContact.avatar,
                                alt: data.userContact.fullName
                              }
                            : {})}
                        >
                          {data.contact.avatarColor
                            ? getInitials(data.contact.fullName)
                            : null}
                        </CustomAvatar>
                      </Box>
                      <Box sx={{ '&:not(:last-of-type)': { mb: 3.5 } }}>
                        <ChatMessage chat={chat.msg} isSender={isSender} />

                        {index + 1 === length ? (
                          <Box
                            sx={{
                              mt: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: isSender
                                ? 'flex-end'
                                : 'flex-start'
                            }}
                          >
                            {renderMsgFeedback(isSender, chat.feedback)}
                            <Typography
                              variant='caption'
                              sx={{ color: 'text.disabled' }}
                            >
                              {time
                                ? new Date(time).toLocaleString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true
                                  })
                                : null}
                            </Typography>
                          </Box>
                        ) : null}
                      </Box>
                    </Box>
                  )
                }
              )}
            </Box>
          </Box>
        )
      }
    )
  }

  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    return (
      <PerfectScrollbar ref={chatArea} options={{ wheelPropagation: false }}>
        {children}
      </PerfectScrollbar>
    )
  }

  return (
    <Box sx={{ height: 'calc(100% - 9.4375rem)' }}>
      <ScrollWrapper>{renderChats()}</ScrollWrapper>
    </Box>
  )
}

export default ChatLog
