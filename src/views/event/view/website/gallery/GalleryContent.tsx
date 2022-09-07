import { SyntheticEvent, useState } from 'react'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import { FilmstripBoxMultiple, FolderMultipleImage } from 'mdi-material-ui'

import { styled } from '@mui/material/styles'
import TabContext from '@mui/lab/TabContext'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'

import GalleryPhoto from './photos/GalleryPhoto'
import GalleryVideo from './videos/GalleryVideo'

const GalleryContent = () => {
  const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
    '& .MuiTabs-indicator': {
      backgroundColor: 'transparent'
    },
    '& .Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: `${theme.palette.common.white} !important`
    },
    '& .MuiTab-root': {
      minHeight: 38,
      minWidth: 110,
      borderRadius: 8,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    }
  }))

  const [value, setValue] = useState<string>('photo')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} aria-label='customized tabs example'>
        <Tab
          value='photo'
          label='Photo'
          icon={<FolderMultipleImage sx={{ fontSize: '18px' }} />}
        />
        <Tab
          value='video'
          label='Video'
          icon={<FilmstripBoxMultiple sx={{ fontSize: '18px' }} />}
        />
      </TabList>
      <TabPanel value='photo' sx={{ p: 0, width: '100%' }}>
        <GalleryPhoto />
      </TabPanel>
      <TabPanel value='video' sx={{ p: 0, width: '100%' }}>
        <GalleryVideo />
      </TabPanel>
    </TabContext>
  )
}

export default GalleryContent
