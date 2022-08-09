// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'

// ** Icons Imports
import ChevronLeft from 'mdi-material-ui/ChevronLeft'
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Third Party Components
import clsx from 'clsx'
import { useKeenSlider } from 'keen-slider/react'

// ** Styled Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'

const SwiperControls = () => {
  // ** States
  const [loaded, setLoaded] = useState<boolean>(false)
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  // ** Hook
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  return (
    <KeenSliderWrapper>
      <Box className='navigation-wrapper'>
        <Box ref={sliderRef} className='keen-slider'>
          <Box className='keen-slider__slide' sx={{}}>
            <img
              src='https://images.unsplash.com/photo-1614850715649-1d0106293bd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4140&q=80'
              alt='swiper 1'
            />
          </Box>
          <Box className='keen-slider__slide'>
            <img
              src='https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJhbm5lcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
              alt='swiper 2'
            />
          </Box>
          <Box className='keen-slider__slide'>
            <img src='/images/banners/banner-3.jpg' alt='swiper 3' />
          </Box>
          <Box className='keen-slider__slide'>
            <img src='/images/banners/banner-4.jpg' alt='swiper 4' />
          </Box>
          <Box className='keen-slider__slide'>
            <img src='/images/banners/banner-5.jpg' alt='swiper 5' />
          </Box>
        </Box>
        {loaded && instanceRef.current && (
          <>
            <ChevronLeft
              className={clsx('arrow arrow-left', {
                'arrow-disabled': currentSlide === 0
              })}
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
            />

            <ChevronRight
              className={clsx('arrow arrow-right', {
                'arrow-disabled': currentSlide === instanceRef.current.track.details.slides.length - 1
              })}
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
            />
          </>
        )}
      </Box>
      {loaded && instanceRef.current && (
        <Box className='swiper-dots'>
          {[...Array(instanceRef.current.track.details.slides.length).keys()].map(idx => {
            return (
              <Badge
                key={idx}
                variant='dot'
                component='div'
                className={clsx({
                  active: currentSlide === idx
                })}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
              ></Badge>
            )
          })}
        </Box>
      )}
    </KeenSliderWrapper>
  )
}

export default SwiperControls
