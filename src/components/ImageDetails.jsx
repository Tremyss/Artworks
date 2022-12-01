const ImageDetails = ({selectedImage, onClose}) => {

  return (
    <div id="ImageDetails-container">
      <div id="ImageDetails">
        <button id="closingButton" onClick={onClose}>X</button>
        <img src={selectedImage.primaryImageSmall} alt="" />
        <div>
          <div><strong>Title: </strong> {selectedImage.title}</div>
          <div><strong>Artist: </strong>{selectedImage.artistDisplayName} ({selectedImage.artistDisplayBio})</div>
          <div><strong>Date: </strong> {selectedImage.objectDate}</div>
          <div><strong>Classification: </strong> {selectedImage.classification}</div>
          <div><strong>Medium: </strong> {selectedImage.medium}</div>
          <div><strong>Dimensions: </strong> {selectedImage.dimensions}</div>
          <div><strong>Location: </strong> {selectedImage.repository}</div>
          <a href={selectedImage.objectURL} target="_blank">The Met</a>
        </div>
      </div>

    </div>
  )
}

export default ImageDetails;