import axiosClient from 'src/configs/axiosClient'

const getPhotos = async (albumId: number) => {
  try {
    const response = await axiosClient.get(`/gallery/${albumId}`)

    return response.data
  } catch (err) {
    return []
  }
}

const deletePhoto = async (photoId: number) => {
  try {
    const response = await axiosClient.delete(`/gallery/album/photo/${photoId}`)

    return response.data
  } catch (err) {
    return null
  }
}

const deleteAlbum = async (albumId: number) => {
  try {
    const response = await axiosClient.delete(`/gallery/album/${albumId}`)

    return response
  } catch (err) {
    return null
  }
}

export { getPhotos, deletePhoto, deleteAlbum }
