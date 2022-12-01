const ImageDetails = ({ selectedImage, onClose }) => {

  return (
    <div id="single-card-blur">
      <div id="single-card-background">
        <button id="single-card-close-button" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
        <div id="single-card-img-container">
          <img id="single-card-img-img" src={selectedImage.primaryImage} alt={selectedImage.title} />
        </div>
        <div id="single-card-text-container">
          <div id="single-card-main-info">
            <p id="single-card-title">{selectedImage.title}</p>
            <p id="single-card-author">{selectedImage.artistDisplayName}</p>
          </div>
          <div id="single-card-details-container">
            <div id="single-card-details-text-container">
              <p className="single-card-details-text">{selectedImage.objectDate}</p>
              <p className="single-card-details-text">{selectedImage.artistDisplayBio}</p>
              <p className="single-card-details-text">{selectedImage.medium}</p>
              <p className="single-card-details-text">{selectedImage.repository}</p>
            </div>
            <div id="single-card-button-container">
              <button className="single-card-button">
                <a href={selectedImage.objectURL} target="_blank">
                  <span className="material-symbols-outlined">Info</span>
                  More info
                </a>
              </button>
              <button className="single-card-button">
                <span className="material-symbols-outlined">download</span>
                More info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageDetails;