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
export { upload }
