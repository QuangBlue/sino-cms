/* eslint-disable react-hooks/exhaustive-deps */
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { getSpeaker } from 'src/store/event/view/website/speakerStore'
import {
  getHeaderByKey,
  editHeader
} from 'src/store/event/view/website/settingsStore'

import { getRegisters } from 'src/store/event/view/website/registerStore'
import { REGISTER } from 'src/constants/headers'
import RegisterActions from './RegisterActions'
import RegisterContent from './RegisterContent'

import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { convertToHTML } from 'draft-convert'

const RegisterTabView = () => {
  // ** Redux
  const dispatch = useDispatch<AppDispatch>()
  const eventStore = useSelector((state: RootState) => state.eventDetail)
  const settingStore = useSelector((state: RootState) => state.settingWebsite)

  const { id, baseName } = eventStore?.eventData

  const [header, setHeader] = useState<any>({
    key: REGISTER,
    title: 'Registers',
    isPublished: settingStore.header?.[0]?.isPublished || false,
    content: '' || EditorState.createEmpty()
  })

  const handleFetchingDate = () => {
    dispatch(getSpeaker(baseName))
    dispatch(getHeaderByKey({ eventId: id, key: REGISTER }))
    dispatch(getRegisters(id))
  }

  useEffect(() => {
    const contentText = settingStore.header?.[0]?.content || ''
    const blocksContentFromHTML = convertFromHTML(contentText)
    const contactContent = ContentState.createFromBlockArray(
      blocksContentFromHTML.contentBlocks,
      blocksContentFromHTML.entityMap
    )
    const content = EditorState.createWithContent(contactContent)
    setHeader({ ...header, content: content })
  }, [settingStore.header])

  useEffect(() => {
    handleFetchingDate()
  }, [dispatch, baseName, id])

  const handleToggleSponsorHeader = useCallback(
    (checked: boolean) => {
      setHeader({ ...header, isPublished: checked })
    },
    [header]
  )

  const handleSave = () => {
    dispatch(
      editHeader({
        eventId: id,
        params: [
          {
            ...header,
            content: convertToHTML(header.content.getCurrentContent())
          }
        ]
      })
    )
  }

  const handleChangeValue = (params: any) => {
    setHeader({ ...header, content: params })
  }

  return (
    <Box sx={{ my: 4, mx: 4 }}>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <RegisterContent
            value={header.content}
            handleChangeValue={handleChangeValue}
          />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <RegisterActions
            handleSave={handleSave}
            registerHeader={header}
            handleToggleSponsorHeader={handleToggleSponsorHeader}
            handleChangeLang={handleFetchingDate}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default RegisterTabView
