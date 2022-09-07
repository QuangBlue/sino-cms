// ** React Imports
import { Fragment, useState, SyntheticEvent, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography, { TypographyProps } from '@mui/material/Typography'
import LinearProgress, {
  LinearProgressProps
} from '@mui/material/LinearProgress'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'

// ** Third Party Imports
import { FileRejection, useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

import { upload as UploadImage } from 'src/@core/api/upload-api'

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' color='text.secondary'>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

interface FileProp {
  name: string
  type: string
  size: number
}

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

interface FileUploaderPhotoProps {
  handleAddPhotos: (photos: any[]) => void
}

const FileUploaderPhoto = ({ handleAddPhotos }: FileUploaderPhotoProps) => {
  // ** State
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [progressInfos, setProgressInfos] = useState<any>({ val: [] })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const progressInfosRef = useRef(null)

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    maxSize: 2000000,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {
      setSelectedFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    },
    onDropRejected: fileRejections => {
      fileRejections.map((file: FileRejection) => {
        toast.error(
          `Files ${file.file.name} larger than 2 GB so can not upload.`,
          {
            duration: 2000
          }
        )
      })
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return (
        <img
          width={38}
          height={38}
          alt={file.name}
          src={URL.createObjectURL(file as any)}
        />
      )
    } else {
      return <FileDocumentOutline />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = selectedFiles
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)

    // @ts-ignore
    setSelectedFiles([...filtered])
  }

  const upload = (idx: number, file: File) => {
    // @ts-ignore
    const _progressInfos = [...progressInfosRef.current.val]

    return UploadImage(file, (event: { loaded: number; total: number }) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      )
      _progressInfos[idx].file = file
    })
      .then(result => {
        if (result?.success) {
          _progressInfos[idx].imgUrl = result.data
          setProgressInfos({ val: [..._progressInfos] })
        }

        return result
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0
        setProgressInfos({ val: _progressInfos })
      })
  }

  const uploadFiles = () => {
    setIsLoading(true)
    const files = Array.from(selectedFiles)

    const _progressInfos = files.map(file => ({
      percentage: 0,
      fileName: file.name
    }))

    // @ts-ignore
    progressInfosRef.current = {
      val: _progressInfos
    }

    const uploadPromises = selectedFiles.map((file, i) => upload(i, file))

    Promise.all(uploadPromises).then(photos => {
      setSelectedFiles([])

      handleAddPhotos(photos)

      setIsLoading(false)
    })
  }

  const fileList =
    selectedFiles?.length > 0
      ? selectedFiles?.map((file: FileProp) => (
          <ListItem key={file.name}>
            <div className='file-details'>
              <div className='file-preview'>{renderFilePreview(file)}</div>
              <div>
                <Typography className='file-name'>{file.name}</Typography>
                <Typography className='file-size' variant='body2'>
                  {Math.round(file.size / 100) / 10 > 1000
                    ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                    : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
                </Typography>
              </div>
            </div>
            <IconButton onClick={() => handleRemoveFile(file)}>
              <Close fontSize='small' />
            </IconButton>
          </ListItem>
        ))
      : progressInfos &&
        progressInfos.val.length > 0 &&
        progressInfos.val.map((progressInfo: any, index: number) => (
          <ListItem key={index}>
            <div
              className=''
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex' }}>
                <div className='file-preview'>
                  {renderFilePreview(progressInfo.file)}
                </div>
                <div>
                  <Typography className='file-name'>
                    {progressInfo.fileName}
                  </Typography>
                  <Typography className='file-size' variant='body2'>
                    {Math.round(progressInfo.file.size / 100) / 10 > 1000
                      ? `${(
                          Math.round(progressInfo.file.size / 100) / 10000
                        ).toFixed(1)} mb`
                      : `${(
                          Math.round(progressInfo.file.size / 100) / 10
                        ).toFixed(1)} kb`}
                  </Typography>
                </div>
              </div>
              <div>
                <LinearProgressWithLabel value={progressInfo.percentage} />
              </div>
            </div>
          </ListItem>
        ))

  const handleLinkClick = (event: SyntheticEvent) => {
    event.preventDefault()
  }

  const handleRemoveAllFiles = () => {
    setSelectedFiles([])
  }

  return (
    <Fragment>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: ['column', 'column', 'row'],
            alignItems: 'center'
          }}
        >
          <Img width={300} alt='Upload img' src='/images/misc/upload.png' />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: ['center', 'center', 'inherit']
            }}
          >
            <HeadingTypography variant='h5'>
              Drop files here or click to upload.
            </HeadingTypography>
            <Typography color='textSecondary'>
              Drop selectedFiles here or click{' '}
              <Link href='/' onClick={handleLinkClick}>
                browse
              </Link>{' '}
              through your machine
            </Typography>
          </Box>
        </Box>
      </div>

      <Fragment>
        <List sx={{ width: '100%' }}>{fileList}</List>
        <div className='buttons'>
          <Button
            color='error'
            variant='outlined'
            onClick={handleRemoveAllFiles}
            disabled={selectedFiles.length === 0}
          >
            Remove All
          </Button>
          <LoadingButton
            loading={isLoading}
            variant='contained'
            onClick={uploadFiles}
            disabled={selectedFiles.length === 0}
          >
            Upload Files
          </LoadingButton>
        </div>
      </Fragment>
    </Fragment>
  )
}

export default FileUploaderPhoto
