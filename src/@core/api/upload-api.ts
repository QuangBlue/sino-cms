import axiosClient from 'src/configs/axiosClient'

const upload = async (file: File, onUploadProgress: any) => {
  const formData = new FormData()
  formData.append('files', file)
  try {
    const promise = await axiosClient.post(`upload/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    })

    return { success: true, data: promise.data.data[0] }
  } catch (err) {
    return { success: false }
  }
}

const uploadVideo = async (file: File, eventName: string) => {
  const formData = new FormData()
  formData.append('files', file)
  try {
    const result = await axiosClient.post(
      `upload/video?eventName=${eventName}`,
      formData
    )

    return { success: true, data: result.data.data }
  } catch (err) {
    return { success: false }
  }
}

const uploadVideoTitle = async (videoId: number, params: any) => {
  try {
    const result = await axiosClient.put(`/video/${videoId}`, params)

    return result.data
  } catch (err) {
    return { success: false }
  }
}

const checkUploadVideoStatus = async (videoId: number) => {
  try {
    const result = await axiosClient.get(`/video/${videoId}`)

    return result.data.data
  } catch (err) {
    return false
  }
}

const deleteVideo = async (videoId: number) => {
  try {
    const result = await axiosClient.delete(`/video/${videoId}`)

    return result
  } catch (err) {
    return false
  }
}

export {
  upload,
  uploadVideo,
  uploadVideoTitle,
  deleteVideo,
  checkUploadVideoStatus
}
