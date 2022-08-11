import React, { useEffect } from 'react'
import MenuSetting from './MenuSetting'
import StylesSite from './StylesSite'

import { Box, Grid } from '@mui/material'
import { getHeaders, editHeader, EditHeaderParams } from 'src/store/event/view/website/settingStore'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { AppDispatch, RootState } from 'src/store'

export default function SettingTabView() {
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.settingWebsite)

  const { headers, isLoading } = store

  const router = useRouter()

  const { id } = router.query

  useEffect(() => {
    if (id) {
      dispatch(getHeaders(Number(id)))
    }
  }, [id, dispatch])

  const handleToggleHeader = (values: any) => {
    const data = values?.map((header: EditHeaderParams) => {
      return {
        key: header.header ? header.header.key : header.key,
        title: header.title,
        isPublished: header.isPublished
      }
    })

    dispatch(editHeader({ eventId: Number(id), params: data }))
  }

  return (
    <Box sx={{ my: 4, mx: 4 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={6}>
          <MenuSetting headers={headers} handleToggleHeader={handleToggleHeader} isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <StylesSite />
        </Grid>
      </Grid>
    </Box>
  )
}
