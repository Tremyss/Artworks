import { useEffect, useState } from "react"
import getMuseumData from "../api/getMuseumData.js"
import ImageCard from "./ImageCard.jsx"
import ImageDetails from "./ImageDetails.jsx"
import Pager from "./Pager.jsx"
import { saveAs } from "file-saver"
import EditImageModal from "./EditImageModal.jsx"

const ImageGrid = ({ searchVal, isMyGallery }) => {

  // App state
  const [images, setImages] = useState([])
  // User images from DB
  const [userImages, setUserImages] = useState([]) // initben lehetne az összes képe 9-esével megjelenítve

  // ImageDetails - Single Image Card state
  const [selectedImageId, setSelectedImageId] = useState(null)
  //Edit image
  const [selectedImageEditId, setSelectedImageEditId] = useState(false)
  // Pager states
  const [page, setPage] = useState(1)
  const [totalPageCount, setTotalPageCount] = useState(null)


  const loadData = async () => {
    const [images, totalPage] = await getMuseumData(searchVal, page)
    setImages(images)
    setTotalPageCount(totalPage)
  }

  useEffect(() => {
    setImages([])
    setPage(1)
    loadData()
  }, [searchVal, page])

  // Grid page handler
  const onPageChange = (newPage) => {
    setPage(newPage)
  }


  // Download handler
  const downloadImage = (imgId) => {
    console.log(imgId)
    saveAs(`https://www.artic.edu/iiif/2/${imgId}/full/843,/0/default.jpg`, `${imgId}.jpg`)
  }

  // Show more handler: Select image to render more details
  const selectedImage = images.find(img => img.id === selectedImageId)

  // Edit handler: Select image to edit details
  // const selectedImageEdit = userImages.find(img => img.id === selectedImageEditId)

  return (
    <div id="image-grid">
      {images.length === 0 ?
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> :
        images.map(image => (
          <ImageCard
            key={image.id}
            image={image}
            isMyGallery={isMyGallery}
            onDownloadImage={imgId => downloadImage(imgId)}
            onShowDetails={id => setSelectedImageId(id)}
            onEditDetails={setSelectedImageEditId}
          />
        ))}
      <Pager
        page={page}
        totalPageCount={totalPageCount}
        onPageChange={onPageChange}
      />

      {selectedImageId !== null &&
        <ImageDetails
          selectedImage={selectedImage}
          onDownloadImage={imgId => downloadImage(imgId)}
          onClose={() => setSelectedImageId(null)}
        />}

      {selectedImageEditId &&
        <EditImageModal
        onClose={setSelectedImageEditId}
        />}

    </div>
  )
}

export default ImageGrid
