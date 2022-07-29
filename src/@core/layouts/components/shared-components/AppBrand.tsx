import Box from '@mui/material/Box'
import Image from 'next/image'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'

const AppBrand = () => {
  return (
    <Box sx={{ borderRadius: '4px', overflow: 'hidden', width: '40px', height: '40px' }}>
      <Image src={themeConfig.urlLogo} width={40} height={40} alt='MLpert' objectFit='cover' />
    </Box>
  )
}
export default AppBrand
