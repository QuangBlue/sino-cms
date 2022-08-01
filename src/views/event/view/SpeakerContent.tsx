// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Collapse from '@mui/material/Collapse'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'

import CardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Icon Imports
import Plus from 'mdi-material-ui/Plus'

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'
import { SpeakerAdd } from './SpeakerAdd'
import Button from '@mui/material/Button'
import { RootState } from 'src/store'
import { useSelector } from 'react-redux'

const RepeaterWrapper = styled(CardContent)<CardContentProps>(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(5.5),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(12)
  }
}))

const SpeakerContent = () => {
  // ** States
  const [count, setCount] = useState<number>(0)

  const store = useSelector((state: RootState) => state.eventWebsite)

  useEffect(() => {
    if (store.listSpeaker.length === 0) {
      setCount(1)
    }
  }, [store.listSpeaker.length])

  return (
    <Box>
      <RepeaterWrapper>
        {store.listSpeaker.map(speaker => (
          <Box key={speaker.id} sx={{ mb: 12 }}>
            <SpeakerAdd speaker={speaker} />
          </Box>
        ))}
        <Repeater count={count}>
          {(i: number) => {
            const Tag = i === 0 ? Box : Collapse

            return (
              <Tag key={i} className='repeater-wrapper' {...(i !== 0 ? { in: true } : {})}>
                <SpeakerAdd />
              </Tag>
            )
          }}
        </Repeater>

        <Grid container sx={{ mt: 4.75 }}>
          <Grid item xs={12} sx={{ px: 0 }}>
            <Button
              size='small'
              variant='contained'
              startIcon={<Plus fontSize='small' />}
              onClick={() => setCount(count + 1)}
            >
              Add Item
            </Button>
          </Grid>
        </Grid>
      </RepeaterWrapper>
    </Box>
  )
}

export default SpeakerContent
